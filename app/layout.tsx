import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "./contexts/AppContext";

export const metadata: Metadata = {
    title: "WhatsApp Clone",
    description: "A modern WhatsApp clone built with Next.js 16",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    );
}
