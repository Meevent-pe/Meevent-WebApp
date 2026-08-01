import "server-only";

import {
    organizerProfileDtoSchema,
    type OrganizerProfileDto,
} from "@/features/organizer/schemas/organizer-api.schemas";
import type { OnboardOrganizerRequestDto } from "@/features/organizer/types/organizer-api.types";
import { backendRequest } from "@/shared/services/backend-client.server";

export const organizerApi = {
    async onboard(payload: OnboardOrganizerRequestDto, accessToken: string) {
        const response = await backendRequest<unknown>("/organizer/onboard", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: payload,
        });

        return organizerProfileDtoSchema.parse(response) satisfies OrganizerProfileDto;
    },
};
