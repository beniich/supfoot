// src/components/shared/SubNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

export default function SubNav() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="bg-ucl-midnight text-white/80 text-[13px] font-semibold py-2 px-4 flex gap-6 overflow-x-auto no-scrollbar border-b border-white/10">
            <Link
                href="/matches"
                className={`whitespace-nowrap hover:text-white transition-colors ${isActive('/matches') ? 'text-white border-b-2 border-ucl-accent pb-1' : ''}`}
            >
                Matches
            </Link>
            <Link
                href="/table"
                className={`whitespace-nowrap hover:text-white transition-colors ${isActive('/table') ? 'text-white border-b-2 border-ucl-accent pb-1' : ''}`}
            >
                Table
            </Link>
            <Link
                href="/news"
                className={`whitespace-nowrap hover:text-white transition-colors ${isActive('/news') ? 'text-white border-b-2 border-ucl-accent pb-1' : ''}`}
            >
                News
            </Link>
            <Link href="#" className="whitespace-nowrap hover:text-white transition-colors">
                UEFA.tv
            </Link>
            <Link href="#" className="whitespace-nowrap hover:text-white transition-colors">
                Draws
            </Link>
            <button className="flex items-center gap-1 whitespace-nowrap hover:text-white transition-colors">
                Gaming <ChevronDown size={12} />
            </button>
            <button className="flex items-center gap-1 whitespace-nowrap hover:text-white transition-colors">
                Stats <ChevronDown size={12} />
            </button>
        </nav>
    );
}
