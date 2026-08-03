import { ArrowLeft, CalendarDays, MapPin, UsersRound } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getSession } from "@/features/auth/session.server";
import { EventEditForm } from "@/features/events/components/event-edit-form";
import { EventLifecycleActions } from "@/features/events/components/event-lifecycle-actions";
import { eventApi } from "@/features/events/server/event-api.server";
import type { EventResponseDto, EventStatus } from "@/features/events/types/event-api.types";
import { FormAlert } from "@/shared/components/forms/form-alert";
import { buttonVariants } from "@/shared/components/ui/button";
import { BackendApiError } from "@/shared/services/backend-client.server";
import { cn } from "@/shared/lib/utils";

export const metadata: Metadata = {
    title: "Administrar evento | Meevent",
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

function formatEventDate(value: string) {
    return new Intl.DateTimeFormat("es-PE", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "America/Lima",
    }).format(new Date(value));
}

function EventReadOnlySummary({ event }: { event: EventResponseDto }) {
    return (
        <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
            {event.bannerUrl ? (
                <div className="relative aspect-video max-h-96 w-full">
                    <Image src={event.bannerUrl} alt="" fill className="object-cover" />
                </div>
            ) : null}
            <div className="space-y-5 p-5 sm:p-6">
                <p className="text-sm leading-6 whitespace-pre-wrap text-neutral-700">
                    {event.description}
                </p>
                <dl className="grid gap-4 text-sm sm:grid-cols-2">
                    <div>
                        <dt className="font-medium text-neutral-950">Fecha</dt>
                        <dd className="mt-1 flex gap-2 text-neutral-600">
                            <CalendarDays className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                            {formatEventDate(event.startsAt)} — {formatEventDate(event.endsAt)}
                        </dd>
                    </div>
                    <div>
                        <dt className="font-medium text-neutral-950">Ubicación</dt>
                        <dd className="mt-1 flex gap-2 text-neutral-600">
                            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                            {event.venueName ?? event.address ?? "Sin ubicación"}
                        </dd>
                    </div>
                    <div>
                        <dt className="font-medium text-neutral-950">Aforo</dt>
                        <dd className="mt-1 flex gap-2 text-neutral-600">
                            <UsersRound className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                            {event.maxAttendees?.toLocaleString("es-PE") ?? "No definido"}
                        </dd>
                    </div>
                    <div>
                        <dt className="font-medium text-neutral-950">Slug público</dt>
                        <dd className="mt-1 break-all text-neutral-600">{event.slug}</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}

interface OrganizerEventPageProps {
    params: Promise<{ id: string }>;
}

export default async function OrganizerEventPage({ params }: OrganizerEventPageProps) {
    const { id } = await params;
    const eventId = Number(id);
    if (!Number.isSafeInteger(eventId) || eventId <= 0) notFound();

    const session = await getSession();
    if (!session) redirect(`/login?next=/organizer/events/${eventId}`);

    let event: EventResponseDto;
    try {
        event = await eventApi.getById(eventId, session.accessToken);
    } catch (error) {
        if (error instanceof BackendApiError && error.status === 404) notFound();
        return (
            <div className="space-y-4">
                <Link href="/organizer/events" className={buttonVariants({ variant: "outline" })}>
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    Volver a eventos
                </Link>
                <FormAlert type="error" message="No se pudo cargar la información del evento." />
            </div>
        );
    }

    const editable = event.status === "DRAFT" || event.status === "PUBLISHED";

    return (
        <div className="space-y-7">
            <header className="space-y-4">
                <Link
                    href="/organizer/events"
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-3")}
                >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    Volver a eventos
                </Link>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                                {event.title}
                            </h1>
                            <span
                                className={cn(
                                    "rounded-full px-2.5 py-1 text-xs font-medium",
                                    STATUS_STYLES[event.status]
                                )}
                            >
                                {STATUS_LABELS[event.status]}
                            </span>
                        </div>
                        <p className="mt-2 text-sm text-neutral-600">
                            Evento #{event.id} ·{" "}
                            {editable ? "Edita sus datos y estado." : "Vista de solo lectura."}
                        </p>
                    </div>
                    <EventLifecycleActions eventId={event.id} status={event.status} />
                </div>
            </header>

            {!editable ? (
                <FormAlert
                    type="error"
                    message="Los eventos cancelados o cerrados ya no se pueden modificar."
                />
            ) : null}

            {editable ? (
                <EventEditForm
                    key={`${event.id}-${event.status}-${event.bannerUrl}-${event.startsAt}`}
                    event={event}
                />
            ) : (
                <EventReadOnlySummary event={event} />
            )}
        </div>
    );
}
