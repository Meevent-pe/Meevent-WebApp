import { BackendApiError } from "@/shared/services/backend-client.server";
import type { ActionResult } from "@/shared/types/action-result.types";

const API_TO_FORM_FIELD: Record<string, string> = {
    legal_name: "legalName",
    legalName: "legalName",
    display_name: "displayName",
    displayName: "displayName",
    contact_phone: "contactPhone",
    contactPhone: "contactPhone",
    ruc: "ruc",
    bio: "bio",
};

export function mapOrganizerError(error: unknown, fallbackMessage: string): ActionResult {
    if (!(error instanceof BackendApiError)) {
        return {
            success: false,
            message: fallbackMessage,
        };
    }

    const fieldErrors = error.payload.fieldErrors?.reduce<Record<string, string>>(
        (result, fieldError) => {
            const field = API_TO_FORM_FIELD[fieldError.field] ?? fieldError.field;
            result[field] = fieldError.message;
            return result;
        },
        {}
    );

    const message =
        error.payload.code === "ACCESS_DENIED"
            ? "Tu sesión no tiene permisos para completar este onboarding."
            : error.payload.message;

    return {
        success: false,
        message,
        ...(fieldErrors && Object.keys(fieldErrors).length > 0 ? { fieldErrors } : {}),
        ...(error.payload.traceId ? { traceId: error.payload.traceId } : {}),
    };
}
