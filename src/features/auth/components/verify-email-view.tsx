"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { verifyEmailAction } from "@/features/auth/actions/auth.actions";
import { FormAlert } from "@/shared/components/forms/form-alert";
import { Button } from "@/shared/components/ui/button";

type VerificationState =
    | { status: "loading" }
    | { status: "success"; message: string }
    | { status: "error"; message: string };

interface VerifyEmailViewProps {
    token?: string;
}

export function VerifyEmailView({ token }: VerifyEmailViewProps) {
    const started = useRef(false);
    const [state, setState] = useState<VerificationState>(
        token
            ? { status: "loading" }
            : {
                  status: "error",
                  message: "El enlace no contiene un token de verificación válido.",
              }
    );

    useEffect(() => {
        if (!token || started.current) {
            return;
        }

        started.current = true;

        void verifyEmailAction({ token })
            .then((result) => {
                window.history.replaceState({}, "", "/verify-email");
                setState(
                    result.success
                        ? { status: "success", message: result.message }
                        : { status: "error", message: result.message }
                );
            })
            .catch(() => {
                window.history.replaceState({}, "", "/verify-email");
                setState({
                    status: "error",
                    message: "No se pudo completar la verificación.",
                });
            });
    }, [token]);

    if (state.status === "loading") {
        return (
            <div className="flex flex-col items-center gap-3 py-6 text-center" role="status">
                <LoaderCircle
                    className="text-meevent-primary size-8 animate-spin"
                    aria-hidden="true"
                />
                <p className="text-sm text-neutral-600">Verificando tu correo...</p>
            </div>
        );
    }

    if (state.status === "error") {
        return (
            <div className="space-y-5 text-center">
                <FormAlert type="error" message={state.message} />
                <Link href="/register" className="text-meevent-primary font-medium hover:underline">
                    Volver al registro
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-5 text-center">
            <FormAlert type="success" message={state.message} />
            <p className="text-sm leading-6 text-neutral-600">
                Tu sesión se inició automáticamente. Ya puedes continuar en Meevent.
            </p>
            <Button type="button" onClick={() => window.location.assign("/")} className="w-full">
                Continuar
            </Button>
        </div>
    );
}
