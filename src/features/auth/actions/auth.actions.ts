"use server";

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
import { getAuthenticatedHome } from "@/features/auth/lib/auth-navigation";
import { mapZodValidationError } from "@/shared/lib/map-zod-validation-error";
import type { ActionResult } from "@/shared/types/action-result.types";

export async function loginAction(input: unknown): Promise<ActionResult> {
    const parsed = loginSchema.safeParse(input);
    if (!parsed.success) {
        return mapZodValidationError(parsed.error);
    }

    try {
        const response = await authApi.login(toLoginRequestDto(parsed.data));
        const session = await createSession(response.accessToken);

        return {
            success: true,
            message: "Sesión iniciada correctamente.",
            redirectTo: getAuthenticatedHome(session.role),
        };
    } catch (error) {
        return mapAuthError(error, "No se pudo iniciar sesión.");
    }
}

export async function registerAction(input: unknown): Promise<ActionResult> {
    const parsed = registerSchema.safeParse(input);
    if (!parsed.success) {
        return mapZodValidationError(parsed.error);
    }

    try {
        const message = await authApi.register(toRegisterRequestDto(parsed.data));
        return { success: true, message };
    } catch (error) {
        return mapAuthError(error, "No se pudo crear la cuenta.");
    }
}

export async function verifyEmailAction(input: unknown): Promise<ActionResult> {
    const parsed = verifyEmailSchema.safeParse(input);
    if (!parsed.success) {
        return mapZodValidationError(parsed.error);
    }

    try {
        const response = await authApi.verifyEmail(parsed.data.token);
        const session = await createSession(response.accessToken);
        return {
            success: true,
            message: "Tu correo fue verificado correctamente.",
            redirectTo: getAuthenticatedHome(session.role),
        };
    } catch (error) {
        return mapAuthError(error, "No se pudo verificar el correo.");
    }
}

export async function forgotPasswordAction(input: unknown): Promise<ActionResult> {
    const parsed = forgotPasswordSchema.safeParse(input);
    if (!parsed.success) {
        return mapZodValidationError(parsed.error);
    }

    try {
        const message = await authApi.forgotPassword(toForgotPasswordRequestDto(parsed.data));
        return { success: true, message };
    } catch (error) {
        return mapAuthError(error, "No se pudo procesar la solicitud.");
    }
}

export async function resetPasswordAction(input: unknown): Promise<ActionResult> {
    const parsed = resetPasswordSchema.safeParse(input);
    if (!parsed.success) {
        return mapZodValidationError(parsed.error);
    }

    try {
        const message = await authApi.resetPassword(toResetPasswordRequestDto(parsed.data));
        return { success: true, message };
    } catch (error) {
        return mapAuthError(error, "No se pudo restablecer la contraseña.");
    }
}

export async function googleLoginAction(input: unknown): Promise<ActionResult> {
    const parsed = googleLoginSchema.safeParse(input);
    if (!parsed.success) {
        return mapZodValidationError(parsed.error);
    }

    try {
        const response = await authApi.googleLogin(toGoogleLoginRequestDto(parsed.data));
        const session = await createSession(response.accessToken);
        return {
            success: true,
            message: "Sesión iniciada con Google.",
            redirectTo: getAuthenticatedHome(session.role),
        };
    } catch (error) {
        return mapAuthError(error, "No se pudo iniciar sesión con Google.");
    }
}

export async function logoutAction(): Promise<void> {
    await deleteSession();
}
