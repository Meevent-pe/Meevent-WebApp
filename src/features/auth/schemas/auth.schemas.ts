import { z } from "zod";

const emailSchema = z
    .email("Ingresa un correo válido")
    .max(150, "El correo no puede superar los 150 caracteres")
    .transform((email) => email.trim().toLowerCase());

export const passwordSchema = z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[a-z]/, "Incluye al menos una letra minúscula")
    .regex(/[A-Z]/, "Incluye al menos una letra mayúscula")
    .regex(/[0-9]/, "Incluye al menos un número")
    .regex(/[@#$%^&+=]/, "Incluye al menos uno de estos símbolos: @ # $ % ^ & + =");

const optionalPastDateSchema = z
    .string()
    .refine((value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: "Ingresa una fecha válida",
    })
    .refine(
        (value) => {
            if (value === "") {
                return true;
            }

            const today = new Date();
            const localToday = [
                today.getFullYear(),
                String(today.getMonth() + 1).padStart(2, "0"),
                String(today.getDate()).padStart(2, "0"),
            ].join("-");

            return value < localToday;
        },
        {
            message: "La fecha de nacimiento debe estar en el pasado",
        }
    );

const optionalPeruvianPhoneSchema = z
    .string()
    .refine((value) => value === "" || /^\d{9}$/.test(value), {
        message: "Ingresa un número peruano de 9 dígitos",
    });

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, "Ingresa tu contraseña"),
});

export const registerSchema = z
    .object({
        fullName: z
            .string()
            .trim()
            .min(3, "El nombre debe tener al menos 3 caracteres")
            .max(150, "El nombre no puede superar los 150 caracteres"),
        birthDate: optionalPastDateSchema,
        cityId: z.number().int().positive("Selecciona un departamento"),
        email: emailSchema,
        phoneNumber: optionalPeruvianPhoneSchema,
        password: passwordSchema,
        confirmPassword: z.string().min(1, "Confirma tu contraseña"),
    })
    .refine((values) => values.password === values.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

export const resetPasswordSchema = z
    .object({
        token: z.uuid("El enlace de recuperación no es válido"),
        password: passwordSchema,
        confirmPassword: z.string().min(1, "Confirma tu contraseña"),
    })
    .refine((values) => values.password === values.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export const verifyEmailSchema = z.object({
    token: z.uuid("El enlace de verificación no es válido"),
});

export const googleLoginSchema = z.object({
    credential: z.string().min(1, "Google no devolvió una credencial válida"),
});

export type LoginFormValues = z.input<typeof loginSchema>;
export type RegisterFormValues = z.input<typeof registerSchema>;
export type ForgotPasswordFormValues = z.input<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.input<typeof resetPasswordSchema>;
