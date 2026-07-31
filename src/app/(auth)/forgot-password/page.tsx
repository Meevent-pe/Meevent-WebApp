import type { Metadata } from "next";

import { AuthCard } from "@/features/auth/components/auth-card";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export const metadata: Metadata = {
    title: "Recuperar contraseña",
};

export default function ForgotPasswordPage() {
    return (
        <AuthCard
            title="Recupera tu contraseña"
            description="Ingresa tu correo y te enviaremos un enlace de recuperación."
        >
            <ForgotPasswordForm />
        </AuthCard>
    );
}
