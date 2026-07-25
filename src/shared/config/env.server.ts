import "server-only";

import { z } from "zod";

const serverEnvSchema = z.object({
    API_URL: z.url("API_URL debe ser una URL válida"),
});

export function getServerEnv() {
    return serverEnvSchema.parse({
        // Compatibilidad temporal con el nombre anterior. API_URL es el nombre recomendado.
        API_URL: process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL,
    });
}
