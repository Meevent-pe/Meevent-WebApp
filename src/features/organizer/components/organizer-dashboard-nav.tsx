"use client";

import { CalendarDays, LayoutDashboard, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/lib/utils";

const NAVIGATION_ITEMS = [
    {
        href: "/organizer/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        href: "/organizer/events",
        label: "Eventos",
        icon: CalendarDays,
    },
    {
        href: "/organizer/profile",
        label: "Perfil",
        icon: UserRound,
    },
] as const;

export function OrganizerDashboardNav({ mobile = false }: { mobile?: boolean }) {
    const pathname = usePathname();

    return (
        <nav
            aria-label="Navegación del organizador"
            className={cn(mobile ? "grid grid-cols-3 gap-1" : "space-y-1")}
        >
            {NAVIGATION_ITEMS.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);

                return (
                    <Link
                        key={href}
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                            "flex items-center rounded-lg text-sm font-medium transition-colors",
                            mobile
                                ? "min-h-14 flex-col justify-center gap-1 px-2 py-2 text-xs"
                                : "gap-3 px-3 py-2.5",
                            active
                                ? "bg-meevent-primary/10 text-meevent-primary"
                                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
                        )}
                    >
                        <Icon className="size-5 shrink-0" aria-hidden="true" />
                        <span>{label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
