import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import { Toaster } from "@/shared/components/ui/sonner";
import { ClarityAnalytics } from "./_components/ClarityAnalytics";

export const metadata: Metadata = {
    title: "Meevent – Descubre eventos confiables en Perú",
    description:
        "Encuentra los mejores planes con reseñas reales y un ranking de organizadores que no miente. No vuelvas a desperdiciar un fin de semana en un mal evento.",
    metadataBase: new URL("https://www.meevent.com.pe"),
    openGraph: {
        title: "Meevent – Descubre eventos confiables en Perú",
        description:
            "Encuentra los mejores planes con reseñas reales y un ranking de organizadores que no miente.",
        url: "https://www.meevent.com.pe",
        siteName: "Meevent",
        images: [
            {
                url: "/og/og-image.png",
                width: 1200,
                height: 630,
                alt: "Meevent – Descubre eventos confiables en Perú",
            },
        ],
        locale: "es_PE",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Meevent – Descubre eventos confiables en Perú",
        description:
            "Encuentra los mejores planes con reseñas reales y un ranking de organizadores que no miente.",
        images: ["/og/og-image.png"],
    },
};

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
            <Toaster position="top-center" />
            <GoogleAnalytics gaId="G-9WYFY4774T" />
            <ClarityAnalytics />
        </>
    );
}
