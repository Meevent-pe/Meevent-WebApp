import { Event } from "./event.common";

export namespace EventQueries {
    export interface GetPublicBySlugResponse {
        id: number;
        slug: string;
        title: string;
        description: string;
        bannerUrl: string;
        status: Event.Status;
        startsAt: string;
        endsAt: string;
        timezone: string;
        venueName: string;
        address: string;
        city: string;
        latitude: number | null;
        longitude: number | null;
    }
}
