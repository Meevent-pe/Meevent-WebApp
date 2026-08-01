import type { Metadata } from "next";
import Link from "next/link";

import { OrganizerOnboardingForm } from "@/features/organizer/components/organizer-onboarding-form";
import { MeeventLogo } from "@/shared/components/ui/MeeventLogo";

export const metadata: Metadata = {
    title: "Crear perfil de organizador | Meevent",
    description: "Completa los datos necesarios para organizar eventos en Meevent.",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function OrganizerOnboardingPage() {
    return (
        <main className="min-h-screen bg-neutral-50 px-4 py-10">
            <section className="mx-auto w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <Link
                    href="/"
                    className="text-meevent-primary mx-auto mb-8 block w-fit"
                    aria-label="Volver al inicio de Meevent"
                >
                    <MeeventLogo className="h-auto w-36" />
                </Link>

                <header className="mb-7 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
                        Conviértete en organizador
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                        Completa esta información para crear y administrar eventos en Meevent.
                    </p>
                </header>

                <OrganizerOnboardingForm />
            </section>
        </main>
    );
}
