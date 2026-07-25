"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { registerAction } from "@/features/auth/actions/auth.actions";
import { AuthAlert } from "@/features/auth/components/auth-alert";
import { AuthSubmitButton } from "@/features/auth/components/auth-submit-button";
import { FormField } from "@/features/auth/components/form-field";
import { GoogleAuthButton } from "@/features/auth/components/google-auth-button";
import { PasswordInput } from "@/features/auth/components/password-input";
import { PERU_DEPARTMENTS } from "@/features/auth/constants/peru-departments";
import { applyActionFieldErrors } from "@/features/auth/lib/apply-action-errors";
import { registerSchema, type RegisterFormValues } from "@/features/auth/schemas/auth.schemas";
import type { AuthActionResult } from "@/features/auth/types/auth.types";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";

export function RegisterForm() {
    const [result, setResult] = useState<AuthActionResult | null>(null);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            birthDate: "",
            cityId: 1,
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = handleSubmit(async (values) => {
        setResult(null);
        const actionResult = await registerAction(values);
        setResult(actionResult);

        if (!actionResult.success) {
            applyActionFieldErrors(actionResult.fieldErrors, setError);
        }
    });

    if (result?.success) {
        return (
            <div className="space-y-5 text-center">
                <AuthAlert type="success" message={result.message} />
                <p className="text-sm leading-6 text-neutral-600">
                    Abre el enlace que enviamos a tu correo para verificar tu cuenta. El enlace
                    tiene una vigencia limitada; revisa también la carpeta de spam.
                </p>
                <Link href="/login" className="text-meevent-primary font-medium hover:underline">
                    Volver al inicio de sesión
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <FormField
                            id="fullName"
                            label="Nombre completo"
                            error={errors.fullName?.message}
                        >
                            <Input
                                id="fullName"
                                autoComplete="name"
                                placeholder="Nombres y apellidos"
                                aria-invalid={!!errors.fullName}
                                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                                {...register("fullName")}
                            />
                        </FormField>
                    </div>

                    <FormField
                        id="birthDate"
                        label="Fecha de nacimiento (opcional)"
                        error={errors.birthDate?.message}
                    >
                        <Input
                            id="birthDate"
                            type="date"
                            autoComplete="bday"
                            aria-invalid={!!errors.birthDate}
                            aria-describedby={errors.birthDate ? "birthDate-error" : undefined}
                            {...register("birthDate")}
                        />
                    </FormField>

                    <FormField id="cityId" label="Departamento" error={errors.cityId?.message}>
                        <select
                            id="cityId"
                            autoComplete="address-level1"
                            aria-invalid={!!errors.cityId}
                            aria-describedby={errors.cityId ? "cityId-error" : undefined}
                            className={cn(
                                "border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none",
                                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                errors.cityId && "border-destructive"
                            )}
                            {...register("cityId", { valueAsNumber: true })}
                        >
                            {PERU_DEPARTMENTS.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                    </FormField>

                    <FormField
                        id="registerEmail"
                        label="Correo electrónico"
                        error={errors.email?.message}
                    >
                        <Input
                            id="registerEmail"
                            type="email"
                            autoComplete="email"
                            placeholder="nombre@correo.com"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "registerEmail-error" : undefined}
                            {...register("email")}
                        />
                    </FormField>

                    <FormField
                        id="phoneNumber"
                        label="Teléfono (opcional)"
                        error={errors.phoneNumber?.message}
                    >
                        <div className="flex">
                            <span className="border-input flex h-9 items-center rounded-l-md border border-r-0 bg-neutral-50 px-3 text-sm text-neutral-600">
                                +51
                            </span>
                            <Input
                                id="phoneNumber"
                                type="tel"
                                inputMode="numeric"
                                autoComplete="tel-national"
                                maxLength={9}
                                placeholder="999999999"
                                className="rounded-l-none"
                                aria-invalid={!!errors.phoneNumber}
                                aria-describedby={
                                    errors.phoneNumber ? "phoneNumber-error" : undefined
                                }
                                {...register("phoneNumber")}
                            />
                        </div>
                    </FormField>

                    <FormField
                        id="registerPassword"
                        label="Contraseña"
                        error={errors.password?.message}
                        hint="Mínimo 8 caracteres con mayúscula, minúscula, número y símbolo."
                    >
                        <PasswordInput
                            id="registerPassword"
                            autoComplete="new-password"
                            aria-invalid={!!errors.password}
                            aria-describedby={
                                errors.password ? "registerPassword-error" : "registerPassword-hint"
                            }
                            {...register("password")}
                        />
                    </FormField>

                    <FormField
                        id="confirmPassword"
                        label="Confirmar contraseña"
                        error={errors.confirmPassword?.message}
                    >
                        <PasswordInput
                            id="confirmPassword"
                            autoComplete="new-password"
                            aria-invalid={!!errors.confirmPassword}
                            aria-describedby={
                                errors.confirmPassword ? "confirmPassword-error" : undefined
                            }
                            {...register("confirmPassword")}
                        />
                    </FormField>
                </div>

                {result ? (
                    <AuthAlert
                        type={result.success ? "success" : "error"}
                        message={result.message}
                    />
                ) : null}

                <AuthSubmitButton pending={isSubmitting}>Crear cuenta</AuthSubmitButton>
            </form>

            <div className="flex items-center gap-3 text-xs text-neutral-400">
                <span className="h-px flex-1 bg-neutral-200" />
                o regístrate con
                <span className="h-px flex-1 bg-neutral-200" />
            </div>

            <GoogleAuthButton />

            <p className="text-center text-sm text-neutral-600">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-meevent-primary font-medium hover:underline">
                    Iniciar sesión
                </Link>
            </p>
        </div>
    );
}
