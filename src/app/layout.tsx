import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/sonner";
import MsClarity from "@/components/analytics/clarity-init";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

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
                url: "/og-image.png",
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
        images: ["/og-image.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body
                className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} font-inter antialiased`}
            >
                {children}
                <Toaster position="top-center" />
            </body>
            <GoogleAnalytics gaId="G-9WYFY4774T" />
            <MsClarity />
        </html>
    );
}
