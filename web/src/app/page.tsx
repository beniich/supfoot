'use client';

import Link from 'next/link';
import Image from 'next/image';
import BottomNav from '@/components/BottomNav';

export default function DashboardPage() {
    return (
        <div className="min-h-screen pb-24 bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased">
            {/* Top AppBar */}
            <header className="sticky top-0 z-40 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-black/5 dark:border-white/5 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        <Image src="/logo.svg" alt="FootballHub Logo" fill className="object-contain" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">FootballHub<span className="text-primary">+</span></h1>
                </div>
                <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl">notifications</span>
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></span>
                </button>
            </header>

            {/* Main Content */}
            <main className="flex flex-col w-full">
                {/* Live Matches Section */}
                <section className="mt-4">
                    <div className="px-4 mb-3 flex items-center justify-between">
                        <h2 className="text-lg font-bold">Live Matches</h2>
                        <button className="text-sm text-primary font-medium hover:opacity-80">See All</button>
                    </div>
                    <div className="flex overflow-x-auto no-scrollbar gap-4 px-4 pb-4 snap-x">
                        {/* Match Card 1 */}
                        <div className="min-w-[280px] snap-center bg-surface-dark border border-white/5 rounded-2xl p-4 shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-3">
                                <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-full px-2 py-0.5">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Live</span>
                                </div>
                            </div>
                            <div className="text-xs text-white/40 font-medium mb-4 uppercase tracking-wide">Botola Pro • 78&apos;</div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="relative w-12 h-12 rounded-full bg-white/10 p-2 flex items-center justify-center border border-white/5" title="Raja CA">
                                        <Image
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsCcxwHbA-W9401vq2sLt_-Mvut42eu_OHgxoHK_LkWYjgzWAB7PO15DZBpD3qSfmNIJrfHTmCC9E1nx2jGuBd1xCq8c82o1wreHscpuYaZE7V51CdgYVAG096WV1w0Z99g8WqI6xUmBJlL2kymB_4ZOpa82k17Q6weop4ynx81M6NpOA8T3Ag0d286VWEebUic6Nut9t-VluWhwS6oJ3GwZfhpPS73rB3a82InNQcCX7WnteyP_sHd22ZLOkK4ND2RDrFcDBXbWM"
                                            alt="Raja CA team logo badge"
                                            fill
                                            className="object-contain p-2 opacity-80"
                                        />
                                    </div>
                                    <span className="text-sm font-semibold text-center">Raja CA</span>
                                </div>
                                <div className="flex flex-col items-center px-4">
                                    <div className="text-3xl font-bold text-primary tabular-nums tracking-tighter">2 - 1</div>
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="relative w-12 h-12 rounded-full bg-white/10 p-2 flex items-center justify-center border border-white/5" title="Wydad AC">
                                        <Image
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD51OqMXHufEUdKwXCEFId94m_UCWrTgsvXjt-ytN9-7irMMRln233qKwqwLh2rvS52_CJD1yDZOf-1gdwWS-mgddrOuAcyKHeR_NZNFVAJjXla1RaaEZewfZA9kBGFYQGw9Pm9dy1UmSL8yvHEWpNGDQ4wMqybOcuB12FBqa79-L8x0Etsb_VPAviIi5hPstWb3Aeg72p1J6BhZzLcPpryUr-9YN9M9zNiqU3Sb5LOi2AlYZzoPJB9hWC22tW5qvWqLgpqGofcTMk"
                                            alt="Wydad AC team logo badge"
                                            fill
                                            className="object-contain p-2 opacity-80"
                                        />
                                    </div>
                                    <span className="text-sm font-semibold text-center">Wydad AC</span>
                                </div>
                            </div>
                        </div>

                        {/* Match Card 2 */}
                        <div className="min-w-[280px] snap-center bg-surface-dark border border-white/5 rounded-2xl p-4 shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-3">
                                <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-full px-2 py-0.5">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Live</span>
                                </div>
                            </div>
                            <div className="text-xs text-white/40 font-medium mb-4 uppercase tracking-wide">Premier League • 12&apos;</div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="relative w-12 h-12 rounded-full bg-white/10 p-2 flex items-center justify-center border border-white/5" title="Man City">
                                        <Image
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFQla9FAUHcpxYdq0vrAVNSCubh6CyJTMXPtuLFf4xih_sOjvO8IZIWqVUsYkwaPSDg4EaRW9z38AITUzzGF60cKbmPMcX57Bok3aL49jjvUOyVBvdbDI_PsRVPuNLRvFPsEph4AIXl8AV49HRYhrT-Obj0H5EbLD8BCr69ceBNJIqnxo2kMjSYMgC8gVgzhnMz7_RbiGPMsLsZ1TFCfkh9_eFe25r04_z97dWjEEU-CTexsR0tlwsIR8t0DsQL5XwmmnVinqujj0"
                                            alt="Manchester City team logo badge"
                                            fill
                                            className="object-contain p-2 opacity-80"
                                        />
                                    </div>
                                    <span className="text-sm font-semibold text-center">Man City</span>
                                </div>
                                <div className="flex flex-col items-center px-4">
                                    <div className="text-3xl font-bold text-white tabular-nums tracking-tighter">0 - 0</div>
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="relative w-12 h-12 rounded-full bg-white/10 p-2 flex items-center justify-center border border-white/5" title="Liverpool">
                                        <Image
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUW7PO_s-OaMo2JC6roYAbAtgHQ7T_eay60Iej5C21LbecMp8SwoWuy0rT-DFdWUnbPIem2ugNjYy884nZA-HlMgCqcf1cy0msG5djf9qkDp-L0mD07cmqQ8qDeB8rZN5wBYiWNoGKUQ8sL4_wwFJwejNM13LDyuGdClIkvuyl9qhZH6bf3nrh3kyxvzDoSniPBnyJUQIcXEesZK50fuxyl7krgDbsbNV1AFwmfEFDW2IFnPcAZPLD-l1kt7J9LWNYnT2mplgB5jE"
                                            alt="Liverpool FC team logo badge"
                                            fill
                                            className="object-contain p-2 opacity-80"
                                        />
                                    </div>
                                    <span className="text-sm font-semibold text-center">Liverpool</span>
                                </div>
                            </div>
                        </div>

                        {/* Match Card 3 (Upcoming) */}
                        <div className="min-w-[280px] snap-center bg-surface-dark border border-white/5 rounded-2xl p-4 shadow-lg relative overflow-hidden group opacity-80">
                            <div className="absolute top-0 right-0 p-3">
                                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
                                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">20:45</span>
                                </div>
                            </div>
                            <div className="text-xs text-white/40 font-medium mb-4 uppercase tracking-wide">Serie A</div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-12 h-12 rounded-full bg-white/10 p-2 flex items-center justify-center border border-white/5">
                                        <div className="w-8 h-8 rounded-full bg-blue-900/50"></div>
                                    </div>
                                    <span className="text-sm font-semibold text-center">Inter</span>
                                </div>
                                <div className="flex flex-col items-center px-4">
                                    <div className="text-xl font-medium text-white/30 tracking-tight">VS</div>
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-12 h-12 rounded-full bg-white/10 p-2 flex items-center justify-center border border-white/5">
                                        <div className="w-8 h-8 rounded-full bg-red-900/50"></div>
                                    </div>
                                    <span className="text-sm font-semibold text-center">Milan</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Actions Grid */}
                <section className="mt-2">
                    <h3 className="text-lg font-bold px-4 mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3 px-4">
                        <Link href="/tickets">
                            <div className="relative flex flex-col justify-between p-4 h-32 rounded-2xl bg-surface-dark border border-white/5 hover:border-primary/50 active:scale-95 transition-all group overflow-hidden cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                    <span className="material-symbols-outlined">confirmation_number</span>
                                </div>
                                <div className="text-left z-10">
                                    <span className="block text-base font-bold leading-tight">Buy Tickets</span>
                                </div>
                            </div>
                        </Link>
                        <Link href="/shop">
                            <div className="relative flex flex-col justify-between p-4 h-32 rounded-2xl bg-surface-dark border border-white/5 hover:border-primary/50 active:scale-95 transition-all group overflow-hidden cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                    <span className="material-symbols-outlined">shopping_bag</span>
                                </div>
                                <div className="text-left z-10">
                                    <span className="block text-base font-bold leading-tight">Shop Store</span>
                                </div>
                            </div>
                        </Link>
                        <Link href="/fantasy">
                            <div className="relative flex flex-col justify-between p-4 h-32 rounded-2xl bg-surface-dark border border-white/5 hover:border-primary/50 active:scale-95 transition-all group overflow-hidden cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                    <span className="material-symbols-outlined">emoji_events</span>
                                </div>
                                <div className="text-left z-10">
                                    <span className="block text-base font-bold leading-tight">Fantasy</span>
                                </div>
                            </div>
                        </Link>
                        <Link href="/community/thread">
                            <div className="relative flex flex-col justify-between p-4 h-32 rounded-2xl bg-surface-dark border border-white/5 hover:border-primary/50 hover:shadow-glow-sm active:scale-95 transition-all group overflow-hidden cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 shadow-glow-sm">
                                    <span className="material-symbols-outlined filled">forum</span>
                                </div>
                                <div className="text-left z-10">
                                    <span className="block text-base font-black uppercase tracking-tighter italic">Community</span>
                                    <span className="text-[10px] text-primary/70 font-black uppercase tracking-widest">Active Discussions</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>

                {/* Featured News */}
                <section className="mt-6 mb-4">
                    <h3 className="text-lg font-bold px-4 mb-3">Trending News</h3>
                    <div className="flex flex-col gap-4 px-4">
                        {/* News Item 1 */}
                        <article className="relative h-56 w-full rounded-2xl overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtkCxfhAnjRnWdFToMUXGnkMePw56xZxHgsZxadhNauHs3QfgMCwrjSamBpkEDdVTdhKYdy_QAcmwtDMViSmC1Z_dl9HMamQol8xsjveBkZ9ohesngAiEc-DXY9U9fbZLhgPkFGk1MtbZ0zbH6RU0ZCayAySltt8AV8DQNNGfcED6DRas__az9XpZ-GEbKlxyIMpauqOtrcHTbwBtkm3ymvY4NVD_VsXsrEb7PwY_4aa_lHIOMR4yVmGOIudII5jQ0SAyaDeF-EL4"
                                    alt="Mbappé Hat-trick"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4 w-full">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-primary text-background-dark text-[10px] font-bold px-2 py-0.5 rounded uppercase">Breaking</span>
                                    <span className="text-xs text-gray-300">2h ago</span>
                                </div>
                                <h4 className="text-xl font-bold leading-tight text-white mb-1">Mbappé&apos;s Hat-trick Secures Historic Victory in Paris</h4>
                                <p className="text-sm text-gray-300 line-clamp-1">The French superstar continues his incredible form this season.</p>
                            </div>
                        </article>
                        {/* News Item 2 */}
                        <article className="relative h-56 w-full rounded-2xl overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRLpS2Ew-GRoN4aZZLPfkiR-JZzW1uMmGxmls6rVA6JgHmnAehEZ6wnqU-ulPSe7KEs8SZD53QHwOSOWJWZMgjNm8Y2qVnU0Xd7UhH3Ip39ZU3axagwAXO5uP2hu3xI9k4r_tRv2A6kostVKDqQTMioaOmFYdLCSxGhySR_Gv-TPwVGid7UNbgeaYsm9s8kfiAgFzhfmu10HcB3T8N45Akj69pYDal8MF-XfYe4BxIX_AtggtZSnXSGzadffNN6AHEJ2Jegi4qvAA"
                                    alt="Transfer Market News"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4 w-full">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-white/10 text-white border border-white/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase backdrop-blur-sm">Transfer Market</span>
                                    <span className="text-xs text-gray-300">4h ago</span>
                                </div>
                                <h4 className="text-xl font-bold leading-tight text-white mb-1">Summer Transfer Window: Top 10 Moves to Watch</h4>
                            </div>
                        </article>
                    </div>
                </section>
            </main>

            <BottomNav />
        </div>
    );
}
