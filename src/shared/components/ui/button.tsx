import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-meevent-primary/40 focus-visible:ring-offset-2",
    {
        variants: {
            variant: {
                default: "bg-meevent-primary text-white shadow-sm hover:bg-meevent-primary/90",
                outline:
                    "border border-border bg-background text-foreground shadow-xs hover:bg-muted",
                ghost: "text-foreground hover:bg-muted",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-11 px-6",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

function Button({
    className,
    variant,
    size,
    type = "button",
    ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
    return (
        <button
            type={type}
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        />
    );
}

export { Button, buttonVariants };
