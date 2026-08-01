import type { Metadata } from "next";
import { UserRound } from "lucide-react";

export const metadata: Metadata = {
    title: "Perfil del organizador | Meevent",
    robots: { index: false, follow: false },
};

export default function OrganizerProfilePage() {
    return (
        <div className="space-y-8">
            <header>
                <p className="text-meevent-primary text-sm font-medium">Organización</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                    Perfil del organizador
                </h1>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                    Aquí podrás consultar y actualizar la información pública de tu organización.
                </p>
            </header>

            <section className="rounded-xl border border-dashed border-neutral-300 bg-white px-5 py-12 text-center">
                <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                    <UserRound className="size-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 font-semibold text-neutral-950">Información del perfil</h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-600">
                    La lectura y edición del perfil se conectarán con el endpoint del organizador en
                    una etapa posterior.
                </p>
            </section>
        </div>
    );
}
