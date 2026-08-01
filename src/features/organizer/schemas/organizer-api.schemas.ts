import { z } from "zod";

export const organizerProfileDtoSchema = z.object({
    id: z.number().int().positive(),
    legalName: z.string(),
    displayName: z.string(),
    ruc: z.string().nullable(),
    contactPhone: z.string().nullable(),
    bio: z.string().nullable(),
    logoUrl: z.string().nullable(),
    verified: z.boolean(),
    createdAt: z.string().min(1),
});

export type OrganizerProfileDto = z.infer<typeof organizerProfileDtoSchema>;
