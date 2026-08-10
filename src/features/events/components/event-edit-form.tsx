"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { updateEventAction } from "@/features/events/actions/event.actions";
import {
    DEFAULT_EVENT_LOCATION,
    EventFormFields,
} from "@/features/events/components/event-form-fields";
import { uploadEventBanner } from "@/features/events/lib/cloudinary-upload";
import { toPeruDateTimeInput } from "@/features/events/lib/event-date-time";
import { eventUpdateSchema, type EventFormValues } from "@/features/events/schemas/event.schemas";
import type { EventResponseDto } from "@/features/events/types/event-api.types";
import { FormAlert } from "@/shared/components/forms/form-alert";
import { SubmitButton } from "@/shared/components/forms/submit-button";
import { applyActionFieldErrors } from "@/shared/lib/apply-action-field-errors";
import type { ActionResult } from "@/shared/types/action-result.types";

function toEventFormValues(event: EventResponseDto): EventFormValues {
    const hasCoordinates = event.latitude !== null && event.longitude !== null;

    return {
        title: event.title,
        description: event.description,
        bannerUrl: event.bannerUrl ?? "",
        startsAt: toPeruDateTimeInput(event.startsAt),
        endsAt: toPeruDateTimeInput(event.endsAt),
        venueName: event.venueName ?? "",
        address: event.address ?? "",
        cityId: event.cityId ?? DEFAULT_EVENT_LOCATION.cityId,
        latitude: event.latitude ?? DEFAULT_EVENT_LOCATION.latitude,
        longitude: event.longitude ?? DEFAULT_EVENT_LOCATION.longitude,
        locationConfirmed: hasCoordinates,
        salesOpenAt: event.salesOpenAt ? toPeruDateTimeInput(event.salesOpenAt) : "",
        salesCloseAt: event.salesCloseAt ? toPeruDateTimeInput(event.salesCloseAt) : "",
    };
}

export function EventEditForm({ event }: { event: EventResponseDto }) {
    const router = useRouter();
    const [result, setResult] = useState<ActionResult | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [uploadingBanner, setUploadingBanner] = useState(false);
    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventUpdateSchema),
        defaultValues: toEventFormValues(event),
    });
    const {
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        formState: { isSubmitting },
    } = form;

    function handleBannerChange(file: File | null) {
        setBannerFile(file);
        if (file) {
            setValue("bannerUrl", event.bannerUrl ?? "", { shouldValidate: false });
            clearErrors("bannerUrl");
        }
    }

    function handleBannerError(message: string | null) {
        if (message) setError("bannerUrl", { type: "validate", message });
        else clearErrors("bannerUrl");
    }

    const onSubmit = handleSubmit(async (values) => {
        setResult(null);
        let bannerUrl = values.bannerUrl;

        if (bannerFile && bannerUrl === (event.bannerUrl ?? "")) {
            setUploadingBanner(true);
            try {
                const uploadedBanner = await uploadEventBanner(bannerFile);
                bannerUrl = uploadedBanner.secureUrl;
                setValue("bannerUrl", bannerUrl, { shouldValidate: false });
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

        const actionResult = await updateEventAction(event.id, { ...values, bannerUrl });
        setResult(actionResult);
        if (!actionResult.success) {
            applyActionFieldErrors(actionResult.fieldErrors, setError);
            return;
        }

        setBannerFile(null);
        router.refresh();
    });
    const pending = isSubmitting || uploadingBanner;

    return (
        <form onSubmit={onSubmit} className="space-y-6" noValidate>
            <EventFormFields
                form={form}
                bannerFile={bannerFile}
                currentBannerUrl={event.bannerUrl}
                disabled={pending}
                onBannerChange={handleBannerChange}
                onBannerError={handleBannerError}
            />

            {result ? (
                <FormAlert
                    type={result.success ? "success" : "error"}
                    message={result.message}
                    traceId={result.traceId}
                />
            ) : null}

            <div className="flex justify-end sm:min-w-52">
                <SubmitButton
                    pending={pending}
                    pendingLabel={uploadingBanner ? "Subiendo banner..." : "Guardando cambios..."}
                >
                    Guardar cambios
                </SubmitButton>
            </div>
        </form>
    );
}
