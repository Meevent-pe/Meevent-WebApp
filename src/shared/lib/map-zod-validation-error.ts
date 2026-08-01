import type { ZodError } from "zod";

import type { ActionResult } from "@/shared/types/action-result.types";

export function mapZodValidationError(error: ZodError): ActionResult {
    const fieldErrors = error.issues.reduce<Record<string, string>>((result, issue) => {
        const field = issue.path[0];
        if (typeof field === "string" && !result[field]) {
            result[field] = issue.message;
        }
        return result;
    }, {});

    return {
        success: false,
        message: "Revisa los datos ingresados.",
        fieldErrors,
    };
}
