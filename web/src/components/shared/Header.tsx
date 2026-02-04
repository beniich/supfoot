// src/components/shared/Header.tsx
'use client';

import { Search, User, Star } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    return (
        <>
            <div className="h-12 w-full bg-ucl-midnight hidden md:block"></div>
            <header className="sticky top-0 z-50 bg-ucl-midnight text-white px-4 py-3 flex items-center justify-between border-b border-white/10">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-ucl-blue rounded-full flex items-center justify-center border border-ucl-accent shadow-[0_0_10px_rgba(0,245,255,0.3)]">
                        <Star className="text-ucl-accent fill-ucl-accent" size={16} />
                    </div>
                    <h1 className="font-extrabold tracking-tight text-xl italic bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        FootballHub<span className="text-ucl-accent">+</span>
                    </h1>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/news" className="text-gray-300 hover:text-ucl-accent transition-colors font-medium">
                        Actualités
                    </Link>
                    <Link href="/matches" className="text-gray-300 hover:text-ucl-accent transition-colors font-medium">
                        Matchs
                    </Link>
                    <Link href="/leagues" className="text-gray-300 hover:text-ucl-accent transition-colors font-medium">
                        Compétitions
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <Search size={24} className="text-white/90" />
                    </button>
                    <Link href="/profile" className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <User size={24} className="text-white/90" />
                    </Link>
                </div>
            </header>
        </>
    );
}
