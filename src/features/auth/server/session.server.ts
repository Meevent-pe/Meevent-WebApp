import "server-only";

import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { z } from "zod";

import { SESSION_COOKIE_NAME } from "@/features/auth/constants/auth-cookies";

const jwtClaimsSchema = z.object({
    sub: z.email(),
    role: z.enum(["ATTENDEE", "ORGANIZER", "ADMIN"]),
    auth_provider: z.enum(["LOCAL", "GOOGLE"]),
    exp: z.number().int().positive(),
});

function readClaims(accessToken: string) {
    const claims = jwtClaimsSchema.parse(decodeJwt(accessToken));

    return {
        email: claims.sub,
        role: claims.role,
        authProvider: claims.auth_provider,
        expiresAt: claims.exp,
    };
}

export async function createSession(accessToken: string) {
    // El token acaba de llegar directamente de Spring. Los claims se decodifican
    // únicamente para validar su estructura y sincronizar la expiración de la cookie.
    // La autorización real siempre corresponde al backend.
    const claims = readClaims(accessToken);
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

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}
