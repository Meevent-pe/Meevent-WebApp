import type { UserRole } from "@/features/auth/lib/session-claims";

const ORGANIZER_DASHBOARD_ROUTE = "/organizer/dashboard";

export function getAuthenticatedHome(role: UserRole) {
    return role === "ORGANIZER" ? ORGANIZER_DASHBOARD_ROUTE : "/";
}
