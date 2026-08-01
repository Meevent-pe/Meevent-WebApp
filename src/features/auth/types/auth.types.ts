import type { SessionClaims } from "@/features/auth/lib/session-claims";

export type { AuthProvider, UserRole } from "@/features/auth/lib/session-claims";

export interface AuthSession extends SessionClaims {
    accessToken: string;
}
