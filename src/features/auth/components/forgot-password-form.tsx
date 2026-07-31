"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { forgotPasswordAction } from "@/features/auth/actions/auth.actions";
import { AuthAlert } from "@/features/auth/components/auth-alert";
import { AuthSubmitButton } from "@/features/auth/components/auth-submit-button";
import { FormField } from "@/features/auth/components/form-field";
import { applyActionFieldErrors } from "@/features/auth/lib/apply-action-errors";
import {
    forgotPasswordSchema,
    type ForgotPasswordFormValues,
} from "@/features/auth/schemas/auth.schemas";
import type { AuthActionResult } from "@/features/auth/types/auth.types";
import { Input } from "@/shared/components/ui/input";

export function ForgotPasswordForm() {
    const [result, setResult] = useState<AuthActionResult | null>(null);
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
                <AuthAlert type={result.success ? "success" : "error"} message={result.message} />
            ) : null}

            <AuthSubmitButton pending={isSubmitting}>Enviar enlace</AuthSubmitButton>

            <p className="text-center text-sm">
                <Link href="/login" className="text-meevent-primary font-medium hover:underline">
                    Volver al inicio de sesión
                </Link>
            </p>
        </form>
    );
}
