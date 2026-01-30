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
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
                {children}
            </body>
        </html>
    );
}
