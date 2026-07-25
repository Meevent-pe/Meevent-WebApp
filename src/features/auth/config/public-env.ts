import { z } from "zod";

const publicEnvSchema = z.object({
    googleClientId: z.string().min(1),
});

const parsedPublicEnv = publicEnvSchema.safeParse({
    googleClientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
});

export const publicEnv = parsedPublicEnv.success ? parsedPublicEnv.data : null;
