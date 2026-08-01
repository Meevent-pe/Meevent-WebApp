import "server-only";

import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME } from "@/features/auth/constants/auth-cookies";
import { isSessionExpired, readSessionClaims } from "@/features/auth/lib/session-claims";
import type { AuthSession } from "@/features/auth/types/auth.types";

export async function createSession(accessToken: string) {
    // El token acaba de llegar directamente de Spring. Los claims se decodifican
    // únicamente para validar su estructura y sincronizar la expiración de la cookie.
    // La autorización real siempre corresponde al backend.
    const claims = readSessionClaims(accessToken);
    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE_NAME, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(claims.expiresAt * 1000),
        priority: "high",
    });

    return claims;
}

export async function getSessionToken() {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;
}

export async function getSession(): Promise<AuthSession | null> {
    const accessToken = await getSessionToken();
    if (!accessToken) {
        return null;
    }

    try {
        const claims = readSessionClaims(accessToken);
        if (isSessionExpired(claims)) {
            return null;
        }

        return {
            accessToken,
            ...claims,
        };
    } catch {
        return null;
    }
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}
