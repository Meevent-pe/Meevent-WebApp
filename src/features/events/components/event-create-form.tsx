"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { createEventAction } from "@/features/events/actions/event.actions";
import { EventBannerField } from "@/features/events/components/event-banner-field";
import {
    EventLocationPicker,
    type EventLocationValue,
} from "@/features/events/components/event-location-picker";
import { uploadEventBanner } from "@/features/events/lib/cloudinary-upload";
import { eventFormSchema, type EventFormValues } from "@/features/events/schemas/event.schemas";
import { FormAlert } from "@/shared/components/forms/form-alert";
import { FormField } from "@/shared/components/forms/form-field";
import { SubmitButton } from "@/shared/components/forms/submit-button";
import { buttonVariants } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { applyActionFieldErrors } from "@/shared/lib/apply-action-field-errors";
import { cn } from "@/shared/lib/utils";
import type { ActionResult } from "@/shared/types/action-result.types";

const DEFAULT_LOCATION: EventLocationValue = {
    venueName: "",
    address: "",
    cityId: 1,
    latitude: -12.046374,
    longitude: -77.042793,
    locationConfirmed: false,
};

function toLocalDateTimeInput(date: Date) {
    const offset = date.getTimezoneOffset() * 60_000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export function EventCreateForm() {
    const router = useRouter();
    const [result, setResult] = useState<ActionResult | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [uploadingBanner, setUploadingBanner] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<EventFormValues>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            title: "",
            description: "",
            bannerUrl: "",
            startsAt: "",
            endsAt: "",
            venueName: DEFAULT_LOCATION.venueName,
            address: DEFAULT_LOCATION.address,
            cityId: DEFAULT_LOCATION.cityId,
            latitude: DEFAULT_LOCATION.latitude,
            longitude: DEFAULT_LOCATION.longitude,
            locationConfirmed: DEFAULT_LOCATION.locationConfirmed,
            salesOpenAt: "",
            salesCloseAt: "",
            maxAttendees: "",
        },
    });

    const location: EventLocationValue = {
        venueName: watch("venueName"),
        address: watch("address"),
        cityId: watch("cityId"),
        latitude: watch("latitude"),
        longitude: watch("longitude"),
        locationConfirmed: watch("locationConfirmed"),
    };

    const handleLocationChange = useCallback(
        (nextLocation: EventLocationValue) => {
            setValue("venueName", nextLocation.venueName, { shouldValidate: true });
            setValue("address", nextLocation.address, { shouldValidate: true });
            setValue("cityId", nextLocation.cityId, { shouldValidate: true });
            setValue("latitude", nextLocation.latitude, { shouldValidate: true });
            setValue("longitude", nextLocation.longitude, { shouldValidate: true });
            setValue("locationConfirmed", nextLocation.locationConfirmed, {
                shouldValidate: true,
            });
        },
        [setValue]
    );

    function handleBannerChange(file: File | null) {
        setBannerFile(file);
        setValue("bannerUrl", "", { shouldValidate: false });
        if (file) {
            clearErrors("bannerUrl");
        }
    }

    function handleBannerError(message: string | null) {
        if (message) {
            setError("bannerUrl", { type: "validate", message });
        } else {
            clearErrors("bannerUrl");
        }
    }

    const onSubmit = handleSubmit(async (values) => {
        setResult(null);

        let bannerUrl = values.bannerUrl;
        if (!bannerUrl && !bannerFile) {
            setError("bannerUrl", {
                type: "required",
                message: "Selecciona un banner para el evento",
            });
            return;
        }

        if (!bannerUrl && bannerFile) {
            setUploadingBanner(true);
            try {
                const uploadedBanner = await uploadEventBanner(bannerFile);
                bannerUrl = uploadedBanner.secureUrl;
                setValue("bannerUrl", bannerUrl, { shouldValidate: true });
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "No se pudo subir el banner del evento.";
                setError("bannerUrl", { type: "server", message });
                setResult({ success: false, message });
                return;
            } finally {
                setUploadingBanner(false);
            }
        }

        const actionResult = await createEventAction({ ...values, bannerUrl });
        setResult(actionResult);
        if (!actionResult.success) {
            applyActionFieldErrors(actionResult.fieldErrors, setError);
            return;
        }

        router.replace(actionResult.redirectTo ?? "/organizer/events");
        router.refresh();
    });

    const pending = isSubmitting || uploadingBanner;
    const minimumDateTime = toLocalDateTimeInput(new Date(Date.now() + 60_000));

    return (
        <form onSubmit={onSubmit} className="space-y-6" noValidate>
            <input type="hidden" {...register("bannerUrl")} />
            <input type="hidden" {...register("latitude", { valueAsNumber: true })} />
            <input type="hidden" {...register("longitude", { valueAsNumber: true })} />
            <input
                type="checkbox"
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
                {...register("locationConfirmed")}
            />

            <section className="space-y-5 rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
                <div>
                    <h2 className="font-semibold text-neutral-950">Información principal</h2>
                    <p className="mt-1 text-sm text-neutral-600">
                        Esta información identificará el evento dentro de Meevent.
                    </p>
                </div>

                <EventBannerField
                    file={bannerFile}
                    error={errors.bannerUrl?.message}
                    disabled={pending}
                    onChange={handleBannerChange}
                    onError={handleBannerError}
                />

                <FormField id="title" label="Título" error={errors.title?.message}>
                    <Input
                        id="title"
                        maxLength={180}
                        placeholder="Ej. Festival de música en Lima"
                        aria-invalid={!!errors.title}
                        {...register("title")}
                    />
                </FormField>

                <FormField
                    id="description"
                    label="Descripción"
                    error={errors.description?.message}
                    hint="Máximo 2000 caracteres."
                >
                    <textarea
                        id="description"
                        rows={6}
                        maxLength={2000}
                        placeholder="Describe la experiencia, programación y datos importantes del evento"
                        aria-invalid={!!errors.description}
                        className={cn(
                            "border-input placeholder:text-muted-foreground min-h-32 w-full resize-y rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none",
                            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                            "aria-invalid:border-destructive aria-invalid:ring-destructive/20"
                        )}
                        {...register("description")}
                    />
                </FormField>
            </section>

            <section className="space-y-5 rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
                <div>
                    <h2 className="font-semibold text-neutral-950">Fecha y capacidad</h2>
                    <p className="mt-1 text-sm text-neutral-600">
                        Todas las horas se guardarán usando la zona horaria de Lima, Perú.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                        id="startsAt"
                        label="Inicio del evento"
                        error={errors.startsAt?.message}
                    >
                        <Input
                            id="startsAt"
                            type="datetime-local"
                            min={minimumDateTime}
                            aria-invalid={!!errors.startsAt}
                            {...register("startsAt")}
                        />
                    </FormField>
                    <FormField id="endsAt" label="Fin del evento" error={errors.endsAt?.message}>
                        <Input
                            id="endsAt"
                            type="datetime-local"
                            min={watch("startsAt") || minimumDateTime}
                            aria-invalid={!!errors.endsAt}
                            {...register("endsAt")}
                        />
                    </FormField>
                    <FormField
                        id="salesOpenAt"
                        label="Apertura de ventas"
                        error={errors.salesOpenAt?.message}
                        optional
                    >
                        <Input
                            id="salesOpenAt"
                            type="datetime-local"
                            aria-invalid={!!errors.salesOpenAt}
                            {...register("salesOpenAt")}
                        />
                    </FormField>
                    <FormField
                        id="salesCloseAt"
                        label="Cierre de ventas"
                        error={errors.salesCloseAt?.message}
                        optional
                    >
                        <Input
                            id="salesCloseAt"
                            type="datetime-local"
                            min={watch("salesOpenAt") || undefined}
                            max={watch("startsAt") || undefined}
                            aria-invalid={!!errors.salesCloseAt}
                            {...register("salesCloseAt")}
                        />
                    </FormField>
                    <FormField
                        id="maxAttendees"
                        label="Aforo máximo"
                        error={errors.maxAttendees?.message}
                        optional
                    >
                        <Input
                            id="maxAttendees"
                            type="number"
                            inputMode="numeric"
                            min={1}
                            max={1_000_000}
                            placeholder="Ej. 500"
                            aria-invalid={!!errors.maxAttendees}
                            {...register("maxAttendees", {
                                setValueAs: (value) => (value === "" ? "" : Number(value)),
                            })}
                        />
                    </FormField>
                </div>
            </section>

            <section className="space-y-5 rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
                <div>
                    <h2 className="font-semibold text-neutral-950">Ubicación</h2>
                    <p className="mt-1 text-sm text-neutral-600">
                        Google Maps completará el recinto, dirección, departamento y coordenadas.
                    </p>
                </div>

                <EventLocationPicker
                    value={location}
                    errors={{
                        venueName: errors.venueName?.message,
                        address: errors.address?.message,
                        cityId: errors.cityId?.message,
                        latitude: errors.latitude?.message,
                        longitude: errors.longitude?.message,
                        locationConfirmed: errors.locationConfirmed?.message,
                    }}
                    onChange={handleLocationChange}
                />
            </section>

            {result && !result.success ? (
                <FormAlert type="error" message={result.message} traceId={result.traceId} />
            ) : null}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Link
                    href="/organizer/events"
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "sm:w-auto")}
                >
                    Cancelar
                </Link>
                <div className="sm:min-w-52">
                    <SubmitButton
                        pending={pending}
                        pendingLabel={uploadingBanner ? "Subiendo banner..." : "Creando evento..."}
                    >
                        Crear evento
                    </SubmitButton>
                </div>
            </div>
        </form>
    );
}
