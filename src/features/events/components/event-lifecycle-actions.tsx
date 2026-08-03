"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { cancelEventAction, publishEventAction } from "@/features/events/actions/event.actions";
import type { EventStatus } from "@/features/events/types/event-api.types";
import { FormAlert } from "@/shared/components/forms/form-alert";
import { Button } from "@/shared/components/ui/button";
import type { ActionResult } from "@/shared/types/action-result.types";

interface EventLifecycleActionsProps {
    eventId: number;
    status: EventStatus;
}

export function EventLifecycleActions({ eventId, status }: EventLifecycleActionsProps) {
    const router = useRouter();
    const [pendingAction, setPendingAction] = useState<"publish" | "cancel" | null>(null);
    const [result, setResult] = useState<ActionResult | null>(null);

    async function publishEvent() {
        setResult(null);
        setPendingAction("publish");
        const actionResult = await publishEventAction(eventId);
        setResult(actionResult);
        setPendingAction(null);
        if (actionResult.success) router.refresh();
    }

    async function cancelEvent() {
        if (
            !window.confirm("¿Seguro que deseas cancelar este evento? Esta acción es definitiva.")
        ) {
            return;
        }

        setResult(null);
        setPendingAction("cancel");
        const actionResult = await cancelEventAction(eventId);
        setResult(actionResult);
        setPendingAction(null);
        if (actionResult.success) router.refresh();
    }

    if (status === "CANCELLED" || status === "CLOSED") return null;

    return (
        <div className="space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row">
                {status === "DRAFT" ? (
                    <Button onClick={() => void publishEvent()} disabled={pendingAction !== null}>
                        {pendingAction === "publish" ? "Publicando..." : "Publicar evento"}
                    </Button>
                ) : null}
                <Button
                    variant="outline"
                    className="border-red-200 text-red-700 hover:bg-red-50"
                    onClick={() => void cancelEvent()}
                    disabled={pendingAction !== null}
                >
                    {pendingAction === "cancel" ? "Cancelando..." : "Cancelar evento"}
                </Button>
            </div>
            {result ? (
                <FormAlert
                    type={result.success ? "success" : "error"}
                    message={result.message}
                    traceId={result.traceId}
                />
            ) : null}
        </div>
    );
}
