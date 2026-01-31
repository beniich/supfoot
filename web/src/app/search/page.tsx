'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Matches', 'Players', 'Teams', 'Products', 'News'];

    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-black min-h-screen">
            <div className="relative flex flex-col max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark min-h-screen pb-32">

                {/* Header with Search Bar */}
                <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-white/5 pb-2">
                    <div className="h-12 w-full"></div>

                    {/* Search Bar */}
                    <div className="px-4 pb-2">
                        <div className="flex items-center gap-3">
                            <label className="relative flex flex-1 items-center">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                                    <span className="material-symbols-outlined text-2xl">search</span>
                                </div>
                                <input
                                    className="block w-full rounded-xl border-none bg-gray-200 dark:bg-white/10 py-3 pl-10 pr-4 text-base placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface-dark transition-all shadow-sm"
                                    placeholder="Search players, matches, gear..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                        onClick={() => setSearchQuery('')}
                                    >
                                        <span className="material-symbols-outlined text-xl">cancel</span>
                                    </button>
                                )}
                            </label>
                            <Link href="/" className="text-base font-medium text-slate-600 dark:text-primary whitespace-nowrap active:opacity-70 transition-opacity">
                                Cancel
                            </Link>
                        </div>
                    </div>

                    {/* Filter Chips */}
                    <div className="mt-2">
                        <div className="flex overflow-x-auto gap-3 px-4 pb-2 no-scrollbar scroll-smooth">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`flex shrink-0 items-center justify-center rounded-full px-5 py-2 transition-transform active:scale-95 ${activeFilter === filter
                                            ? 'bg-primary shadow-glow-sm'
                                            : 'bg-gray-200 dark:bg-white/10'
                                        }`}
                                >
                                    <span className={`text-sm font-semibold ${activeFilter === filter ? 'text-background-dark' : 'text-slate-600 dark:text-gray-300'
                                        }`}>{filter}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                <main className="w-full flex-1">
                    {/* Recent Searches */}
                    <section className="mt-6 px-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-black uppercase italic tracking-tight text-slate-900 dark:text-white">Recent Searches</h3>
                            <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Clear</button>
                        </div>
                        <div className="flex flex-col gap-1">
                            <RecentSearchItem icon="schedule" text="Mbappé stats" />
                            <RecentSearchItem icon="schedule" text="PSG vs Dortmund" />
                            <RecentSearchItem icon="schedule" text="Nike Mercurial 2024" />
                        </div>
                    </section>

                    <div className="my-6 h-px w-full bg-gray-200 dark:bg-white/10"></div>

                    {/* Trending Now */}
                    <section className="px-4">
                        <h3 className="text-lg font-black uppercase italic tracking-tight text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-2xl">trending_up</span>
                            Trending Now
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <TrendingCard icon="emoji_events" iconColor="text-primary" bgColor="bg-primary/20" category="Competition" title="Champions League Final" />
                            <TrendingCard icon="shopping_bag" iconColor="text-blue-400" bgColor="bg-blue-500/20" category="Product" title="Hakimi Jersey" />

                            <div className="col-span-2 flex items-center justify-between overflow-hidden rounded-2xl bg-white dark:bg-white/5 p-3 border border-gray-200 dark:border-white/5 active:scale-[0.98] transition-all group hover:border-primary/20">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg"></div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-wide">Top Player</p>
                                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Erling Haaland</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-green-500 gap-1 text-xs font-black bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/20">
                                    <span className="material-symbols-outlined text-sm">arrow_upward</span>
                                    12%
                                </div>
                            </div>
                        </div>

                        {/* Tags Cloud */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            <TagButton tag="#TransferNews" />
                            <TagButton tag="#ElClasico" />
                            <TagButton tag="#PremierLeague" />
                            <TagButton tag="#FantasyFootball" />
                        </div>
                    </section>

                    {/* Suggested Teams */}
                    <section className="mt-8 px-4 pb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-black uppercase italic tracking-tight text-slate-900 dark:text-white">Suggested Teams</h3>
                            <Link href="#" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">See All</Link>
                        </div>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
                            <TeamCard name="Real Madrid" abbr="RMA" gradient="from-slate-800 to-slate-600" verified />
                            <TeamCard name="Man City" abbr="MCI" gradient="from-sky-400 to-sky-600" />
                            <TeamCard name="Barcelona" abbr="FCB" gradient="from-red-600 to-blue-800" />
                            <TeamCard name="Arsenal" abbr="ARS" gradient="from-red-500 to-red-700" />
                        </div>
                    </section>
                </main>

                <BottomNav activeTab="home" />
            </div>
        </div>
    );
}

function RecentSearchItem({ icon, text }: { icon: string, text: string }) {
    return (
        <div className="group flex items-center justify-between py-3 px-3 -mx-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 active:bg-gray-200 dark:active:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-center gap-4 overflow-hidden">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined text-xl">{icon}</span>
                </div>
                <p className="text-base font-bold text-slate-700 dark:text-gray-200 truncate uppercase tracking-tight">{text}</p>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-lg">close</span>
            </button>
        </div>
    );
}

function TrendingCard({ icon, iconColor, bgColor, category, title }: { icon: string, iconColor: string, bgColor: string, category: string, title: string }) {
    return (
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-white/5 p-3 border border-gray-200 dark:border-white/5 active:scale-[0.98] transition-all hover:border-primary/20">
            <div className="mb-2 flex items-start justify-between">
                <div className={`rounded-xl ${bgColor} p-1.5 border border-white/10`}>
                    <span className={`material-symbols-outlined ${iconColor} text-sm block`}>{icon}</span>
                </div>
            </div>
            <div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-wide mb-1">{category}</p>
                <p className="text-sm font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">{title}</p>
            </div>
        </div>
    );
}

function TagButton({ tag }: { tag: string }) {
    return (
        <button className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-black text-slate-600 dark:text-gray-300 hover:border-primary/50 transition-colors uppercase tracking-tight">
            {tag}
        </button>
    );
}

function TeamCard({ name, abbr, gradient, verified = false }: { name: string, abbr: string, gradient: string, verified?: boolean }) {
    return (
        <div className="flex flex-col items-center gap-2 min-w-[80px]">
            <div className={`relative h-16 w-16 rounded-2xl bg-gradient-to-tr ${gradient} p-0.5 shadow-lg`}>
                <div className="h-full w-full rounded-2xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                    <span className="text-xs font-black text-white uppercase tracking-tight">{abbr}</span>
                </div>
                {verified && (
                    <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-primary border-2 border-background-dark shadow-glow-sm"></div>
                )}
            </div>
            <span className="text-[10px] font-bold text-center truncate w-full dark:text-gray-300 uppercase tracking-tight">{name}</span>
        </div>
    );
}
