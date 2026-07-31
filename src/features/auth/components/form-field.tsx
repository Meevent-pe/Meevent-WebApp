import type { ReactNode } from "react";

interface FormFieldProps {
    id: string;
    label: string;
    error?: string;
    hint?: string;
    children: ReactNode;
}

export function FormField({ id, label, error, hint, children }: FormFieldProps) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="text-sm font-medium text-neutral-800">
                {label}
            </label>
            {children}
            {error ? (
                <p id={`${id}-error`} className="text-xs text-red-600">
                    {error}
                </p>
            ) : hint ? (
                <p id={`${id}-hint`} className="text-xs text-neutral-500">
                    {hint}
                </p>
            ) : null}
        </div>
    );
}
