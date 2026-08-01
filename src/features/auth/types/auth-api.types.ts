export interface LoginRequestDto {
    email: string;
    password: string;
}

export interface RegisterRequestDto {
    full_name: string;
    city_id: number;
    email: string;
    password: string;
    birth_date?: string;
    country_code?: string;
    phone_number?: string;
}

export interface ForgotPasswordRequestDto {
    email: string;
}

export interface ResetPasswordRequestDto {
    token: string;
    newPassword: string;
}

export interface GoogleLoginRequestDto {
    id_token: string;
}
