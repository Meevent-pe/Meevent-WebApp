import { z } from "zod";

export const eventResponseDtoSchema = z.object({
    id: z.number().int().positive(),
    slug: z.string().min(1),
    title: z.string(),
    description: z.string(),
    bannerUrl: z.string().nullable(),
    status: z.enum(["DRAFT", "PUBLISHED", "CANCELLED", "CLOSED"]),
    startsAt: z.string().min(1),
    endsAt: z.string().min(1),
    timezone: z.string().min(1),
    venueName: z.string().nullable(),
    address: z.string().nullable(),
    cityId: z.number().int().positive().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    salesOpenAt: z.string().nullable(),
    salesCloseAt: z.string().nullable(),
});

export const eventPageDtoSchema = z
    .object({
        content: z.array(eventResponseDtoSchema),
        page: z.object({
            size: z.number().int().nonnegative(),
            number: z.number().int().nonnegative(),
            totalElements: z.number().int().nonnegative(),
            totalPages: z.number().int().nonnegative(),
        }),
    })
    .transform(({ content, page }) => ({
        content,
        ...page,
        first: page.number === 0,
        last: page.totalPages === 0 || page.number >= page.totalPages - 1,
    }));

export const cloudinaryUploadResponseSchema = z.object({
    secure_url: z.url(),
    public_id: z.string().min(1),
    resource_type: z.literal("image"),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    bytes: z.number().int().positive(),
    format: z.string().toLowerCase(),
});
