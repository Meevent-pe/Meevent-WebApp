import { BackendApiError } from "@/shared/services/backend-client.server";
import type { ActionResult } from "@/shared/types/action-result.types";

const API_TO_FORM_FIELD: Record<string, string> = {
    banner_url: "bannerUrl",
    bannerUrl: "bannerUrl",
    starts_at: "startsAt",
    startsAt: "startsAt",
    ends_at: "endsAt",
    endsAt: "endsAt",
    venue_name: "venueName",
    venueName: "venueName",
    city_id: "cityId",
    cityId: "cityId",
    sales_open_at: "salesOpenAt",
    salesOpenAt: "salesOpenAt",
    sales_close_at: "salesCloseAt",
    salesCloseAt: "salesCloseAt",
};

export function mapEventError(error: unknown, fallbackMessage: string): ActionResult {
    if (!(error instanceof BackendApiError)) {
        return { success: false, message: fallbackMessage };
    }

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
        message:
            error.payload.code === "ACCESS_DENIED"
                ? "Tu sesión no tiene permisos para gestionar eventos."
                : error.payload.message,
        ...(fieldErrors && Object.keys(fieldErrors).length > 0 ? { fieldErrors } : {}),
        ...(error.payload.traceId ? { traceId: error.payload.traceId } : {}),
    };
}
