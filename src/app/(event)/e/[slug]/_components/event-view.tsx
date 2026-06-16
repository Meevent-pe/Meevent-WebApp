import { EventQueries } from "@/features/event";
import { EventBanner } from "./event-banner";
import { EventHero } from "./event-hero";
import { EventDescription } from "./event-description";
import { EventLocation } from "./event-location";
import { EventSidebar } from "./event_sidebar";

interface Props {
    event: EventQueries.GetPublicBySlugResponse;
}

export function EventView({ event }: Props) {
    return (
        <main className="mx-auto max-w-7xl px-4 py-8">
            <EventBanner title={event.title} bannerUrl={event.bannerUrl} />

            <EventHero event={event} />

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
                <section className="space-y-8 lg:col-span-8">
                    <EventDescription description={event.description} />

                    <EventLocation
                        venueName={event.venueName}
                        address={event.address}
                        city={event.city}
                    />
                </section>

                <EventSidebar />
            </div>
        </main>
    );
}
