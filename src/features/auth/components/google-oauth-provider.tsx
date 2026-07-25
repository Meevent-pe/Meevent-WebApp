"use client";

import Script from "next/script";
import { createContext, useContext, useState, type ReactNode } from "react";

const GoogleOAuthContext = createContext(false);

export function GoogleOAuthProvider({ children }: { children: ReactNode }) {
    const [ready, setReady] = useState(() => typeof window !== "undefined" && !!window.google);

    return (
        <GoogleOAuthContext.Provider value={ready}>
            <Script
                id="google-identity-sdk"
                src="https://accounts.google.com/gsi/client"
                strategy="afterInteractive"
                onReady={() => setReady(true)}
                onError={() => setReady(false)}
            />
            {children}
        </GoogleOAuthContext.Provider>
    );
}

export function useGoogleOAuthReady() {
    return useContext(GoogleOAuthContext);
}
