import type { Metadata } from "next";

import { AuthCard } from "@/features/auth/components/auth-card";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
    title: "Iniciar sesión",
};

interface LoginPageProps {
    searchParams: Promise<{ passwordReset?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const { passwordReset } = await searchParams;

    return (
        <AuthCard title="Inicia sesión" description="Accede a tu cuenta para continuar en Meevent.">
            <LoginForm
                initialMessage={
                    passwordReset === "success"
                        ? "Tu contraseña fue actualizada. Ya puedes iniciar sesión."
                        : undefined
                }
            />
        </AuthCard>
    );
}
