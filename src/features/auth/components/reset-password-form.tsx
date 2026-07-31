"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { resetPasswordAction } from "@/features/auth/actions/auth.actions";
import { AuthAlert } from "@/features/auth/components/auth-alert";
import { AuthSubmitButton } from "@/features/auth/components/auth-submit-button";
import { FormField } from "@/features/auth/components/form-field";
import { PasswordInput } from "@/features/auth/components/password-input";
import { applyActionFieldErrors } from "@/features/auth/lib/apply-action-errors";
import {
    resetPasswordSchema,
    type ResetPasswordFormValues,
} from "@/features/auth/schemas/auth.schemas";
import type { AuthActionResult } from "@/features/auth/types/auth.types";

export function ResetPasswordForm({ token }: { token?: string }) {
    const router = useRouter();
    const [result, setResult] = useState<AuthActionResult | null>(null);
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
                <AuthAlert type="error" message="El enlace no contiene un token de recuperación." />
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
                <AuthAlert type={result.success ? "success" : "error"} message={result.message} />
            ) : null}

            <AuthSubmitButton pending={isSubmitting}>Guardar contraseña</AuthSubmitButton>
        </form>
    );
}
