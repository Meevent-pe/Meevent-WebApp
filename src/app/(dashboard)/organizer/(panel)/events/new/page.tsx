import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { EventCreateForm } from "@/features/events/components/event-create-form";

export const metadata: Metadata = {
    title: "Crear evento | Meevent",
    robots: { index: false, follow: false },
};

export default function CreateEventPage() {
    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <header>
                <Link
                    href="/organizer/events"
                    className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-950"
                >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    Volver a eventos
                </Link>
                <p className="text-meevent-primary mt-5 text-sm font-medium">Organización</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                    Crear evento
                </h1>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                    El evento se guardará inicialmente como borrador para que puedas completar su
                    configuración antes de publicarlo.
                </p>
            </header>

            <EventCreateForm />
        </div>
    );
}
