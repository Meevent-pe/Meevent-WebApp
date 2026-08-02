import "server-only";

import {
    eventPageDtoSchema,
    eventResponseDtoSchema,
} from "@/features/events/schemas/event-api.schemas";
import type {
    EventCreateRequestDto,
    EventPageDto,
    EventResponseDto,
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

    async list(accessToken: string, page = 0, size = 20) {
        const params = new URLSearchParams({
            page: String(page),
            size: String(size),
            sort: "startsAt,desc",
        });
        const response = await backendRequest<unknown>(`/organizer/events?${params}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return eventPageDtoSchema.parse(response) satisfies EventPageDto;
    },
};
