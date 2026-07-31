import type { ReactNode } from "react";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import "@/app/globals.css";

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

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="es">
            <body
                className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} font-inter antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
