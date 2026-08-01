import type { Metadata } from "next";

import { AuthCard } from "@/features/auth/components/auth-card";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
    title: "Iniciar sesión",
};

interface LoginPageProps {
    searchParams: Promise<{
        passwordReset?: string;
        organizerOnboarding?: string;
        next?: string;
    }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const { passwordReset, organizerOnboarding, next } = await searchParams;
    const redirectTo = next === "/organizer/onboarding" ? next : "/";

    const initialMessage =
        organizerOnboarding === "success"
            ? "Tu perfil de organizador fue creado. Inicia sesión nuevamente para continuar."
            : passwordReset === "success"
              ? "Tu contraseña fue actualizada. Ya puedes iniciar sesión."
              : undefined;

    return (
        <AuthCard title="Inicia sesión" description="Accede a tu cuenta para continuar en Meevent.">
            <LoginForm initialMessage={initialMessage} redirectTo={redirectTo} />
        </AuthCard>
    );
}
