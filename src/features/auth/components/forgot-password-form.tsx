"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { forgotPasswordAction } from "@/features/auth/actions/auth.actions";
import {
    forgotPasswordSchema,
    type ForgotPasswordFormValues,
} from "@/features/auth/schemas/auth.schemas";
import { FormAlert } from "@/shared/components/forms/form-alert";
import { FormField } from "@/shared/components/forms/form-field";
import { SubmitButton } from "@/shared/components/forms/submit-button";
import { Input } from "@/shared/components/ui/input";
import { applyActionFieldErrors } from "@/shared/lib/apply-action-field-errors";
import type { ActionResult } from "@/shared/types/action-result.types";

export function ForgotPasswordForm() {
    const [result, setResult] = useState<ActionResult | null>(null);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = handleSubmit(async (values) => {
        setResult(null);
        const actionResult = await forgotPasswordAction(values);
        setResult(actionResult);

        if (!actionResult.success) {
            applyActionFieldErrors(actionResult.fieldErrors, setError);
        }
    });

    return (
        <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <FormField id="recoveryEmail" label="Correo electrónico" error={errors.email?.message}>
                <Input
                    id="recoveryEmail"
                    type="email"
                    autoComplete="email"
                    placeholder="nombre@correo.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "recoveryEmail-error" : undefined}
                    {...register("email")}
                />
            </FormField>

            {result ? (
                <FormAlert
                    type={result.success ? "success" : "error"}
                    message={result.message}
                    traceId={result.traceId}
                />
            ) : null}

            <SubmitButton pending={isSubmitting}>Enviar enlace</SubmitButton>

            <p className="text-center text-sm">
                <Link href="/login" className="text-meevent-primary font-medium hover:underline">
                    Volver al inicio de sesión
                </Link>
            </p>
        </form>
    );
}
