import { z } from "zod";

const optionalDateTimeSchema = z.string().trim();

const eventFormObjectSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "El título debe tener al menos 3 caracteres")
        .max(180, "El título no puede superar los 180 caracteres"),
    description: z
        .string()
        .trim()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(2000, "La descripción no puede superar los 2000 caracteres"),
    bannerUrl: z.union([z.literal(""), z.url("La URL del banner no es válida")]),
    startsAt: z.string().min(1, "Selecciona la fecha y hora de inicio"),
    endsAt: z.string().min(1, "Selecciona la fecha y hora de fin"),
    venueName: z
        .string()
        .trim()
        .min(1, "Selecciona o ingresa el nombre del lugar")
        .max(180, "El nombre del lugar no puede superar los 180 caracteres"),
    address: z
        .string()
        .trim()
        .min(1, "Selecciona una dirección en el mapa")
        .max(255, "La dirección no puede superar los 255 caracteres"),
    cityId: z.number().int().min(1, "Selecciona un departamento").max(24),
    latitude: z
        .number()
        .min(-19, "La ubicación debe encontrarse en Perú")
        .max(0.5, "La ubicación debe encontrarse en Perú"),
    longitude: z
        .number()
        .min(-82, "La ubicación debe encontrarse en Perú")
        .max(-68, "La ubicación debe encontrarse en Perú"),
    locationConfirmed: z.boolean().refine((confirmed) => confirmed, {
        message: "Selecciona una ubicación desde Google Maps",
    }),
    salesOpenAt: optionalDateTimeSchema,
    salesCloseAt: optionalDateTimeSchema,
    maxAttendees: z.union([
        z.literal(""),
        z
            .number()
            .int("El aforo debe ser un número entero")
            .min(1, "El aforo debe ser mayor a cero")
            .max(1_000_000, "El aforo no puede superar 1 000 000"),
    ]),
});

type EventFormShape = z.infer<typeof eventFormObjectSchema>;

function parsePeruDateTime(value: string) {
    if (!value) {
        return new Date(Number.NaN);
    }
    const withSeconds = value.length === 16 ? `${value}:00` : value;
    return new Date(`${withSeconds}-05:00`);
}

function validateEventRelations(
    values: EventFormShape,
    context: z.RefinementCtx,
    requireFutureStart: boolean
) {
    const startsAt = parsePeruDateTime(values.startsAt);
    const endsAt = parsePeruDateTime(values.endsAt);

    if (requireFutureStart && !Number.isNaN(startsAt.getTime()) && startsAt <= new Date()) {
        context.addIssue({
            code: "custom",
            path: ["startsAt"],
            message: "La fecha de inicio debe estar en el futuro",
        });
    }

    if (!Number.isNaN(endsAt.getTime()) && !Number.isNaN(startsAt.getTime())) {
        if (endsAt <= startsAt) {
            context.addIssue({
                code: "custom",
                path: ["endsAt"],
                message: "La fecha de fin debe ser posterior al inicio",
            });
        }
    }

    const hasSalesOpen = values.salesOpenAt !== "";
    const hasSalesClose = values.salesCloseAt !== "";

    if (hasSalesOpen !== hasSalesClose) {
        context.addIssue({
            code: "custom",
            path: [hasSalesOpen ? "salesCloseAt" : "salesOpenAt"],
            message: "Completa ambas fechas del periodo de ventas",
        });
    }

    if (hasSalesOpen && hasSalesClose) {
        const salesOpenAt = parsePeruDateTime(values.salesOpenAt);
        const salesCloseAt = parsePeruDateTime(values.salesCloseAt);

        if (salesCloseAt <= salesOpenAt) {
            context.addIssue({
                code: "custom",
                path: ["salesCloseAt"],
                message: "El cierre de ventas debe ser posterior a la apertura",
            });
        }

        if (!Number.isNaN(startsAt.getTime()) && salesCloseAt > startsAt) {
            context.addIssue({
                code: "custom",
                path: ["salesCloseAt"],
                message: "Las ventas deben cerrar antes de que inicie el evento",
            });
        }
    }
}

function validateRequiredEventFields(values: EventFormShape, context: z.RefinementCtx) {
    if (values.bannerUrl === "") {
        context.addIssue({
            code: "custom",
            path: ["bannerUrl"],
            message: "Selecciona un banner para el evento",
        });
    }

    if (values.maxAttendees === "") {
        context.addIssue({
            code: "custom",
            path: ["maxAttendees"],
            message: "Ingresa el aforo máximo del evento",
        });
    }
}

function validateRequiredCapacity(values: EventFormShape, context: z.RefinementCtx) {
    if (values.maxAttendees === "") {
        context.addIssue({
            code: "custom",
            path: ["maxAttendees"],
            message: "Ingresa el aforo máximo del evento",
        });
    }
}

export const eventFormSchema = eventFormObjectSchema
    .superRefine((values, context) => validateEventRelations(values, context, true))
    .superRefine(validateRequiredCapacity);

export const eventUpdateSchema = eventFormObjectSchema
    .superRefine((values, context) => validateEventRelations(values, context, false))
    .superRefine(validateRequiredEventFields);

export const eventCreateSchema = eventFormObjectSchema
    .superRefine((values, context) => validateEventRelations(values, context, true))
    .superRefine(validateRequiredEventFields);

export type EventFormValues = z.input<typeof eventFormObjectSchema>;
