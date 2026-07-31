import "server-only";

import {
    authMessageResponseSchema,
    authResponseDtoSchema,
} from "@/features/auth/schemas/auth-api.schemas";
import { backendRequest } from "@/shared/services/backend-client.server";
import type {
    AuthResponseDto,
    ForgotPasswordRequestDto,
    GoogleLoginRequestDto,
    LoginRequestDto,
    RegisterRequestDto,
    ResetPasswordRequestDto,
} from "@/features/auth/types/auth-api.types";

export const authApi = {
    async login(payload: LoginRequestDto) {
        const response = await backendRequest<unknown>("/auth/login", {
            method: "POST",
            body: payload,
        });
        return authResponseDtoSchema.parse(response) satisfies AuthResponseDto;
    },

    async register(payload: RegisterRequestDto) {
        const response = await backendRequest<unknown>("/auth/register", {
            method: "POST",
            body: payload,
        });
        return authMessageResponseSchema.parse(response);
    },

    async verifyEmail(token: string) {
        const query = new URLSearchParams({ token });
        const response = await backendRequest<unknown>(`/auth/verify-email?${query}`, {
            method: "POST",
        });
        return authResponseDtoSchema.parse(response) satisfies AuthResponseDto;
    },

    async forgotPassword(payload: ForgotPasswordRequestDto) {
        const response = await backendRequest<unknown>("/auth/forgot-password", {
            method: "POST",
            body: payload,
        });
        return authMessageResponseSchema.parse(response);
    },

    async resetPassword(payload: ResetPasswordRequestDto) {
        const response = await backendRequest<unknown>("/auth/reset-password", {
            method: "POST",
            body: payload,
        });
        return authMessageResponseSchema.parse(response);
    },

    async googleLogin(payload: GoogleLoginRequestDto) {
        const response = await backendRequest<unknown>("/auth/google", {
            method: "POST",
            body: payload,
        });
        return authResponseDtoSchema.parse(response) satisfies AuthResponseDto;
    },
};
