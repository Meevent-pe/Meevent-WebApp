import { EventQueries } from "@/features/event";

interface Props {
    event: EventQueries.GetPublicBySlugResponse;
}

export function EventHero({ event }: Props) {
    return (
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
                <h1 className="text-5xl font-bold tracking-tight">
                    {event.title}
                </h1>
            </div>

            <div className="lg:col-span-4 space-y-3">
                <div className="rounded-xl border bg-card p-4">
                    <p className="font-medium">
                        {event.startsAt}
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-4">
                    <p className="font-medium">
                        {event.venueName}
                    </p>
                </div>
            </div>
        </section>
    );
}
