"use client";
import Clarity from "@microsoft/clarity";
import { useEffect } from "react";

export default function MsClarity() {
    useEffect(() => {
        const projectId = process.env.NEXT_PUBLIC_CLARITY_ID;

        if (projectId && typeof window !== "undefined") {
            Clarity.init(projectId);
        }
    }, []);

    return null;
}
