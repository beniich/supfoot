'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Play, Trophy, MoreHorizontal } from 'lucide-react';

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-ucl-midnight/95 backdrop-blur-lg border-t border-white/10 pb-safe z-50">
            <div className="flex justify-between items-center h-20 px-6">
                <Link href="/" className="flex flex-col items-center gap-1 group">
                    <Home size={24} className={isActive('/') ? 'text-ucl-accent' : 'text-white/60 group-hover:text-white'} />
                    <span className={`text-[10px] font-bold uppercase ${isActive('/') ? 'text-ucl-accent' : 'text-white/60 group-hover:text-white'}`}>Home</span>
                </Link>

                <Link href="/matches" className="flex flex-col items-center gap-1 group">
                    <Calendar size={24} className={isActive('/matches') ? 'text-ucl-accent' : 'text-white/60 group-hover:text-white'} />
                    <span className={`text-[10px] font-bold uppercase ${isActive('/matches') ? 'text-ucl-accent' : 'text-white/60 group-hover:text-white'}`}>Matches</span>
                </Link>

                <Link href="/live" className="flex flex-col items-center gap-1 -mt-8">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-ucl-midnight shadow-xl transition-transform active:scale-95 ${isActive('/live') ? 'bg-white text-ucl-blue' : 'bg-ucl-blue text-white'}`}>
                        <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-white/80 mt-1">Live</span>
                </Link>

                <Link href="/table" className="flex flex-col items-center gap-1 group">
                    <Trophy size={24} className={isActive('/table') ? 'text-ucl-accent' : 'text-white/60 group-hover:text-white'} />
                    <span className={`text-[10px] font-bold uppercase ${isActive('/table') ? 'text-ucl-accent' : 'text-white/60 group-hover:text-white'}`}>Table</span>
                </Link>

                <button className="flex flex-col items-center gap-1 group">
                    <MoreHorizontal size={24} className="text-white/60 group-hover:text-white" />
                    <span className="text-[10px] font-bold uppercase text-white/60 group-hover:text-white">More</span>
                </button>
            </div>
        </nav>
    );
}
