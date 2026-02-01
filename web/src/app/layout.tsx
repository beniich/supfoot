import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "FootballHub+ | Your Ultimate Football Companion",
    description: "Live scores, AI predictions, fantasy leagues, and more. Join the ultimate football community.",
    keywords: ["football", "soccer", "live scores", "predictions", "fantasy league", "tickets"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <head>
                <link rel="icon" href="/logo.svg" type="image/svg+xml" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased">
                {children}
            </body>
        </html>
    );
}
