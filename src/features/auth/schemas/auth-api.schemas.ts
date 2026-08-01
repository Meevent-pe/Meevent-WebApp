import { z } from "zod";

export const authResponseDtoSchema = z.object({
    accessToken: z.string().min(1),
});

export const authMessageResponseSchema = z.string().min(1);

export type AuthResponseDto = z.infer<typeof authResponseDtoSchema>;
