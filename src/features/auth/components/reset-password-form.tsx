"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { resetPasswordAction } from "@/features/auth/actions/auth.actions";
import { PasswordInput } from "@/features/auth/components/password-input";
import {
    resetPasswordSchema,
    type ResetPasswordFormValues,
} from "@/features/auth/schemas/auth.schemas";
import { FormAlert } from "@/shared/components/forms/form-alert";
import { FormField } from "@/shared/components/forms/form-field";
import { SubmitButton } from "@/shared/components/forms/submit-button";
import { applyActionFieldErrors } from "@/shared/lib/apply-action-field-errors";
import type { ActionResult } from "@/shared/types/action-result.types";

export function ResetPasswordForm({ token }: { token?: string }) {
    const router = useRouter();
    const [result, setResult] = useState<ActionResult | null>(null);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            token: token ?? "",
            password: "",
            confirmPassword: "",
        },
    });

    if (!token) {
        return (
            <div className="space-y-5">
                <FormAlert type="error" message="El enlace no contiene un token de recuperación." />
                <p className="text-center text-sm">
                    <Link
                        href="/forgot-password"
                        className="text-meevent-primary font-medium hover:underline"
                    >
                        Solicitar un nuevo enlace
                    </Link>
                </p>
            </div>
        );
    }

    const onSubmit = handleSubmit(async (values) => {
        setResult(null);
        const actionResult = await resetPasswordAction(values);
        setResult(actionResult);

        if (!actionResult.success) {
            applyActionFieldErrors(actionResult.fieldErrors, setError);
            return;
        }

        router.replace("/login?passwordReset=success");
    });

    return (
        <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <input type="hidden" {...register("token")} />

            <FormField
                id="newPassword"
                label="Nueva contraseña"
                error={errors.password?.message}
                hint="Mínimo 8 caracteres con mayúscula, minúscula, número y símbolo."
            >
                <PasswordInput
                    id="newPassword"
                    autoComplete="new-password"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "newPassword-error" : "newPassword-hint"}
                    {...register("password")}
                />
            </FormField>

            <FormField
                id="confirmNewPassword"
                label="Confirmar nueva contraseña"
                error={errors.confirmPassword?.message}
            >
                <PasswordInput
                    id="confirmNewPassword"
                    autoComplete="new-password"
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={
                        errors.confirmPassword ? "confirmNewPassword-error" : undefined
                    }
                    {...register("confirmPassword")}
                />
            </FormField>

            {result ? (
                <FormAlert
                    type={result.success ? "success" : "error"}
                    message={result.message}
                    traceId={result.traceId}
                />
            ) : null}

            <SubmitButton pending={isSubmitting}>Guardar contraseña</SubmitButton>
        </form>
    );
}
