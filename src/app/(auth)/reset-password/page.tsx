import type { Metadata } from "next";

import { AuthCard } from "@/features/auth/components/auth-card";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export const metadata: Metadata = {
    title: "Restablecer contraseña",
};

interface ResetPasswordPageProps {
    searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
    const { token } = await searchParams;

    return (
        <AuthCard
            title="Crea una nueva contraseña"
            description="El enlace de recuperación es temporal y solo puede utilizarse una vez."
        >
            <ResetPasswordForm token={token} />
        </AuthCard>
    );
}
