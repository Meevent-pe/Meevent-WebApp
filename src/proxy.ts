import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE_NAME } from "@/features/auth/constants/auth-cookies";
import { getAuthenticatedHome } from "@/features/auth/lib/auth-navigation";
import {
    isSessionExpired,
    readSessionClaims,
    type SessionClaims,
} from "@/features/auth/lib/session-claims";

const GUEST_ROUTES = new Set(["/login", "/register", "/forgot-password"]);
const ORGANIZER_ONBOARDING_ROUTE = "/organizer/onboarding";
const ORGANIZER_DASHBOARD_ROUTE = "/organizer/dashboard";

function readSession(request: NextRequest): SessionClaims | null {
    const accessToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!accessToken) {
        return null;
    }

    try {
        const claims = readSessionClaims(accessToken);
        return isSessionExpired(claims) ? null : claims;
    } catch {
        return null;
    }
}

function clearInvalidSession(
    response: NextResponse,
    request: NextRequest,
    session: SessionClaims | null
) {
    if (request.cookies.has(SESSION_COOKIE_NAME) && !session) {
        response.cookies.delete(SESSION_COOKIE_NAME);
    }

    return response;
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = readSession(request);

    if (GUEST_ROUTES.has(pathname)) {
        const response = session
            ? NextResponse.redirect(new URL(getAuthenticatedHome(session.role), request.url))
            : NextResponse.next();

        return clearInvalidSession(response, request, session);
    }

    if (pathname === ORGANIZER_ONBOARDING_ROUTE) {
        if (!session) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("next", ORGANIZER_ONBOARDING_ROUTE);

            return clearInvalidSession(NextResponse.redirect(loginUrl), request, session);
        }

        if (session.role !== "ATTENDEE") {
            return NextResponse.redirect(new URL(getAuthenticatedHome(session.role), request.url));
        }
    }

    if (pathname.startsWith("/organizer/") && pathname !== ORGANIZER_ONBOARDING_ROUTE) {
        if (!session) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("next", ORGANIZER_DASHBOARD_ROUTE);

            return clearInvalidSession(NextResponse.redirect(loginUrl), request, session);
        }

        if (session.role === "ATTENDEE") {
            return NextResponse.redirect(new URL(ORGANIZER_ONBOARDING_ROUTE, request.url));
        }

        if (session.role !== "ORGANIZER") {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/register", "/forgot-password", "/organizer/:path*"],
};
