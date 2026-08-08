export type EventStatus = "DRAFT" | "PUBLISHED" | "CANCELLED" | "CLOSED";

export interface EventCreateRequestDto {
    title: string;
    description: string;
    bannerUrl: string;
    startsAt: string;
    endsAt: string;
    timezone: "America/Lima";
    venueName: string;
    address: string;
    cityId: number;
    latitude: number;
    longitude: number;
    salesOpenAt?: string;
    salesCloseAt?: string;
}

export interface EventUpdateRequestDto {
    title?: string;
    description?: string;
    bannerUrl?: string;
    startsAt?: string;
    endsAt?: string;
    timezone?: "America/Lima";
    venueName?: string;
    address?: string;
    cityId?: number;
    latitude?: number;
    longitude?: number;
    salesOpenAt?: string;
    salesCloseAt?: string;
}

export interface EventResponseDto {
    id: number;
    slug: string;
    title: string;
    description: string;
    bannerUrl: string | null;
    status: EventStatus;
    startsAt: string;
    endsAt: string;
    timezone: string;
    venueName: string | null;
    address: string | null;
    cityId: number | null;
    latitude: number | null;
    longitude: number | null;
    salesOpenAt: string | null;
    salesCloseAt: string | null;
}

export interface EventPageDto {
    content: EventResponseDto[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
}
