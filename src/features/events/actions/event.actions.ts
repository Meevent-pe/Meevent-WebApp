"use server";

import { revalidatePath } from "next/cache";

import { getSession } from "@/features/auth/session.server";
import { mapEventError } from "@/features/events/mappers/event-error.mapper";
import { toEventCreateRequestDto } from "@/features/events/mappers/event-request.mapper";
import { eventCreateSchema } from "@/features/events/schemas/event.schemas";
import { eventApi } from "@/features/events/server/event-api.server";
import { mapZodValidationError } from "@/shared/lib/map-zod-validation-error";
import type { ActionResult } from "@/shared/types/action-result.types";

export async function createEventAction(input: unknown): Promise<ActionResult> {
    const parsed = eventCreateSchema.safeParse(input);
    if (!parsed.success) {
        return mapZodValidationError(parsed.error);
    }

    const session = await getSession();
    if (!session) {
        return { success: false, message: "Tu sesión expiró. Inicia sesión nuevamente." };
    }

    if (session.role !== "ORGANIZER") {
        return { success: false, message: "Solo los organizadores pueden crear eventos." };
    }

    try {
        await eventApi.create(toEventCreateRequestDto(parsed.data), session.accessToken);
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
