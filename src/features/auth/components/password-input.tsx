"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState, type ComponentProps } from "react";

import { Input } from "@/shared/components/ui/input";

export const PasswordInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(
    function PasswordInput(props, ref) {
        const [visible, setVisible] = useState(false);

        return (
            <div className="relative">
                <Input
                    ref={ref}
                    type={visible ? "text" : "password"}
                    className="pr-10"
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => setVisible((current) => !current)}
                    className="focus-visible:ring-meevent-primary/40 absolute inset-y-0 right-0 flex w-10 items-center justify-center text-neutral-500 hover:text-neutral-900 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
                    aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                    {visible ? (
                        <EyeOff className="size-4" aria-hidden="true" />
                    ) : (
                        <Eye className="size-4" aria-hidden="true" />
                    )}
                </button>
            </div>
        );
    }
);
