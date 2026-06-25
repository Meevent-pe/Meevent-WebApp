import { EventQueries } from "@/features/event";

interface Props {
    event: EventQueries.GetPublicBySlugResponse;
}

export function EventHero({ event }: Props) {
    return (
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
                <h1 className="text-3xl font-bold tracking-tight lg:text-5xl lg:font-extrabold">
                    {event.title}
                </h1>
            </div>

            <div className="space-y-3 lg:col-span-4">
                <div className="bg-card rounded-xl border p-4">
                    <p className="font-medium">{event.startsAt}</p>
                </div>

                <div className="bg-card rounded-xl border p-4">
                    <p className="font-medium">{event.venueName}</p>
                </div>
            </div>
        </section>
    );
}
