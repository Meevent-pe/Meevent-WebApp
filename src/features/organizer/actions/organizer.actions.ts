"use server";

import { deleteSession, getSession } from "@/features/auth/session.server";
import { mapOrganizerError } from "@/features/organizer/mappers/organizer-error.mapper";
import { toOnboardOrganizerRequestDto } from "@/features/organizer/mappers/organizer-request.mapper";
import { organizerOnboardingSchema } from "@/features/organizer/schemas/organizer.schemas";
import { organizerApi } from "@/features/organizer/server/organizer-api.server";
import { mapZodValidationError } from "@/shared/lib/map-zod-validation-error";
import type { ActionResult } from "@/shared/types/action-result.types";

export async function onboardOrganizerAction(input: unknown): Promise<ActionResult> {
    const parsed = organizerOnboardingSchema.safeParse(input);
    if (!parsed.success) {
        return mapZodValidationError(parsed.error);
    }

    const session = await getSession();
    if (!session) {
        return {
            success: false,
            message: "Tu sesión expiró. Inicia sesión nuevamente.",
        };
    }

    if (session.role !== "ATTENDEE") {
        return {
            success: false,
            message: "Solo una cuenta de asistente puede completar este onboarding.",
        };
    }

    try {
        await organizerApi.onboard(toOnboardOrganizerRequestDto(parsed.data), session.accessToken);

        // El backend cambia el rol persistido, pero el JWT actual conserva ATTENDEE.
        // Se elimina la sesión para obtener un JWT ORGANIZER en el siguiente login.
        await deleteSession();

        return {
            success: true,
            message: "Tu perfil de organizador fue creado correctamente.",
        };
    } catch (error) {
        return mapOrganizerError(error, "No se pudo crear el perfil de organizador.");
    }
}
