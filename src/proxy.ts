import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE_NAME } from "@/features/auth/constants/auth-cookies";

export function proxy(request: NextRequest) {
    if (request.cookies.has(SESSION_COOKIE_NAME)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/register", "/forgot-password"],
};
