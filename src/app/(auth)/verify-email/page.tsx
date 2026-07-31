import type { Metadata } from "next";

import { AuthCard } from "@/features/auth/components/auth-card";
import { VerifyEmailView } from "@/features/auth/components/verify-email-view";

export const metadata: Metadata = {
    title: "Verificar correo",
};

interface VerifyEmailPageProps {
    searchParams: Promise<{
        token?: string;
    }>;
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
    const { token } = await searchParams;

    return (
        <AuthCard
            title="Verifica tu correo"
            description="La verificación protege tu cuenta y confirma que el correo te pertenece."
        >
            <VerifyEmailView token={token} />
        </AuthCard>
    );
}
