import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { getSession } from "@/features/auth/session.server";
import { OrganizerDashboardNav } from "@/features/organizer/components/organizer-dashboard-nav";
import { OrganizerLogoutButton } from "@/features/organizer/components/organizer-logout-button";
import { MeeventLogo } from "@/shared/components/ui/MeeventLogo";

export default async function OrganizerPanelLayout({ children }: { children: ReactNode }) {
    const session = await getSession();

    if (!session) {
        redirect("/login?next=/organizer/dashboard");
    }

    if (session.role === "ATTENDEE") {
        redirect("/organizer/onboarding");
    }

    if (session.role !== "ORGANIZER") {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-neutral-50 md:grid md:grid-cols-[16rem_minmax(0,1fr)]">
            <aside className="sticky top-0 hidden h-screen flex-col border-r border-neutral-200 bg-white p-5 md:flex">
                <Link
                    href="/organizer/dashboard"
                    className="text-meevent-primary mb-8 block w-32"
                    aria-label="Ir al dashboard de Meevent"
                >
                    <MeeventLogo className="h-auto w-full" />
                </Link>

                <OrganizerDashboardNav />

                <div className="mt-auto border-t border-neutral-200 pt-4">
                    <p
                        className="mb-3 truncate px-3 text-xs text-neutral-500"
                        title={session.email}
                    >
                        {session.email}
                    </p>
                    <OrganizerLogoutButton />
                </div>
            </aside>

            <div className="min-w-0">
                <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-neutral-200 bg-white/95 px-4 backdrop-blur md:px-8">
                    <Link
                        href="/organizer/dashboard"
                        className="text-meevent-primary block w-28 md:hidden"
                        aria-label="Ir al dashboard de Meevent"
                    >
                        <MeeventLogo className="h-auto w-full" />
                    </Link>

                    <div className="hidden min-w-0 md:block">
                        <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
                            Panel de organizador
                        </p>
                        <p className="truncate text-sm text-neutral-700">{session.email}</p>
                    </div>

                    <div className="md:hidden">
                        <OrganizerLogoutButton compact />
                    </div>
                </header>

                <main className="mx-auto w-full max-w-7xl px-4 py-6 pb-24 sm:px-6 md:px-8 md:py-8 md:pb-8">
                    {children}
                </main>

                <div className="fixed inset-x-0 bottom-0 z-20 border-t border-neutral-200 bg-white p-2 md:hidden">
                    <OrganizerDashboardNav mobile />
                </div>
            </div>
        </div>
    );
}
