'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BottomNavProps {
    activeTab?: string;
}

export default function BottomNav({ activeTab }: BottomNavProps) {
    const pathname = usePathname();

    const navItems = [
        { id: 'home', label: 'Home', icon: 'home', href: '/' },
        { id: 'matches', label: 'Matches', icon: 'sports_soccer', href: '/matches' },
        { id: 'news', label: 'Media', icon: 'play_circle', href: '/news' },
        { id: 'shop', label: 'Shop', icon: 'local_mall', href: '/shop' },
        { id: 'profile', label: 'Profile', icon: 'person', href: '/profile' },
    ];


    const isActive = (href: string) => {
        if (activeTab) {
            return navItems.find(item => item.href === href)?.id === activeTab;
        }
        return pathname === href;
    };

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-black/5 dark:border-white/5 pb-safe z-50">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link key={item.id} href={item.href} className="w-full">
                            <button
                                className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${active
                                    ? 'text-primary'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary'
                                    }`}
                            >
                                <span
                                    className={`material-symbols-outlined ${active ? 'filled' : ''}`}
                                    style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                                >
                                    {item.icon}
                                </span>
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </button>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
