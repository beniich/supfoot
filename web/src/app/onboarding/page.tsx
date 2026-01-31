'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface League {
    id: string;
    name: string;
    country: string;
    logo: string;
}

interface Team {
    id: string;
    name: string;
    logo: string;
}

export default function OnboardingPage() {
    const [selectedLeagues, setSelectedLeagues] = useState<string[]>(['pl']);
    const [selectedTeams, setSelectedTeams] = useState<string[]>(['wydad']);

    const popularLeagues: League[] = [
        { id: 'pl', name: 'Premier League', country: 'England', logo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100' },
        { id: 'botola', name: 'Botola Pro', country: 'Morocco', logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=100' },
        { id: 'laliga', name: 'La Liga', country: 'Spain', logo: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=100' },
        { id: 'seriea', name: 'Serie A', country: 'Italy', logo: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=100' }
    ];

    const popularTeams: Team[] = [
        { id: 'raja', name: 'Raja CA', logo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100' },
        { id: 'wydad', name: 'Wydad AC', logo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100' },
        { id: 'berkane', name: 'RS Berkane', logo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100' },
        { id: 'mancity', name: 'Man City', logo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100' },
        { id: 'realmadrid', name: 'Real Madrid', logo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100' }
    ];

    const toggleLeague = (id: string) => {
        setSelectedLeagues(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
    };

    const toggleTeam = (id: string) => {
        setSelectedTeams(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col overflow-hidden text-[#111] dark:text-white antialiased">
            {/* Header & Progress */}
            <header className="px-5 pt-6 pb-2 flex items-center justify-between shrink-0 bg-background-light dark:bg-background-dark z-10 transition-colors">
                <div className="flex flex-row items-center gap-2">
                    <div className="h-1.5 w-8 rounded-full bg-primary/40"></div>
                    <div className="h-1.5 w-8 rounded-full bg-primary shadow-glow-sm"></div>
                    <div className="h-1.5 w-8 rounded-full bg-gray-300 dark:bg-white/10"></div>
                    <div className="h-1.5 w-8 rounded-full bg-gray-300 dark:bg-white/10"></div>
                </div>
                <Link href="/" className="text-sm font-black text-gray-500 dark:text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">
                    Skip
                </Link>
            </header>

            {/* Scrollable Content */}
            <main className="flex-1 overflow-y-auto no-scrollbar pb-32 px-5">
                <div className="py-6">
                    <h1 className="text-3xl font-black leading-tight tracking-tight mb-2 text-gray-900 dark:text-white uppercase italic">
                        Personalize<br />Your Feed
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-tight">
                        Follow your favorite leagues and clubs to never miss a match.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="sticky top-0 z-30 pt-2 pb-6 bg-background-light dark:bg-background-dark/95 backdrop-blur-md">
                    <label className="relative flex w-full group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input
                            className="block w-full h-14 pl-12 pr-4 text-sm font-bold uppercase tracking-widest rounded-2xl border-none bg-white dark:bg-surface-dark text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 shadow-sm transition-all"
                            placeholder="Find your tribe..."
                            type="text"
                        />
                    </label>
                </div>

                {/* Popular Leagues */}
                <div className="mt-2">
                    <h2 className="text-lg font-black mb-5 flex items-center gap-2 text-gray-800 dark:text-gray-100 uppercase tracking-tight">
                        <span className="material-symbols-outlined text-primary text-[24px] filled">trophy</span>
                        Popular Leagues
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {popularLeagues.map((league) => (
                            <button
                                key={league.id}
                                onClick={() => toggleLeague(league.id)}
                                className={`relative flex items-center gap-3 p-4 rounded-2xl transition-all transform active:scale-[0.98] border-2 shadow-xl ${selectedLeagues.includes(league.id)
                                        ? 'bg-primary/5 border-primary shadow-glow-sm'
                                        : 'bg-white dark:bg-surface-dark border-transparent hover:border-white/10'
                                    }`}
                            >
                                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center overflow-hidden shrink-0 border border-white/5">
                                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${league.logo})` }}></div>
                                </div>
                                <div className="text-left flex-1 min-w-0">
                                    <p className={`font-black text-xs truncate uppercase tracking-tight ${selectedLeagues.includes(league.id) ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>{league.name}</p>
                                    <p className="text-[9px] text-gray-500 dark:text-gray-400 uppercase font-black tracking-widest mt-0.5">{league.country}</p>
                                </div>
                                {selectedLeagues.includes(league.id) && (
                                    <div className="absolute -top-2 -right-2 text-background-dark bg-primary rounded-full size-5 flex items-center justify-center shadow-glow-sm animate-in zoom-in duration-200">
                                        <span className="material-symbols-outlined text-[14px] font-black">check</span>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Popular Teams */}
                <div className="mt-10">
                    <h2 className="text-lg font-black mb-5 flex items-center gap-2 text-gray-800 dark:text-gray-100 uppercase tracking-tight">
                        <span className="material-symbols-outlined text-primary text-[24px] filled">groups</span>
                        Popular Teams
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        {popularTeams.map((team) => (
                            <button
                                key={team.id}
                                onClick={() => toggleTeam(team.id)}
                                className={`group flex flex-col items-center gap-3 p-4 rounded-2xl transition-all transform active:scale-[0.95] border-2 shadow-xl ${selectedTeams.includes(team.id)
                                        ? 'bg-primary/5 border-primary shadow-glow-sm'
                                        : 'bg-white dark:bg-surface-dark border-transparent hover:border-white/10'
                                    }`}
                            >
                                <div className="relative w-16 h-16 rounded-full p-1 bg-white/5 border border-white/10 shadow-lg flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${team.logo})` }}></div>
                                    {selectedTeams.includes(team.id) && (
                                        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-2xl filled drop-shadow-lg">check_circle</span>
                                        </div>
                                    )}
                                </div>
                                <p className={`font-black text-[10px] truncate w-full text-center uppercase tracking-tight ${selectedTeams.includes(team.id) ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>{team.name}</p>
                            </button>
                        ))}
                        <button className="group flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all aspect-square shadow-xl">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-primary transition-colors border border-white/10">
                                <span className="material-symbols-outlined text-[24px]">add</span>
                            </div>
                            <p className="font-black text-[10px] text-white/20 group-hover:text-primary transition-colors uppercase tracking-widest">See All</p>
                        </button>
                    </div>
                </div>
            </main>

            {/* Sticky Footer */}
            <footer className="fixed bottom-0 left-0 right-0 w-full px-5 py-6 bg-background-light/95 dark:bg-background-dark/95 border-t border-gray-200 dark:border-white/10 z-40 backdrop-blur-xl pb-10">
                <div className="max-w-md mx-auto">
                    <Link href="/">
                        <button className="w-full h-16 bg-primary text-background-dark font-black rounded-2xl text-lg shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-between px-8 uppercase tracking-tighter italic">
                            <span>Ready for Kickoff</span>
                            <span className="material-symbols-outlined text-[24px] font-black">arrow_forward</span>
                        </button>
                    </Link>
                </div>
            </footer>
        </div>
    );
}
