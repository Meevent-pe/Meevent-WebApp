"use server";

import { createHash } from "node:crypto";

import { getSession } from "@/features/auth/session.server";
import {
    EVENT_BANNER_ALLOWED_FORMATS,
    EVENT_BANNER_CLOUDINARY_FOLDER,
    EVENT_BANNER_CLOUDINARY_SIZE_EVAL,
} from "@/features/events/constants/event-banner.constants";
import type { CloudinarySignatureResult } from "@/features/events/types/cloudinary.types";
import { organizerApi } from "@/features/organizer/server/organizer-api.server";
import { getCloudinaryEnv } from "@/shared/config/env.server";

function signCloudinaryParams(params: Record<string, string>, secret: string) {
    const serialized = Object.entries(params)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

    return createHash("sha1").update(`${serialized}${secret}`).digest("hex");
}

export async function getEventBannerUploadSignatureAction(): Promise<CloudinarySignatureResult> {
    const session = await getSession();
    if (!session) {
        return { success: false, message: "Tu sesión no permite subir banners de eventos." };
    }

    try {
        // El JWT se decodifica localmente solo para mantener la sesión. Spring Boot
        // valida su firma y el rol ORGANIZER antes de autorizar una subida externa.
        await organizerApi.getCurrent(session.accessToken);
    } catch {
        return {
            success: false,
            message: "No se pudo validar tu sesión de organizador. Inicia sesión nuevamente.",
        };
    }

    const env = getCloudinaryEnv();
    const params: Record<string, string> = {
        allowed_formats: EVENT_BANNER_ALLOWED_FORMATS.join(","),
        eval: EVENT_BANNER_CLOUDINARY_SIZE_EVAL,
        folder: EVENT_BANNER_CLOUDINARY_FOLDER,
        overwrite: "false",
        tags: "event-banner",
        timestamp: String(Math.floor(Date.now() / 1000)),
        unique_filename: "true",
        upload_preset: env.CLOUDINARY_UPLOAD_PRESET,
    };

    return {
        success: true,
        data: {
            cloudName: env.CLOUDINARY_CLOUD_NAME,
            apiKey: env.CLOUDINARY_API_KEY,
            signature: signCloudinaryParams(params, env.CLOUDINARY_API_SECRET),
            uploadUrl: `https://api.cloudinary.com/v1_1/${encodeURIComponent(env.CLOUDINARY_CLOUD_NAME)}/image/upload`,
            params,
        },
    };
}
