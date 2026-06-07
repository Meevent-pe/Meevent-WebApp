"use strict";
"use client";

import { useEffect, useState } from "react";
import { initMocks } from "@/shared/mocks";

export function MSWProvider({ children }: { children: React.ReactNode }) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        initMocks().then(() => setReady(true));
    }, []);

    if (!ready && process.env.NEXT_PUBLIC_ENABLE_MOCKS === "true") {
        return null;
    }

    return <>{children}</>;
}
