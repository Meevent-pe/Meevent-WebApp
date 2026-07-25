import "server-only";

import { getServerEnv } from "@/shared/config/env.server";
import type { ApiErrorDto } from "@/shared/types/api-error.types";

const DEFAULT_TIMEOUT_MS = 10_000;

export class BackendApiError extends Error {
    constructor(
        public readonly status: number,
        public readonly payload: ApiErrorDto
    ) {
        super(payload.message);
        this.name = "BackendApiError";
    }
}

interface BackendRequestOptions extends Omit<RequestInit, "body"> {
    body?: unknown;
}

function buildUrl(endpoint: string) {
    const { API_URL } = getServerEnv();
    const baseUrl = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

    return `${baseUrl}${path}`;
}

async function parseResponse(response: Response): Promise<unknown> {
    if (response.status === 204) {
        return undefined;
    }

    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
        return response.json();
    }

    const text = await response.text();
    return text || undefined;
}

function isApiErrorDto(value: unknown): value is ApiErrorDto {
    if (!value || typeof value !== "object") {
        return false;
    }

    const candidate = value as Partial<ApiErrorDto>;
    return typeof candidate.code === "string" && typeof candidate.message === "string";
}

export async function backendRequest<T>(
    endpoint: string,
    options: BackendRequestOptions = {}
): Promise<T> {
    const headers = new Headers(options.headers);

    if (options.body !== undefined && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(buildUrl(endpoint), {
        ...options,
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
        cache: "no-store",
        headers,
        signal: options.signal ?? AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
    });

    const payload = await parseResponse(response);

    if (!response.ok) {
        const apiError: ApiErrorDto = isApiErrorDto(payload)
            ? payload
            : {
                  code: "HTTP_ERROR",
                  message: `La API respondió con estado ${response.status}.`,
              };

        throw new BackendApiError(response.status, apiError);
    }

    return payload as T;
}
