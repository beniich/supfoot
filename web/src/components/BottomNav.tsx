'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Calendar, Play, Trophy, MoreHorizontal, X, User, Settings, ShoppingBag, Ticket, Heart, LogOut, Activity } from 'lucide-react';
import { useState } from 'react';

export default function BottomNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [showMoreMenu, setShowMoreMenu] = useState(false);

    const isActive = (href: string) => pathname === href;

    const moreMenuItems = [
        { icon: User, label: 'Profile', href: '/profile' },
        { icon: ShoppingBag, label: 'Shop', href: '/shop' },
        { icon: Ticket, label: 'Tickets', href: '/tickets' },
        { icon: Activity, label: 'Admin', href: '/admin' },
        { icon: Heart, label: 'Favorites', href: '/profile/favorites' },
        { icon: Settings, label: 'Settings', href: '/settings' },
    ];

    return (
        <>
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

                    <button
                        onClick={() => setShowMoreMenu(true)}
                        className="flex flex-col items-center gap-1 group"
                    >
                        <MoreHorizontal size={24} className="text-white/60 group-hover:text-white" />
                        <span className="text-[10px] font-bold uppercase text-white/60 group-hover:text-white">More</span>
                    </button>
                </div>
            </nav>

            {/* More Menu Modal */}
            {showMoreMenu && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-end"
                    onClick={() => setShowMoreMenu(false)}
                >
                    <div
                        className="w-full bg-ucl-midnight rounded-t-3xl p-6 pb-safe animate-slide-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">More Options</h3>
                            <button
                                onClick={() => setShowMoreMenu(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={24} className="text-white" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {moreMenuItems.map((item) => (
                                <button
                                    key={item.href}
                                    onClick={() => {
                                        router.push(item.href);
                                        setShowMoreMenu(false);
                                    }}
                                    className="flex flex-col items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                                >
                                    <item.icon size={28} className="text-ucl-accent" />
                                    <span className="text-sm font-bold text-white">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
