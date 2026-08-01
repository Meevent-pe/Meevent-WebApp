"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { onboardOrganizerAction } from "@/features/organizer/actions/organizer.actions";
import {
    organizerOnboardingSchema,
    type OrganizerOnboardingFormValues,
} from "@/features/organizer/schemas/organizer.schemas";
import { FormAlert } from "@/shared/components/forms/form-alert";
import { FormField } from "@/shared/components/forms/form-field";
import { SubmitButton } from "@/shared/components/forms/submit-button";
import { Input } from "@/shared/components/ui/input";
import { applyActionFieldErrors } from "@/shared/lib/apply-action-field-errors";
import { cn } from "@/shared/lib/utils";
import type { ActionResult } from "@/shared/types/action-result.types";

export function OrganizerOnboardingForm() {
    const router = useRouter();
    const [result, setResult] = useState<ActionResult | null>(null);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<OrganizerOnboardingFormValues>({
        resolver: zodResolver(organizerOnboardingSchema),
        defaultValues: {
            legalName: "",
            displayName: "",
            ruc: "",
            contactPhone: "",
            bio: "",
        },
    });

    const onSubmit = handleSubmit(async (values) => {
        setResult(null);
        const actionResult = await onboardOrganizerAction(values);
        setResult(actionResult);

        if (!actionResult.success) {
            applyActionFieldErrors(actionResult.fieldErrors, setError);
            return;
        }

        router.replace("/login?organizerOnboarding=success");
        router.refresh();
    });

    return (
        <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <FormField id="legalName" label="Nombre legal" error={errors.legalName?.message}>
                <Input
                    id="legalName"
                    autoComplete="organization"
                    maxLength={150}
                    placeholder="Razón social o nombre legal"
                    aria-invalid={!!errors.legalName}
                    aria-describedby={errors.legalName ? "legalName-error" : undefined}
                    {...register("legalName")}
                />
            </FormField>

            <FormField id="displayName" label="Nombre público" error={errors.displayName?.message}>
                <Input
                    id="displayName"
                    maxLength={120}
                    placeholder="Nombre que verán tus asistentes"
                    aria-invalid={!!errors.displayName}
                    aria-describedby={errors.displayName ? "displayName-error" : undefined}
                    {...register("displayName")}
                />
            </FormField>

            <div className="grid gap-5 sm:grid-cols-2">
                <FormField id="ruc" label="RUC" error={errors.ruc?.message} optional>
                    <Input
                        id="ruc"
                        type="text"
                        inputMode="numeric"
                        maxLength={11}
                        pattern="[0-9]*"
                        placeholder="Número de RUC"
                        aria-invalid={!!errors.ruc}
                        aria-describedby={errors.ruc ? "ruc-error" : undefined}
                        {...register("ruc", {
                            onChange: (event) => {
                                event.target.value = event.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 11);
                            },
                        })}
                    />
                </FormField>

                <FormField
                    id="contactPhone"
                    label="Teléfono de contacto"
                    error={errors.contactPhone?.message}
                    optional
                >
                    <Input
                        id="contactPhone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        maxLength={9}
                        pattern="9[0-9]{8}"
                        placeholder="999999999"
                        aria-invalid={!!errors.contactPhone}
                        aria-describedby={errors.contactPhone ? "contactPhone-error" : undefined}
                        {...register("contactPhone", {
                            onChange: (event) => {
                                event.target.value = event.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 9);
                            },
                        })}
                    />
                </FormField>
            </div>

            <FormField id="bio" label="Descripción" error={errors.bio?.message} optional>
                <textarea
                    id="bio"
                    rows={5}
                    placeholder="Cuéntanos brevemente sobre tu organización o tus eventos"
                    aria-invalid={!!errors.bio}
                    aria-describedby={errors.bio ? "bio-error" : undefined}
                    className={cn(
                        "border-input placeholder:text-muted-foreground min-h-28 w-full resize-y rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none",
                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                        "aria-invalid:border-destructive aria-invalid:ring-destructive/20"
                    )}
                    {...register("bio")}
                />
            </FormField>

            {result && !result.success ? (
                <FormAlert type="error" message={result.message} traceId={result.traceId} />
            ) : null}

            <p className="text-xs leading-5 text-neutral-500">
                Al continuar, tu cuenta de asistente se convertirá en una cuenta de organizador.
                Tendrás que iniciar sesión nuevamente para actualizar tus permisos.
            </p>

            <SubmitButton pending={isSubmitting} pendingLabel="Creando perfil...">
                Convertirme en organizador
            </SubmitButton>
        </form>
    );
}
