import { EventQueries } from "@/features/event";

const MOCK_EVENTS: EventQueries.GetPublicBySlugResponse[] = [
    {
        id: 1,
        slug: "frontend-summit",
        title: "Global Frontend Summit 2026",
        description: "Join the world's leading frontend engineers and designers.",
        bannerUrl:
            "https://res.cloudinary.com/diryo1oi1/image/upload/v1781572916/h5mt3yothdjougfn1jxq.png",
        status: "PUBLISHED",
        startsAt: "2026-10-24T09:00:00Z",
        endsAt: "2026-10-26T17:00:00Z",
        timezone: "UTC",
        venueName: "Convention Center",
        address: "123 Main Street",
        city: "Lima",
        latitude: -12.0464,
        longitude: -77.0438,
    },
];

export async function getPublicEventBySlug(
    slug: string
): Promise<EventQueries.GetPublicBySlugResponse | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const event = MOCK_EVENTS.find((event) => event.slug === slug);

    if (!event) return null;

    if (event.status === "DRAFT") return null;

    return event;
}
