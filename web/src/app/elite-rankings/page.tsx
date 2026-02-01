'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function EliteRankingsPage() {
    const [selectedLeague, setSelectedLeague] = useState('La Liga');
    const [activeCategory, setActiveCategory] = useState('Scorers');

    const leagues = ['La Liga', 'Premier League', 'Serie A', 'Ligue 1', 'Botola Pro'];
    const categories = ['Scorers', 'Assists', 'Clean Sheets', 'Discpline'];

    const mockData = {
        'Scorers': [
            { id: 1, name: 'Robert Lewandowski', team: 'FC Barcelona', value: 14, image: 'RL' },
            { id: 2, name: 'Kylian Mbappé', team: 'Real Madrid', value: 12, image: 'KM' },
            { id: 3, name: 'Raphinha', team: 'FC Barcelona', value: 9, image: 'R' },
            { id: 4, name: 'Vinícius Júnior', team: 'Real Madrid', value: 8, image: 'VJ' },
            { id: 5, name: 'Ayoze Pérez', team: 'Villarreal', value: 7, image: 'AP' },
        ],
        'Assists': [
            { id: 1, name: 'Lamine Yamal', team: 'FC Barcelona', value: 10, image: 'LY' },
            { id: 2, name: 'Álex Baena', team: 'Villarreal', value: 8, image: 'AB' },
            { id: 3, name: 'Raphinha', team: 'FC Barcelona', value: 7, image: 'R' },
            { id: 4, name: 'Óscar Mingueza', team: 'Celta Vigo', value: 5, image: 'OM' },
            { id: 5, name: 'James Rodríguez', team: 'Rayo Vallecano', value: 4, image: 'JR' },
        ]
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-white font-display antialiased pb-24 selection:bg-primary selection:text-black">
            {/* Header */}
            <header className="p-6 bg-gradient-to-br from-surface-dark to-black border-b border-white/5">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="size-10 rounded-2xl bg-primary flex items-center justify-center text-black shadow-glow">
                            <span className="material-symbols-outlined font-black">leaderboard</span>
                        </div>
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter">Elite <span className="text-primary">Rankings</span></h1>
                    </div>

                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                        {leagues.map(league => (
                            <button
                                key={league}
                                onClick={() => setSelectedLeague(league)}
                                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${selectedLeague === league ? 'bg-primary text-black shadow-glow-sm' : 'bg-white/5 text-gray-400 border border-white/5'}`}
                            >
                                {league}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-md mx-auto px-6 pt-8 space-y-8">
                {/* Category Selector */}
                <div className="flex bg-surface-dark p-1 rounded-2xl border border-white/5">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeCategory === cat ? 'bg-white/10 text-primary shadow-inner' : 'text-gray-500 hover:text-white'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Top 1 Focused Card */}
                {mockData[activeCategory as keyof typeof mockData] && (
                    <div className="relative bg-gradient-to-br from-primary to-yellow-600 rounded-[32px] p-1 shadow-glow-sm group">
                        <div className="bg-black rounded-[31px] p-6 flex items-center gap-6 overflow-hidden relative">
                            {/* Decorative Background */}
                            <div className="absolute -right-4 -bottom-4 text-[120px] font-black italic text-white/5 pointer-events-none">#1</div>

                            <div className="size-24 rounded-2xl bg-surface-dark border-2 border-primary/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                                <span className="material-symbols-outlined text-5xl text-gray-600">person</span>
                            </div>

                            <div className="flex-1 relative z-10">
                                <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-1 italic">Leader</p>
                                <h2 className="text-xl font-black uppercase italic tracking-tighter leading-none mb-1">{mockData[activeCategory as keyof typeof mockData][0].name}</h2>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">{mockData[activeCategory as keyof typeof mockData][0].team}</p>
                                <div className="inline-flex items-center gap-2 bg-primary px-3 py-1 rounded-lg">
                                    <span className="text-black font-black text-lg">{mockData[activeCategory as keyof typeof mockData][0].value}</span>
                                    <span className="text-black/60 text-[10px] font-black uppercase tracking-widest">{activeCategory.slice(0, -1)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Rankings List */}
                <div className="space-y-4">
                    {mockData[activeCategory as keyof typeof mockData]?.slice(1).map((item, index) => (
                        <div key={item.id} className="flex items-center gap-4 bg-surface-dark/40 border border-white/5 p-4 rounded-2xl hover:bg-white/5 transition-all">
                            <span className="text-gray-600 font-black text-lg italic w-6">#{index + 2}</span>
                            <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center text-[10px] font-black text-gray-400">
                                {item.image}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-black uppercase tracking-tight text-white">{item.name}</h4>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.team}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-xl font-black text-primary">{item.value}</span>
                                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{activeCategory.slice(0, 1)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tactical Insight Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 border-l-4 border-l-primary">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-primary text-xl">insights</span>
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-white">Elite Analysis</h5>
                    </div>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed">
                        The current race for the <span className="text-primary">Golden Boot</span> in {selectedLeague} is dominated by high-efficiency strikers. Average goals per game is up by 12% compared to last season.
                    </p>
                </div>
            </main>

            <BottomNav activeTab="matches" />
        </div>
    );
}
