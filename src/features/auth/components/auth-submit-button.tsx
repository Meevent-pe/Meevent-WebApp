"use client";

import { LoaderCircle } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

interface AuthSubmitButtonProps {
    pending: boolean;
    children: string;
}

export function AuthSubmitButton({ pending, children }: AuthSubmitButtonProps) {
    return (
        <Button type="submit" size="lg" className="w-full" disabled={pending}>
            {pending ? (
                <>
                    <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                    Procesando...
                </>
            ) : (
                children
            )}
        </Button>
    );
}
