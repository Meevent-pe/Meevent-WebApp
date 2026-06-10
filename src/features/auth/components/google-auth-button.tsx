"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/shared/services/api-client";
import { useGoogleOAuth } from "@/shared/providers/google-oauth-provider";

export function GoogleAuthButton() {
    const router = useRouter();
    const { isGoogleReady } = useGoogleOAuth();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const GOOGLE_OAUTH_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;

    useEffect(() => {
        if (!isGoogleReady) return;
        const google = (window as any).google;
        if (!google || !google.accounts) return;

        google.accounts.id.initialize({
            client_id: GOOGLE_OAUTH_CLIENT_ID,
            callback: async (response: any) => {
                setIsLoading(true);
                setError(null);

                try {
                    const googleIdToken = response.credential;

                    await apiClient("/auth/google", {
                        method: "POST",
                        body: JSON.stringify({ token: googleIdToken }),
                    });
                    // router.push("/dashboard");
                } catch (err: any) {
                    setError(err.message || "Error al verificar la identidad.");
                    setIsLoading(false);
                }
            },
        });

        const container = document.getElementById("google-btn-container");
        if (container) {
            google.accounts.id.renderButton(container, {
                theme: "outline",
                size: "large",
                text: "signin_with",
                locale: "es",
                width: container.offsetWidth,
            });
        }
    }, [isGoogleReady, router, GOOGLE_OAUTH_CLIENT_ID]);

    return (
        <div className="flex w-full flex-col items-center justify-center space-y-3">
            {isLoading && (
                <p className="animate-pulse text-sm font-medium text-gray-500">
                    Validando credenciales en Meevent...
                </p>
            )}

            <div
                id="google-btn-container"
                className={`w-full max-w-sm ${isLoading ? "hidden" : "block"} min-h-[44px]`}
            />

            {error && (
                <p className="w-full rounded-md bg-red-50 p-2 text-center text-sm font-semibold text-red-600">
                    ⚠️ {error}
                </p>
            )}
        </div>
    );
}
