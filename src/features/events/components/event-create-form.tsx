"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { createEventAction } from "@/features/events/actions/event.actions";
import {
    DEFAULT_EVENT_LOCATION,
    EventFormFields,
} from "@/features/events/components/event-form-fields";
import { uploadEventBanner } from "@/features/events/lib/cloudinary-upload";
import { eventFormSchema, type EventFormValues } from "@/features/events/schemas/event.schemas";
import { FormAlert } from "@/shared/components/forms/form-alert";
import { SubmitButton } from "@/shared/components/forms/submit-button";
import { buttonVariants } from "@/shared/components/ui/button";
import { applyActionFieldErrors } from "@/shared/lib/apply-action-field-errors";
import { cn } from "@/shared/lib/utils";
import type { ActionResult } from "@/shared/types/action-result.types";

export function EventCreateForm() {
    const router = useRouter();
    const [result, setResult] = useState<ActionResult | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [uploadingBanner, setUploadingBanner] = useState(false);
    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            title: "",
            description: "",
            bannerUrl: "",
            startsAt: "",
            endsAt: "",
            ...DEFAULT_EVENT_LOCATION,
            salesOpenAt: "",
            salesCloseAt: "",
        },
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
        setValue("bannerUrl", "", { shouldValidate: false });
        if (file) clearErrors("bannerUrl");
    }

    function handleBannerError(message: string | null) {
        if (message) setError("bannerUrl", { type: "validate", message });
        else clearErrors("bannerUrl");
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

    return (
        <form onSubmit={onSubmit} className="space-y-6" noValidate>
            <EventFormFields
                form={form}
                bannerFile={bannerFile}
                disabled={pending}
                requireFutureStart
                onBannerChange={handleBannerChange}
                onBannerError={handleBannerError}
            />

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
