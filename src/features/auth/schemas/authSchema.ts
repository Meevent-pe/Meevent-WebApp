import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Debe ser un correo válido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

export const registerSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;