import "server-only";

import { z } from "zod";

const serverEnvSchema = z.object({
    API_URL: z.url("API_URL debe ser una URL válida"),
});

const cloudinaryEnvSchema = z.object({
    CLOUDINARY_CLOUD_NAME: z.string().trim().min(1, "CLOUDINARY_CLOUD_NAME es obligatorio"),
    CLOUDINARY_API_KEY: z.string().trim().min(1, "CLOUDINARY_API_KEY es obligatorio"),
    CLOUDINARY_API_SECRET: z.string().trim().min(1, "CLOUDINARY_API_SECRET es obligatorio"),
    CLOUDINARY_UPLOAD_PRESET: z.string().trim().min(1, "CLOUDINARY_UPLOAD_PRESET es obligatorio"),
});

export function getServerEnv() {
    return serverEnvSchema.parse({
        // Compatibilidad temporal con el nombre anterior. API_URL es el nombre recomendado.
        API_URL: process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL,
    });
}

export function getCloudinaryEnv() {
    return cloudinaryEnvSchema.parse({
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
    });
}
