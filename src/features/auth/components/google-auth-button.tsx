"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { googleLoginAction } from "@/features/auth/actions/auth.actions";
import { useGoogleOAuthReady } from "@/features/auth/components/google-oauth-provider";
import { publicEnv } from "@/features/auth/config/public-env";
import { FormAlert } from "@/shared/components/forms/form-alert";

export function GoogleAuthButton({ redirectTo = "/" }: { redirectTo?: string }) {
    const router = useRouter();
    const isGoogleReady = useGoogleOAuthReady();
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const googleClientId = publicEnv?.googleClientId;

    useEffect(() => {
        const container = containerRef.current;
        const google = window.google;

        if (!isGoogleReady || !google || !container || !googleClientId) {
            return;
        }

        container.replaceChildren();

        google.accounts.id.initialize({
            client_id: googleClientId,
            callback: async ({ credential }) => {
                setIsLoading(true);
                setError(null);

                try {
                    const result = await googleLoginAction({ credential });
                    if (!result.success) {
                        setError(result.message);
                        return;
                    }

                    router.replace(redirectTo);
                    router.refresh();
                } catch {
                    setError("No se pudo completar el acceso con Google.");
                } finally {
                    setIsLoading(false);
                }
            },
        });

        google.accounts.id.renderButton(container, {
            theme: "outline",
            size: "large",
            text: "continue_with",
            locale: "es",
            width: Math.max(container.offsetWidth, 280),
        });
    }, [googleClientId, isGoogleReady, redirectTo, router]);

    return (
        <div className="space-y-3">
            <div
                ref={containerRef}
                className="flex min-h-11 w-full justify-center overflow-hidden"
                aria-busy={isLoading}
            />

            {isLoading ? (
                <p className="text-center text-sm text-neutral-500">
                    Validando tu cuenta de Google...
                </p>
            ) : null}

            {!googleClientId ? (
                <FormAlert
                    type="error"
                    message="Google Sign-In no está configurado en este ambiente."
                />
            ) : null}

            {error ? <FormAlert type="error" message={error} /> : null}
        </div>
    );
}
