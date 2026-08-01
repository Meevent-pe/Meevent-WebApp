import { LoaderCircle } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

interface SubmitButtonProps {
    pending: boolean;
    children: string;
    pendingLabel?: string;
}

export function SubmitButton({
    pending,
    children,
    pendingLabel = "Procesando...",
}: SubmitButtonProps) {
    return (
        <Button type="submit" size="lg" className="w-full" disabled={pending}>
            {pending ? (
                <>
                    <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                    {pendingLabel}
                </>
            ) : (
                children
            )}
        </Button>
    );
}
