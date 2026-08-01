import { CalendarDays } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Eventos | Meevent",
    robots: { index: false, follow: false },
};

export default function OrganizerEventsPage() {
    return (
        <div className="space-y-8">
            <header>
                <p className="text-meevent-primary text-sm font-medium">Organización</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                    Eventos
                </h1>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                    Este apartado reunirá la creación y gestión de tus eventos.
                </p>
            </header>

            <section className="rounded-xl border border-dashed border-neutral-300 bg-white px-5 py-12 text-center">
                <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                    <CalendarDays className="size-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 font-semibold text-neutral-950">Gestión de eventos</h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-600">
                    El listado y las acciones de eventos se integrarán en el siguiente avance
                    funcional.
                </p>
            </section>
        </div>
    );
}
