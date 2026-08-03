import type { EventFormValues } from "@/features/events/schemas/event.schemas";
import type {
    EventCreateRequestDto,
    EventResponseDto,
    EventUpdateRequestDto,
} from "@/features/events/types/event-api.types";

function toPeruOffsetDateTime(value: string) {
    return `${value.length === 16 ? `${value}:00` : value}-05:00`;
}

function requireMaxAttendees(value: EventFormValues["maxAttendees"]) {
    if (value === "") {
        throw new Error("El aforo máximo es obligatorio.");
    }

    return value;
}

function normalizeCoordinate(value: number) {
    return Number(value.toFixed(7));
}

function representsSameInstant(localValue: string, apiValue: string | null) {
    if (!localValue || !apiValue) {
        return localValue === "" && apiValue === null;
    }

    return new Date(toPeruOffsetDateTime(localValue)).getTime() === new Date(apiValue).getTime();
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
        latitude: normalizeCoordinate(values.latitude),
        longitude: normalizeCoordinate(values.longitude),
        ...(values.salesOpenAt ? { salesOpenAt: toPeruOffsetDateTime(values.salesOpenAt) } : {}),
        ...(values.salesCloseAt ? { salesCloseAt: toPeruOffsetDateTime(values.salesCloseAt) } : {}),
        maxAttendees: requireMaxAttendees(values.maxAttendees),
    };
}

export function toEventUpdateRequestDto(
    values: EventFormValues,
    current: EventResponseDto
): EventUpdateRequestDto {
    const payload: EventUpdateRequestDto = {};
    const title = values.title.trim();
    const description = values.description.trim();
    const venueName = values.venueName.trim();
    const address = values.address.trim();
    const latitude = normalizeCoordinate(values.latitude);
    const longitude = normalizeCoordinate(values.longitude);
    const maxAttendees = requireMaxAttendees(values.maxAttendees);

    if (title !== current.title) payload.title = title;
    if (description !== current.description) payload.description = description;
    if (values.bannerUrl !== current.bannerUrl) payload.bannerUrl = values.bannerUrl;
    if (!representsSameInstant(values.startsAt, current.startsAt)) {
        payload.startsAt = toPeruOffsetDateTime(values.startsAt);
    }
    if (!representsSameInstant(values.endsAt, current.endsAt)) {
        payload.endsAt = toPeruOffsetDateTime(values.endsAt);
    }
    if (current.timezone !== "America/Lima") payload.timezone = "America/Lima";
    if (venueName !== current.venueName) payload.venueName = venueName;
    if (address !== current.address) payload.address = address;
    if (values.cityId !== current.cityId) payload.cityId = values.cityId;
    if (latitude !== current.latitude) payload.latitude = latitude;
    if (longitude !== current.longitude) payload.longitude = longitude;
    if (values.salesOpenAt && !representsSameInstant(values.salesOpenAt, current.salesOpenAt)) {
        payload.salesOpenAt = toPeruOffsetDateTime(values.salesOpenAt);
    }
    if (values.salesCloseAt && !representsSameInstant(values.salesCloseAt, current.salesCloseAt)) {
        payload.salesCloseAt = toPeruOffsetDateTime(values.salesCloseAt);
    }
    if (maxAttendees !== current.maxAttendees) payload.maxAttendees = maxAttendees;

    return payload;
}
