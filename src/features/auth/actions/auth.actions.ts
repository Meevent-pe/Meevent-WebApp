"use server";

import { z } from "zod";

import {
    forgotPasswordSchema,
    googleLoginSchema,
    loginSchema,
    registerSchema,
    resetPasswordSchema,
    verifyEmailSchema,
} from "@/features/auth/schemas/auth.schemas";
import {
    toForgotPasswordRequestDto,
    toGoogleLoginRequestDto,
    toLoginRequestDto,
    toRegisterRequestDto,
    toResetPasswordRequestDto,
} from "@/features/auth/mappers/auth-request.mapper";
import { mapAuthError } from "@/features/auth/mappers/auth-error.mapper";
import { authApi } from "@/features/auth/server/auth-api.server";
import { createSession, deleteSession } from "@/features/auth/server/session.server";
import type { AuthActionResult } from "@/features/auth/types/auth.types";

function mapValidationError(error: z.ZodError): AuthActionResult {
    const fieldErrors = error.issues.reduce<Record<string, string>>((result, issue) => {
        const field = issue.path[0];
        if (typeof field === "string" && !result[field]) {
            result[field] = issue.message;
        }
        return result;
    }, {});

    return {
        success: false,
        message: "Revisa los datos ingresados.",
        fieldErrors,
    };
}

export async function loginAction(input: unknown): Promise<AuthActionResult> {
    const parsed = loginSchema.safeParse(input);
    if (!parsed.success) {
        return mapValidationError(parsed.error);
    }

    try {
        const response = await authApi.login(toLoginRequestDto(parsed.data));
        await createSession(response.accessToken);

        return { success: true, message: "Sesión iniciada correctamente." };
    } catch (error) {
        return mapAuthError(error, "No se pudo iniciar sesión.");
    }
}

export async function registerAction(input: unknown): Promise<AuthActionResult> {
    const parsed = registerSchema.safeParse(input);
    if (!parsed.success) {
        return mapValidationError(parsed.error);
    }

    try {
        const message = await authApi.register(toRegisterRequestDto(parsed.data));
        return { success: true, message };
    } catch (error) {
        return mapAuthError(error, "No se pudo crear la cuenta.");
    }
}

export async function verifyEmailAction(input: unknown): Promise<AuthActionResult> {
    const parsed = verifyEmailSchema.safeParse(input);
    if (!parsed.success) {
        return mapValidationError(parsed.error);
    }

    try {
        const response = await authApi.verifyEmail(parsed.data.token);
        await createSession(response.accessToken);
        return { success: true, message: "Tu correo fue verificado correctamente." };
    } catch (error) {
        return mapAuthError(error, "No se pudo verificar el correo.");
    }
}

export async function forgotPasswordAction(input: unknown): Promise<AuthActionResult> {
    const parsed = forgotPasswordSchema.safeParse(input);
    if (!parsed.success) {
        return mapValidationError(parsed.error);
    }

    try {
        const message = await authApi.forgotPassword(toForgotPasswordRequestDto(parsed.data));
        return { success: true, message };
    } catch (error) {
        return mapAuthError(error, "No se pudo procesar la solicitud.");
    }
}

export async function resetPasswordAction(input: unknown): Promise<AuthActionResult> {
    const parsed = resetPasswordSchema.safeParse(input);
    if (!parsed.success) {
        return mapValidationError(parsed.error);
    }

    try {
        const message = await authApi.resetPassword(toResetPasswordRequestDto(parsed.data));
        return { success: true, message };
    } catch (error) {
        return mapAuthError(error, "No se pudo restablecer la contraseña.");
    }
}

export async function googleLoginAction(input: unknown): Promise<AuthActionResult> {
    const parsed = googleLoginSchema.safeParse(input);
    if (!parsed.success) {
        return mapValidationError(parsed.error);
    }

    try {
        const response = await authApi.googleLogin(toGoogleLoginRequestDto(parsed.data));
        await createSession(response.accessToken);
        return { success: true, message: "Sesión iniciada con Google." };
    } catch (error) {
        return mapAuthError(error, "No se pudo iniciar sesión con Google.");
    }
}

export async function logoutAction(): Promise<void> {
    await deleteSession();
}
