import { BackendApiError } from "@/shared/services/backend-client.server";
import type { ActionResult } from "@/shared/types/action-result.types";

const API_TO_FORM_FIELD: Record<string, string> = {
    full_name: "fullName",
    fullName: "fullName",
    birth_date: "birthDate",
    birthDate: "birthDate",
    city_id: "cityId",
    cityId: "cityId",
    country_code: "phoneNumber",
    countryCode: "phoneNumber",
    phone_number: "phoneNumber",
    phoneNumber: "phoneNumber",
    newPassword: "password",
};

export function mapAuthError(error: unknown, fallbackMessage: string): ActionResult {
    if (!(error instanceof BackendApiError)) {
        return {
            success: false,
            message: fallbackMessage,
        };
    }

    const message =
        error.payload.code === "UNAUTHORIZED"
            ? "Las credenciales no son válidas o la cuenta aún no está verificada."
            : error.payload.message;

    const fieldErrors = error.payload.fieldErrors?.reduce<Record<string, string>>(
        (result, fieldError) => {
            const field = API_TO_FORM_FIELD[fieldError.field] ?? fieldError.field;
            result[field] = fieldError.message;
            return result;
        },
        {}
    );

    return {
        success: false,
        message,
        ...(fieldErrors && Object.keys(fieldErrors).length > 0 ? { fieldErrors } : {}),
        ...(error.payload.traceId ? { traceId: error.payload.traceId } : {}),
    };
}
