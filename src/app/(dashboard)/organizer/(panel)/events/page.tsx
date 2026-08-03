import { CalendarDays, MapPin, Plus, Settings, UsersRound } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/features/auth/session.server";
import { eventApi } from "@/features/events/server/event-api.server";
import type { EventStatus } from "@/features/events/types/event-api.types";
import { FormAlert } from "@/shared/components/forms/form-alert";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

export const metadata: Metadata = {
    title: "Eventos | Meevent",
    robots: { index: false, follow: false },
};

const STATUS_LABELS: Record<EventStatus, string> = {
    DRAFT: "Borrador",
    PUBLISHED: "Publicado",
    CANCELLED: "Cancelado",
    CLOSED: "Cerrado",
};

const STATUS_STYLES: Record<EventStatus, string> = {
    DRAFT: "bg-amber-50 text-amber-700",
    PUBLISHED: "bg-emerald-50 text-emerald-700",
    CANCELLED: "bg-red-50 text-red-700",
    CLOSED: "bg-neutral-100 text-neutral-700",
};

const STATUS_FILTERS: Array<{ label: string; value?: EventStatus }> = [
    { label: "Todos" },
    { label: "Borradores", value: "DRAFT" },
    { label: "Publicados", value: "PUBLISHED" },
    { label: "Cancelados", value: "CANCELLED" },
    { label: "Cerrados", value: "CLOSED" },
];

function parseEventStatus(value: string | undefined): EventStatus | undefined {
    return STATUS_FILTERS.find((filter) => filter.value === value)?.value;
}

function eventsHref(page: number, status?: EventStatus) {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (status) params.set("status", status);
    const query = params.toString();
    return `/organizer/events${query ? `?${query}` : ""}`;
}

function formatEventDate(value: string) {
    return new Intl.DateTimeFormat("es-PE", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "America/Lima",
    }).format(new Date(value));
}

interface OrganizerEventsPageProps {
    searchParams: Promise<{ created?: string; page?: string; status?: string }>;
}

export default async function OrganizerEventsPage({ searchParams }: OrganizerEventsPageProps) {
    const session = await getSession();
    if (!session) {
        redirect("/login?next=/organizer/events");
    }

    const params = await searchParams;
    const requestedPage = Number.parseInt(params.page ?? "1", 10);
    const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage - 1 : 0;
    const status = parseEventStatus(params.status);
    let eventPage = null;
    let loadError = "";

    try {
        eventPage = await eventApi.list(session.accessToken, page, 12, status);
    } catch {
        loadError = "No se pudieron cargar tus eventos. Inténtalo nuevamente.";
    }

    return (
        <div className="space-y-8">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-meevent-primary text-sm font-medium">Organización</p>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                        Eventos
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                        Crea y revisa los eventos asociados a tu organización.
                    </p>
                </div>
                <Link
                    href="/organizer/events/new"
                    className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
                >
                    <Plus className="size-4" aria-hidden="true" />
                    Crear evento
                </Link>
            </header>

            {params.created === "1" ? (
                <FormAlert
                    type="success"
                    message="El evento fue creado correctamente y quedó guardado como borrador."
                />
            ) : null}

            {loadError ? <FormAlert type="error" message={loadError} /> : null}

            <nav
                className="flex gap-2 overflow-x-auto pb-1"
                aria-label="Filtrar eventos por estado"
            >
                {STATUS_FILTERS.map((filter) => {
                    const active = filter.value === status || (!filter.value && !status);
                    return (
                        <Link
                            key={filter.label}
                            href={eventsHref(1, filter.value)}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                                "shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                                active
                                    ? "border-meevent-primary bg-meevent-primary text-white"
                                    : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                            )}
                        >
                            {filter.label}
                        </Link>
                    );
                })}
            </nav>

            {eventPage && eventPage.content.length > 0 ? (
                <>
                    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {eventPage.content.map((event) => (
                            <article
                                key={event.id}
                                className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
                            >
                                <div className="relative aspect-video bg-neutral-100">
                                    {event.bannerUrl ? (
                                        <Image
                                            src={event.bannerUrl}
                                            alt={`Banner de ${event.title}`}
                                            fill
                                            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-neutral-400">
                                            <CalendarDays className="size-8" aria-hidden="true" />
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-3 p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <h2 className="line-clamp-2 font-semibold text-neutral-950">
                                            <Link
                                                href={`/organizer/events/${event.id}`}
                                                className="hover:text-meevent-primary"
                                            >
                                                {event.title}
                                            </Link>
                                        </h2>
                                        <span
                                            className={cn(
                                                "shrink-0 rounded-full px-2 py-1 text-xs font-medium",
                                                STATUS_STYLES[event.status]
                                            )}
                                        >
                                            {STATUS_LABELS[event.status]}
                                        </span>
                                    </div>
                                    <div className="space-y-2 text-sm text-neutral-600">
                                        <p className="flex items-start gap-2">
                                            <CalendarDays
                                                className="mt-0.5 size-4 shrink-0"
                                                aria-hidden="true"
                                            />
                                            {formatEventDate(event.startsAt)}
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <MapPin
                                                className="mt-0.5 size-4 shrink-0"
                                                aria-hidden="true"
                                            />
                                            <span className="line-clamp-2">
                                                {event.venueName ??
                                                    event.address ??
                                                    "Sin ubicación"}
                                            </span>
                                        </p>
                                        {event.maxAttendees ? (
                                            <p className="flex items-center gap-2">
                                                <UsersRound className="size-4" aria-hidden="true" />
                                                Aforo: {event.maxAttendees.toLocaleString("es-PE")}
                                            </p>
                                        ) : null}
                                    </div>
                                    <Link
                                        href={`/organizer/events/${event.id}`}
                                        className={cn(
                                            buttonVariants({ variant: "outline", size: "sm" }),
                                            "w-full"
                                        )}
                                    >
                                        <Settings className="size-4" aria-hidden="true" />
                                        Administrar evento
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </section>

                    {eventPage.totalPages > 1 ? (
                        <nav className="flex items-center justify-between" aria-label="Paginación">
                            <Link
                                href={eventsHref(Math.max(1, eventPage.number), status)}
                                aria-disabled={eventPage.first}
                                className={cn(
                                    buttonVariants({ variant: "outline" }),
                                    eventPage.first && "pointer-events-none opacity-50"
                                )}
                            >
                                Anterior
                            </Link>
                            <span className="text-sm text-neutral-600">
                                Página {eventPage.number + 1} de {eventPage.totalPages}
                            </span>
                            <Link
                                href={eventsHref(eventPage.number + 2, status)}
                                aria-disabled={eventPage.last}
                                className={cn(
                                    buttonVariants({ variant: "outline" }),
                                    eventPage.last && "pointer-events-none opacity-50"
                                )}
                            >
                                Siguiente
                            </Link>
                        </nav>
                    ) : null}
                </>
            ) : !loadError ? (
                <section className="rounded-xl border border-dashed border-neutral-300 bg-white px-5 py-12 text-center">
                    <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                        <CalendarDays className="size-5" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 font-semibold text-neutral-950">
                        {status ? "No hay eventos con este estado" : "Aún no tienes eventos"}
                    </h2>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-600">
                        {status
                            ? "Prueba otro filtro o revisa nuevamente cuando tengas eventos en este estado."
                            : "Crea tu primer evento. Se guardará como borrador y podrás completar su configuración antes de publicarlo."}
                    </p>
                    {status ? (
                        <Link href="/organizer/events" className={cn(buttonVariants(), "mt-5")}>
                            Ver todos
                        </Link>
                    ) : (
                        <Link href="/organizer/events/new" className={cn(buttonVariants(), "mt-5")}>
                            Crear mi primer evento
                        </Link>
                    )}
                </section>
            ) : null}
        </div>
    );
}
