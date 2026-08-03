"use client";

import { ImageIcon, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { validateEventBannerFile } from "@/features/events/lib/event-banner-validation";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

interface EventBannerFieldProps {
    file: File | null;
    currentUrl?: string | null;
    error?: string;
    disabled?: boolean;
    onChange(file: File | null): void;
    onError(message: string | null): void;
}

export function EventBannerField({
    file,
    currentUrl,
    error,
    disabled,
    onChange,
    onError,
}: EventBannerFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    async function handleFile(candidate: File | undefined) {
        if (!candidate) {
            return;
        }

        setChecking(true);
        onError(null);
        try {
            await validateEventBannerFile(candidate);
            onChange(candidate);
        } catch (validationError) {
            onChange(null);
            if (inputRef.current) {
                inputRef.current.value = "";
            }
            onError(
                validationError instanceof Error
                    ? validationError.message
                    : "El banner seleccionado no es válido."
            );
        } finally {
            setChecking(false);
        }
    }

    function clearFile() {
        onChange(null);
        onError(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    return (
        <div className="space-y-2">
            <label htmlFor="eventBanner" className="text-sm font-medium text-neutral-800">
                Banner del evento
            </label>

            <input
                ref={inputRef}
                id="eventBanner"
                type="file"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                className="sr-only"
                disabled={disabled || checking}
                onChange={(event) => void handleFile(event.target.files?.[0])}
            />

            <div
                className={cn(
                    "relative aspect-video overflow-hidden rounded-lg border border-dashed bg-neutral-50",
                    error ? "border-red-400" : "border-neutral-300"
                )}
            >
                {previewUrl || currentUrl ? (
                    <>
                        <Image
                            src={previewUrl ?? currentUrl ?? ""}
                            alt="Vista previa del banner"
                            fill
                            unoptimized
                            className="object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-black/65 px-3 py-2 text-xs text-white">
                            <span className="truncate">{file?.name ?? "Banner actual"}</span>
                            {file ? (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 shrink-0 text-white hover:bg-white/15 hover:text-white"
                                    onClick={clearFile}
                                    disabled={disabled}
                                >
                                    <X className="size-4" aria-hidden="true" />
                                    Quitar
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 shrink-0 text-white hover:bg-white/15 hover:text-white"
                                    onClick={() => inputRef.current?.click()}
                                    disabled={disabled || checking}
                                >
                                    <UploadCloud className="size-4" aria-hidden="true" />
                                    Cambiar
                                </Button>
                            )}
                        </div>
                    </>
                ) : (
                    <button
                        type="button"
                        className="flex h-full w-full flex-col items-center justify-center gap-2 px-5 text-center text-sm text-neutral-600 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60"
                        onClick={() => inputRef.current?.click()}
                        disabled={disabled || checking}
                    >
                        {checking ? (
                            <ImageIcon className="size-7" aria-hidden="true" />
                        ) : (
                            <UploadCloud className="size-7" aria-hidden="true" />
                        )}
                        <span className="font-medium text-neutral-800">
                            {checking ? "Validando imagen..." : "Seleccionar banner"}
                        </span>
                        <span className="max-w-md text-xs leading-5">
                            JPEG, PNG o WebP · máximo 5 MB · mínimo 1200 × 675 px · 16:9 recomendado
                        </span>
                    </button>
                )}
            </div>

            {error ? (
                <p id="eventBanner-error" className="text-xs text-red-600" role="alert">
                    {error}
                </p>
            ) : null}
        </div>
    );
}
