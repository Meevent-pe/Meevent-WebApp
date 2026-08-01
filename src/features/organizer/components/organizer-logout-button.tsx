"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { logoutAction } from "@/features/auth/actions/auth.actions";
import { Button } from "@/shared/components/ui/button";

export function OrganizerLogoutButton({ compact = false }: { compact?: boolean }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    function logout() {
        startTransition(async () => {
            await logoutAction();
            router.replace("/login");
            router.refresh();
        });
    }

    return (
        <Button
            type="button"
            variant="ghost"
            size="sm"
            className={compact ? "size-9 px-0" : "w-full justify-start"}
            onClick={logout}
            disabled={isPending}
            aria-label={compact ? "Cerrar sesión" : undefined}
        >
            <LogOut className="size-4" aria-hidden="true" />
            {compact ? null : isPending ? "Cerrando sesión..." : "Cerrar sesión"}
        </Button>
    );
}
