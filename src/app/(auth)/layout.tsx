import type { Metadata } from "next";
import type { ReactNode } from "react";

import { GoogleOAuthProvider } from "@/features/auth/components/google-oauth-provider";
import { Toaster } from "@/shared/components/ui/sonner";

export const metadata: Metadata = {
    title: {
        default: "Acceso | Meevent",
        template: "%s | Meevent",
    },
    description: "Crea tu cuenta o inicia sesión en Meevent.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <GoogleOAuthProvider>
            {children}
            <Toaster position="top-center" />
        </GoogleOAuthProvider>
    );
}
