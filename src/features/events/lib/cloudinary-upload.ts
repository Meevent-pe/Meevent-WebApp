import { getEventBannerUploadSignatureAction } from "@/features/events/actions/cloudinary.actions";
import {
    EVENT_BANNER_ALLOWED_FORMATS,
    EVENT_BANNER_CLOUDINARY_TOO_LARGE_ERROR,
    EVENT_BANNER_MAX_BYTES,
    EVENT_BANNER_MAX_DIMENSION,
    EVENT_BANNER_MIN_HEIGHT,
    EVENT_BANNER_MIN_WIDTH,
} from "@/features/events/constants/event-banner.constants";
import { cloudinaryUploadResponseSchema } from "@/features/events/schemas/event-api.schemas";
import type { UploadedEventBanner } from "@/features/events/types/cloudinary.types";

interface CloudinaryErrorPayload {
    error?: { message?: string };
}

export async function uploadEventBanner(file: File): Promise<UploadedEventBanner> {
    const signatureResult = await getEventBannerUploadSignatureAction();
    if (!signatureResult.success) {
        throw new Error(signatureResult.message);
    }

    const { uploadUrl, apiKey, signature, params } = signatureResult.data;
    const formData = new FormData();
    formData.set("file", file);
    formData.set("api_key", apiKey);
    formData.set("signature", signature);
    Object.entries(params).forEach(([key, value]) => formData.set(key, value));

    const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
        signal: AbortSignal.timeout(45_000),
    });

    const payload: unknown = await response.json();
    if (!response.ok) {
        const cloudinaryError = payload as CloudinaryErrorPayload;
        const message = cloudinaryError.error?.message;

        if (message?.includes(EVENT_BANNER_CLOUDINARY_TOO_LARGE_ERROR)) {
            throw new Error("La imagen supera el máximo permitido de 5 MB.");
        }

        throw new Error(message ?? "Cloudinary no pudo procesar el banner.");
    }

    const parsed = cloudinaryUploadResponseSchema.safeParse(payload);
    if (!parsed.success) {
        throw new Error("Cloudinary devolvió una respuesta de imagen inválida.");
    }

    const uploaded = parsed.data;
    if (!EVENT_BANNER_ALLOWED_FORMATS.includes(uploaded.format as never)) {
        throw new Error("Cloudinary recibió un formato de imagen no permitido.");
    }
    if (uploaded.bytes > EVENT_BANNER_MAX_BYTES) {
        throw new Error("La imagen procesada por Cloudinary supera los 5 MB.");
    }
    if (uploaded.width < EVENT_BANNER_MIN_WIDTH || uploaded.height < EVENT_BANNER_MIN_HEIGHT) {
        throw new Error("La imagen procesada no cumple las dimensiones mínimas.");
    }
    if (
        uploaded.width > EVENT_BANNER_MAX_DIMENSION ||
        uploaded.height > EVENT_BANNER_MAX_DIMENSION
    ) {
        throw new Error("La imagen procesada supera las dimensiones máximas.");
    }

    return {
        secureUrl: uploaded.secure_url,
        publicId: uploaded.public_id,
        width: uploaded.width,
        height: uploaded.height,
        bytes: uploaded.bytes,
        format: uploaded.format,
    };
}
