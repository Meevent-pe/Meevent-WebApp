"use client";

import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import { EventBannerField } from "@/features/events/components/event-banner-field";
import {
    EventLocationPicker,
    type EventLocationValue,
} from "@/features/events/components/event-location-picker";
import { toPeruDateTimeInput } from "@/features/events/lib/event-date-time";
import type { EventFormValues } from "@/features/events/schemas/event.schemas";
import { FormField } from "@/shared/components/forms/form-field";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";

export const DEFAULT_EVENT_LOCATION: EventLocationValue = {
    venueName: "",
    address: "",
    cityId: 1,
    latitude: -12.046374,
    longitude: -77.042793,
    locationConfirmed: false,
};

interface EventFormFieldsProps {
    form: UseFormReturn<EventFormValues>;
    bannerFile: File | null;
    currentBannerUrl?: string | null;
    disabled: boolean;
    requireFutureStart?: boolean;
    onBannerChange(file: File | null): void;
    onBannerError(message: string | null): void;
}

export function EventFormFields({
    form,
    bannerFile,
    currentBannerUrl,
    disabled,
    requireFutureStart = false,
    onBannerChange,
    onBannerError,
}: EventFormFieldsProps) {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = form;
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
    const [minimumDateTime] = useState(() =>
        requireFutureStart ? toPeruDateTimeInput(new Date(Date.now() + 60_000)) : undefined
    );

    return (
        <>
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
                    currentUrl={currentBannerUrl}
                    error={errors.bannerUrl?.message}
                    disabled={disabled}
                    onChange={onBannerChange}
                    onError={onBannerError}
                />

                <FormField id="title" label="Título" error={errors.title?.message}>
                    <Input
                        id="title"
                        maxLength={180}
                        placeholder="Ej. Festival de música en Lima"
                        aria-invalid={!!errors.title}
                        disabled={disabled}
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
                        disabled={disabled}
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
                            disabled={disabled}
                            {...register("startsAt")}
                        />
                    </FormField>
                    <FormField id="endsAt" label="Fin del evento" error={errors.endsAt?.message}>
                        <Input
                            id="endsAt"
                            type="datetime-local"
                            min={watch("startsAt") || minimumDateTime}
                            aria-invalid={!!errors.endsAt}
                            disabled={disabled}
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
                            disabled={disabled}
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
                            disabled={disabled}
                            {...register("salesCloseAt")}
                        />
                    </FormField>
                    <FormField
                        id="maxAttendees"
                        label="Aforo máximo"
                        error={errors.maxAttendees?.message}
                        hint="Este valor no se puede retirar una vez creado el evento."
                    >
                        <Input
                            id="maxAttendees"
                            type="number"
                            inputMode="numeric"
                            min={1}
                            max={1_000_000}
                            placeholder="Ej. 500"
                            aria-invalid={!!errors.maxAttendees}
                            disabled={disabled}
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
                    disabled={disabled}
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
        </>
    );
}
