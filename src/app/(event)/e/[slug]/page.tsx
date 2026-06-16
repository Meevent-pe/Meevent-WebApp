import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getPublicEventBySlug } from "@/features/event";
import { EventView } from "./_components/event-view";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const event = await getPublicEventBySlug(slug);

    if (!event) {
        return {};
    }

    return {
        title: event.title,
        description: event.description,

        openGraph: {
            title: event.title,
            description: event.description,
            images: [
                {
                    url: event.bannerUrl,
                    width: 1200,
                    height: 630,
                },
            ],
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title: event.title,
            description: event.description,
            images: [event.bannerUrl],
        },
    };
}

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function EventPage({ params }: Props) {
    const { slug } = await params;

    const event = await getPublicEventBySlug(slug);

    if (!event) {
        notFound();
    }

    return <EventView event={event} />;
}
