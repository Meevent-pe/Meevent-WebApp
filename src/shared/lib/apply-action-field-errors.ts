import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export function applyActionFieldErrors<TFields extends FieldValues>(
    fieldErrors: Record<string, string> | undefined,
    setError: UseFormSetError<TFields>
) {
    if (!fieldErrors) {
        return;
    }

    Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field as Path<TFields>, {
            type: "server",
            message,
        });
    });
}
