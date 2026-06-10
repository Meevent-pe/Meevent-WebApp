"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const GoogleOAuthContext = createContext<{ isGoogleReady: boolean }>({ isGoogleReady: false });

export function GoogleOAuthProvider({ children }: { children: ReactNode }) {
    const [isGoogleReady, setIsGoogleReady] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).google) {
            setIsGoogleReady(true);
            return;
        }

        const handleScriptLoad = () => setIsGoogleReady(true);

        const script = document.getElementById("google-identity-sdk");
        if (script) {
            script.addEventListener("load", handleScriptLoad);
        }

        return () => {
            if (script) {
                script.removeEventListener("load", handleScriptLoad);
            }
        };
    }, []);

    return (
        <GoogleOAuthContext.Provider value={{ isGoogleReady }}>
            {children}
        </GoogleOAuthContext.Provider>
    );
}

export const useGoogleOAuth = () => useContext(GoogleOAuthContext);
