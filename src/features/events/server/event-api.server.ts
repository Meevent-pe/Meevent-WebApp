import "server-only";

import {
    eventPageDtoSchema,
    eventResponseDtoSchema,
} from "@/features/events/schemas/event-api.schemas";
import type {
    EventCreateRequestDto,
    EventPageDto,
    EventResponseDto,
    EventStatus,
    EventUpdateRequestDto,
} from "@/features/events/types/event-api.types";
import { backendRequest } from "@/shared/services/backend-client.server";

export const eventApi = {
    async create(payload: EventCreateRequestDto, accessToken: string) {
        const response = await backendRequest<unknown>("/organizer/events", {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}` },
            body: payload,
        });

        return eventResponseDtoSchema.parse(response) satisfies EventResponseDto;
    },

    async list(accessToken: string, page = 0, size = 20, status?: EventStatus) {
        const params = new URLSearchParams({
            page: String(page),
            size: String(size),
            sort: "startsAt,desc",
        });
        if (status) {
            params.set("status", status);
        }
        const response = await backendRequest<unknown>(`/organizer/events?${params}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return eventPageDtoSchema.parse(response) satisfies EventPageDto;
    },

    async getById(eventId: number, accessToken: string) {
        const response = await backendRequest<unknown>(`/organizer/events/${eventId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return eventResponseDtoSchema.parse(response) satisfies EventResponseDto;
    },

    async update(eventId: number, payload: EventUpdateRequestDto, accessToken: string) {
        const response = await backendRequest<unknown>(`/organizer/events/${eventId}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${accessToken}` },
            body: payload,
        });

        return eventResponseDtoSchema.parse(response) satisfies EventResponseDto;
    },

    async publish(eventId: number, accessToken: string) {
        await backendRequest<void>(`/organizer/events/${eventId}/publish`, {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    },

    async cancel(eventId: number, accessToken: string) {
        await backendRequest<void>(`/organizer/events/${eventId}/cancel`, {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    },
};
