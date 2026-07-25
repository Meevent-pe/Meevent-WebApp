"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { loginAction } from "@/features/auth/actions/auth.actions";
import { AuthAlert } from "@/features/auth/components/auth-alert";
import { AuthSubmitButton } from "@/features/auth/components/auth-submit-button";
import { FormField } from "@/features/auth/components/form-field";
import { GoogleAuthButton } from "@/features/auth/components/google-auth-button";
import { PasswordInput } from "@/features/auth/components/password-input";
import { applyActionFieldErrors } from "@/features/auth/lib/apply-action-errors";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas/auth.schemas";
import type { AuthActionResult } from "@/features/auth/types/auth.types";
import { Input } from "@/shared/components/ui/input";

export function LoginForm({ initialMessage }: { initialMessage?: string }) {
    const router = useRouter();
    const [result, setResult] = useState<AuthActionResult | null>(
        initialMessage ? { success: true, message: initialMessage } : null
    );
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = handleSubmit(async (values) => {
        setResult(null);
        const actionResult = await loginAction(values);
        setResult(actionResult);

        if (!actionResult.success) {
            applyActionFieldErrors(actionResult.fieldErrors, setError);
            return;
        }

        router.replace("/");
        router.refresh();
    });

    return (
        <div className="space-y-6">
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
                <FormField id="email" label="Correo electrónico" error={errors.email?.message}>
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="nombre@correo.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        {...register("email")}
                    />
                </FormField>

                <FormField id="password" label="Contraseña" error={errors.password?.message}>
                    <PasswordInput
                        id="password"
                        autoComplete="current-password"
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? "password-error" : undefined}
                        {...register("password")}
                    />
                </FormField>

                <div className="text-right">
                    <Link
                        href="/forgot-password"
                        className="text-meevent-primary text-sm font-medium hover:underline"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                {result ? (
                    <AuthAlert
                        type={result.success ? "success" : "error"}
                        message={result.message}
                    />
                ) : null}

                <AuthSubmitButton pending={isSubmitting}>Iniciar sesión</AuthSubmitButton>
            </form>

            <div className="flex items-center gap-3 text-xs text-neutral-400">
                <span className="h-px flex-1 bg-neutral-200" />
                o continúa con
                <span className="h-px flex-1 bg-neutral-200" />
            </div>

            <GoogleAuthButton />

            <p className="text-center text-sm text-neutral-600">
                ¿Aún no tienes una cuenta?{" "}
                <Link href="/register" className="text-meevent-primary font-medium hover:underline">
                    Crear cuenta
                </Link>
            </p>
        </div>
    );
}
