// src/components/home/HomeHeader.tsx
import { Search, User, Star, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function HomeHeader() {
    return (
        <>
            <div className="h-12 w-full bg-ucl-midnight hidden md:block"></div>
            <header className="sticky top-0 z-50 bg-ucl-midnight text-white flex flex-col border-b border-white/10 shadow-lg">
                {/* Top Bar */}
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-ucl-blue rounded-full flex items-center justify-center border border-ucl-accent shadow-[0_0_10px_rgba(0,245,255,0.3)]">
                            <Star className="text-ucl-accent fill-ucl-accent" size={16} />
                        </div>
                        <h1 className="font-extrabold tracking-tight text-xl italic bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            FootballHub<span className="text-ucl-accent">+</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                            <Search size={24} className="text-white/90" />
                        </button>
                        <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                            <User size={24} className="text-white/90" />
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <nav className="flex items-center gap-6 px-4 overflow-x-auto no-scrollbar py-2 text-[13px] font-semibold text-white/70">
                    <Link href="/matches" className="text-white border-b-2 border-ucl-accent pb-1 shrink-0">
                        Matches
                    </Link>
                    <Link href="/table" className="hover:text-white transition-colors shrink-0">
                        Table
                    </Link>
                    <Link href="/tv" className="hover:text-white transition-colors shrink-0 flex items-center gap-1">
                        UEFA.tv
                    </Link>
                    <Link href="/draws" className="hover:text-white transition-colors shrink-0">
                        Draws
                    </Link>
                    <button className="hover:text-white transition-colors shrink-0 flex items-center gap-1">
                        Gaming <ChevronDown size={12} />
                    </button>
                    <button className="hover:text-white transition-colors shrink-0 flex items-center gap-1">
                        Stats <ChevronDown size={12} />
                    </button>
                    <Link href="/teams" className="hover:text-white transition-colors shrink-0">
                        Teams
                    </Link>
                </nav>
            </header>
        </>
    );
}
