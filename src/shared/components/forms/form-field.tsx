import type { ReactNode } from "react";

interface FormFieldProps {
    id: string;
    label: string;
    error?: string;
    hint?: string;
    optional?: boolean;
    children: ReactNode;
}

export function FormField({ id, label, error, hint, optional, children }: FormFieldProps) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="text-sm font-medium text-neutral-800">
                {label}
                {optional ? (
                    <span className="font-normal text-neutral-500"> (opcional)</span>
                ) : null}
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
