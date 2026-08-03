"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getSession } from "@/features/auth/session.server";
import { mapEventError } from "@/features/events/mappers/event-error.mapper";
import {
    toEventCreateRequestDto,
    toEventUpdateRequestDto,
} from "@/features/events/mappers/event-request.mapper";
import { eventCreateSchema, eventUpdateSchema } from "@/features/events/schemas/event.schemas";
import { eventApi } from "@/features/events/server/event-api.server";
import { mapZodValidationError } from "@/shared/lib/map-zod-validation-error";
import type { ActionResult } from "@/shared/types/action-result.types";

const eventIdSchema = z.number().int().positive();

type SessionData = NonNullable<Awaited<ReturnType<typeof getSession>>>;
type OrganizerAuthorization =
    | { authorized: true; session: SessionData }
    | { authorized: false; result: ActionResult };

async function getOrganizerSession(): Promise<OrganizerAuthorization> {
    const session = await getSession();
    if (!session) {
        return {
            authorized: false,
            result: {
                success: false,
                message: "Tu sesión expiró. Inicia sesión nuevamente.",
            } satisfies ActionResult,
        };
    }

    if (session.role !== "ORGANIZER") {
        return {
            authorized: false,
            result: {
                success: false,
                message: "Solo los organizadores pueden gestionar eventos.",
            } satisfies ActionResult,
        };
    }

    return { authorized: true, session };
}

function revalidateEventPaths(eventId: number) {
    revalidatePath("/organizer/events");
    revalidatePath(`/organizer/events/${eventId}`);
}

export async function createEventAction(input: unknown): Promise<ActionResult> {
    const parsed = eventCreateSchema.safeParse(input);
    if (!parsed.success) {
        return mapZodValidationError(parsed.error);
    }

    const authorization = await getOrganizerSession();
    if (!authorization.authorized) {
        return authorization.result;
    }

    try {
        await eventApi.create(
            toEventCreateRequestDto(parsed.data),
            authorization.session.accessToken
        );
        revalidatePath("/organizer/events");

        return {
            success: true,
            message: "El evento fue creado correctamente como borrador.",
            redirectTo: "/organizer/events?created=1",
        };
    } catch (error) {
        return mapEventError(error, "No se pudo crear el evento.");
    }
}

export async function updateEventAction(eventId: number, input: unknown): Promise<ActionResult> {
    const parsedId = eventIdSchema.safeParse(eventId);
    if (!parsedId.success) {
        return { success: false, message: "El identificador del evento no es válido." };
    }

    const parsed = eventUpdateSchema.safeParse(input);
    if (!parsed.success) {
        return mapZodValidationError(parsed.error);
    }

    const authorization = await getOrganizerSession();
    if (!authorization.authorized) {
        return authorization.result;
    }

    try {
        const current = await eventApi.getById(parsedId.data, authorization.session.accessToken);
        if (current.status !== "DRAFT" && current.status !== "PUBLISHED") {
            return {
                success: false,
                message: "Los eventos cancelados o cerrados ya no se pueden editar.",
            };
        }

        if (current.salesOpenAt && parsed.data.salesOpenAt === "") {
            return {
                success: false,
                message: "La API actual no permite retirar un periodo de ventas ya configurado.",
                fieldErrors: {
                    salesOpenAt: "Puedes modificar la fecha, pero no dejarla vacía.",
                },
            };
        }
        if (current.salesCloseAt && parsed.data.salesCloseAt === "") {
            return {
                success: false,
                message: "La API actual no permite retirar un periodo de ventas ya configurado.",
                fieldErrors: {
                    salesCloseAt: "Puedes modificar la fecha, pero no dejarla vacía.",
                },
            };
        }

        const payload = toEventUpdateRequestDto(parsed.data, current);
        if (Object.keys(payload).length === 0) {
            return { success: true, message: "No hay cambios pendientes por guardar." };
        }

        await eventApi.update(parsedId.data, payload, authorization.session.accessToken);
        revalidateEventPaths(parsedId.data);

        return { success: true, message: "Los cambios del evento se guardaron correctamente." };
    } catch (error) {
        return mapEventError(error, "No se pudo actualizar el evento.");
    }
}

export async function publishEventAction(eventId: number): Promise<ActionResult> {
    const parsedId = eventIdSchema.safeParse(eventId);
    if (!parsedId.success) {
        return { success: false, message: "El identificador del evento no es válido." };
    }

    const authorization = await getOrganizerSession();
    if (!authorization.authorized) {
        return authorization.result;
    }

    try {
        await eventApi.publish(parsedId.data, authorization.session.accessToken);
        revalidateEventPaths(parsedId.data);
        return { success: true, message: "El evento fue publicado correctamente." };
    } catch (error) {
        return mapEventError(error, "No se pudo publicar el evento.");
    }
}

export async function cancelEventAction(eventId: number): Promise<ActionResult> {
    const parsedId = eventIdSchema.safeParse(eventId);
    if (!parsedId.success) {
        return { success: false, message: "El identificador del evento no es válido." };
    }

    const authorization = await getOrganizerSession();
    if (!authorization.authorized) {
        return authorization.result;
    }

    try {
        await eventApi.cancel(parsedId.data, authorization.session.accessToken);
        revalidateEventPaths(parsedId.data);
        return { success: true, message: "El evento fue cancelado correctamente." };
    } catch (error) {
        return mapEventError(error, "No se pudo cancelar el evento.");
    }
}
