import type {
    ForgotPasswordRequestDto,
    GoogleLoginRequestDto,
    LoginRequestDto,
    RegisterRequestDto,
    ResetPasswordRequestDto,
} from "@/features/auth/types/auth-api.types";
import type {
    forgotPasswordSchema,
    googleLoginSchema,
    loginSchema,
    registerSchema,
    resetPasswordSchema,
} from "@/features/auth/schemas/auth.schemas";
import type { z } from "zod";

type LoginInput = z.output<typeof loginSchema>;
type RegisterInput = z.output<typeof registerSchema>;
type ForgotPasswordInput = z.output<typeof forgotPasswordSchema>;
type ResetPasswordInput = z.output<typeof resetPasswordSchema>;
type GoogleLoginInput = z.output<typeof googleLoginSchema>;

export function toLoginRequestDto(input: LoginInput): LoginRequestDto {
    return {
        email: input.email,
        password: input.password,
    };
}

export function toRegisterRequestDto(input: RegisterInput): RegisterRequestDto {
    return {
        full_name: input.fullName,
        city_id: input.cityId,
        email: input.email,
        password: input.password,
        ...(input.birthDate ? { birth_date: input.birthDate } : {}),
        ...(input.phoneNumber
            ? {
                  country_code: "+51",
                  phone_number: input.phoneNumber,
              }
            : {}),
    };
}

export function toForgotPasswordRequestDto(input: ForgotPasswordInput): ForgotPasswordRequestDto {
    return { email: input.email };
}

export function toResetPasswordRequestDto(input: ResetPasswordInput): ResetPasswordRequestDto {
    return {
        token: input.token,
        newPassword: input.password,
    };
}

export function toGoogleLoginRequestDto(input: GoogleLoginInput): GoogleLoginRequestDto {
    return { id_token: input.credential };
}
