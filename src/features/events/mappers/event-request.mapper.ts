import type { EventFormValues } from "@/features/events/schemas/event.schemas";
import type { EventCreateRequestDto } from "@/features/events/types/event-api.types";

function toPeruOffsetDateTime(value: string) {
    return `${value.length === 16 ? `${value}:00` : value}-05:00`;
}

export function toEventCreateRequestDto(values: EventFormValues): EventCreateRequestDto {
    return {
        title: values.title.trim(),
        description: values.description.trim(),
        bannerUrl: values.bannerUrl,
        startsAt: toPeruOffsetDateTime(values.startsAt),
        endsAt: toPeruOffsetDateTime(values.endsAt),
        timezone: "America/Lima",
        venueName: values.venueName.trim(),
        address: values.address.trim(),
        cityId: values.cityId,
        latitude: Number(values.latitude.toFixed(7)),
        longitude: Number(values.longitude.toFixed(7)),
        ...(values.salesOpenAt ? { salesOpenAt: toPeruOffsetDateTime(values.salesOpenAt) } : {}),
        ...(values.salesCloseAt ? { salesCloseAt: toPeruOffsetDateTime(values.salesCloseAt) } : {}),
        ...(values.maxAttendees !== "" ? { maxAttendees: values.maxAttendees } : {}),
    };
}
