import type { Metadata } from "next";

import { AuthCard } from "@/features/auth/components/auth-card";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
    title: "Crear cuenta",
};

export default function RegisterPage() {
    return (
        <AuthCard
            title="Crea tu cuenta"
            description="Completa tus datos y verifica tu correo para activar la cuenta."
            wide
        >
            <RegisterForm />
        </AuthCard>
    );
}
