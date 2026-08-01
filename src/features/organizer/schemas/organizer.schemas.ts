import { z } from "zod";

const optionalPeruvianRucSchema = z
    .string()
    .trim()
    .refine((value) => value === "" || /^(10|15|20)\d{9}$/.test(value), {
        message: "Ingresa un RUC de 11 dígitos que empiece por 10, 15 o 20",
    });

const optionalPeruvianMobileSchema = z
    .string()
    .trim()
    .refine((value) => value === "" || /^9\d{8}$/.test(value), {
        message: "Ingresa un celular peruano de 9 dígitos que empiece por 9",
    });

export const organizerOnboardingSchema = z.object({
    legalName: z
        .string()
        .trim()
        .min(1, "Ingresa el nombre legal")
        .max(150, "El nombre legal no puede superar los 150 caracteres"),
    displayName: z
        .string()
        .trim()
        .min(1, "Ingresa el nombre público")
        .max(120, "El nombre público no puede superar los 120 caracteres"),
    ruc: optionalPeruvianRucSchema,
    contactPhone: optionalPeruvianMobileSchema,
    bio: z.string().trim(),
});

export type OrganizerOnboardingFormValues = z.input<typeof organizerOnboardingSchema>;
