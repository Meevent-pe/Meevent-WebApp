import { decodeJwt } from "jose";
import { z } from "zod";

export const userRoleSchema = z.enum(["ATTENDEE", "ORGANIZER", "ADMIN"]);
export const authProviderSchema = z.enum(["LOCAL", "GOOGLE"]);

const jwtClaimsSchema = z.object({
    sub: z.email(),
    role: userRoleSchema,
    auth_provider: authProviderSchema,
    exp: z.number().int().positive(),
});

export type UserRole = z.infer<typeof userRoleSchema>;
export type AuthProvider = z.infer<typeof authProviderSchema>;

export interface SessionClaims {
    email: string;
    role: UserRole;
    authProvider: AuthProvider;
    expiresAt: number;
}

export function readSessionClaims(accessToken: string): SessionClaims {
    const claims = jwtClaimsSchema.parse(decodeJwt(accessToken));

    return {
        email: claims.sub,
        role: claims.role,
        authProvider: claims.auth_provider,
        expiresAt: claims.exp,
    };
}

export function isSessionExpired(claims: SessionClaims) {
    return claims.expiresAt <= Math.floor(Date.now() / 1000);
}
