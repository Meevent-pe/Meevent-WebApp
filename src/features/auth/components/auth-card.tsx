import Link from "next/link";
import type { ReactNode } from "react";

import { MeeventLogo } from "@/shared/components/ui/MeeventLogo";
import { cn } from "@/shared/lib/utils";

interface AuthCardProps {
    title: string;
    description: string;
    children: ReactNode;
    wide?: boolean;
}

export function AuthCard({ title, description, children, wide = false }: AuthCardProps) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-10">
            <section
                className={cn(
                    "w-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8",
                    wide ? "max-w-2xl" : "max-w-md"
                )}
            >
                <Link
                    href="/"
                    className="text-meevent-primary mx-auto mb-8 block w-fit"
                    aria-label="Volver al inicio de Meevent"
                >
                    <MeeventLogo className="h-auto w-36" />
                </Link>

                <header className="mb-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
                        {title}
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
                </header>

                {children}
            </section>
        </main>
    );
}
