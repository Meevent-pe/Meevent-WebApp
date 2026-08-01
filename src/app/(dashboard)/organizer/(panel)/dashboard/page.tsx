import { CalendarDays, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Dashboard del organizador | Meevent",
    robots: { index: false, follow: false },
};

const QUICK_LINKS = [
    {
        href: "/organizer/events",
        title: "Eventos",
        description: "Administra los eventos de tu organización.",
        icon: CalendarDays,
    },
    {
        href: "/organizer/profile",
        title: "Perfil",
        description: "Consulta la información de tu perfil de organizador.",
        icon: UserRound,
    },
] as const;

export default function OrganizerDashboardPage() {
    return (
        <div className="space-y-8">
            <header>
                <p className="text-meevent-primary text-sm font-medium">Dashboard</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                    Bienvenido a tu panel
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
                    Desde aquí podrás gestionar tus eventos y la información de tu organización.
                </p>
            </header>

            <section aria-labelledby="quick-access-title">
                <h2 id="quick-access-title" className="text-base font-semibold text-neutral-900">
                    Accesos principales
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {QUICK_LINKS.map(({ href, title, description, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className="group rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-neutral-300 hover:shadow-md"
                        >
                            <div className="bg-meevent-primary/10 text-meevent-primary flex size-10 items-center justify-center rounded-lg">
                                <Icon className="size-5" aria-hidden="true" />
                            </div>
                            <h3 className="mt-4 font-semibold text-neutral-950 group-hover:underline">
                                {title}
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-neutral-600">{description}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
