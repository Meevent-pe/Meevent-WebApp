import { CircleCheck, CircleX } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface AuthAlertProps {
    type: "error" | "success";
    message: string;
}

export function AuthAlert({ type, message }: AuthAlertProps) {
    const Icon = type === "success" ? CircleCheck : CircleX;

    return (
        <div
            role={type === "error" ? "alert" : "status"}
            className={cn(
                "flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm",
                type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-red-200 bg-red-50 text-red-700"
            )}
        >
            <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>{message}</span>
        </div>
    );
}
