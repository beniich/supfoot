'use client';

import React from 'react';
import Link from 'next/link';

export default function LiveMatchPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-white antialiased overflow-hidden h-screen flex flex-col">
            {/* Status Bar / Header Area */}
            <header className="pt-12 pb-2 px-4 flex items-center justify-between z-20 relative bg-gradient-to-b from-black/80 to-transparent">
                <Link href="/matches" className="flex items-center justify-center size-10 rounded-full bg-surface-dark/50 backdrop-blur-md text-white hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-0.5">Botola Pro</span>
                    <h1 className="text-white text-lg font-black uppercase italic tracking-tighter">Casablanca Derby</h1>
                </div>
                <button className="flex items-center justify-center size-10 rounded-full bg-surface-dark/50 backdrop-blur-md text-white hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            </header>

            {/* Main Scrollable Content */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden pb-24 no-scrollbar relative z-10">
                {/* Background decorative blur */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

                {/* 1. Live Scoreboard Widget */}
                <section className="px-4 pt-2 pb-6">
                    <div className="bg-surface-dark border border-white/5 rounded-[2rem] p-5 shadow-2xl relative overflow-hidden">
                        {/* Live Indicator */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
                            <div className="size-2 bg-red-500 rounded-full live-pulse"></div>
                            <span className="text-white text-[10px] font-black tracking-widest uppercase">LIVE</span>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            {/* Home Team */}
                            <div className="flex flex-col items-center flex-1">
                                <div className="size-16 rounded-2xl bg-white/10 p-3 mb-3 border border-white/5 shadow-inner">
                                    <div className="w-full h-full bg-green-900 rounded-xl flex items-center justify-center text-green-400 font-black text-xs">RCA</div>
                                </div>
                                <h2 className="text-white font-black text-lg leading-tight text-center uppercase tracking-tight">Raja CA</h2>
                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wide mt-1">Home</span>
                            </div>

                            {/* Score & Time */}
                            <div className="flex flex-col items-center px-4">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-5xl font-black text-primary drop-shadow-glow">2</span>
                                    <span className="text-gray-500 text-2xl font-light">-</span>
                                    <span className="text-5xl font-black text-white">1</span>
                                </div>
                                <div className="bg-primary/20 text-primary px-3 py-1 rounded-lg border border-primary/20">
                                    <span className="font-mono font-bold text-sm tracking-widest">88:02</span>
                                </div>
                                <span className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-wide">+5 min added</span>
                            </div>

                            {/* Away Team */}
                            <div className="flex flex-col items-center flex-1">
                                <div className="size-16 rounded-2xl bg-white/10 p-3 mb-3 border border-white/5 shadow-inner">
                                    <div className="w-full h-full bg-red-900 rounded-xl flex items-center justify-center text-red-400 font-black text-xs">WAC</div>
                                </div>
                                <h2 className="text-white font-black text-lg leading-tight text-center uppercase tracking-tight">Wydad AC</h2>
                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wide mt-1">Away</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Win Probability (Dynamic Widget) */}
                <section className="px-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white text-sm font-black uppercase italic tracking-tight flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">analytics</span>
                            Live Probability
                        </h3>
                    </div>
                    <div className="bg-surface-dark rounded-[1.5rem] p-4 border border-white/5 shadow-sm">
                        <div className="flex justify-between text-[10px] text-gray-400 mb-2 font-black uppercase tracking-widest">
                            <span>Raja 75%</span>
                            <span>Draw 15%</span>
                            <span>Wydad 10%</span>
                        </div>
                        <div className="flex w-full h-3 rounded-full overflow-hidden bg-white/5">
                            <div className="bg-primary h-full transition-all duration-1000 ease-out shadow-glow" style={{ width: '75%' }}></div>
                            <div className="bg-gray-500 h-full transition-all duration-1000 ease-out" style={{ width: '15%' }}></div>
                            <div className="bg-red-600 h-full transition-all duration-1000 ease-out" style={{ width: '10%' }}></div>
                        </div>
                        <p className="text-[9px] text-gray-500 mt-3 text-center font-bold uppercase tracking-wide">Powered by FootballHub+ AI • Updated real-time</p>
                    </div>
                </section>

                {/* 3. Key Events Ticker */}
                <section className="px-4 mb-6">
                    <h3 className="text-white text-sm font-black uppercase italic tracking-tight mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">flash_on</span>
                        Key Events
                    </h3>
                    <div className="space-y-2">
                        <EventItem time="87'" icon="style" color="text-yellow-400" bgColor="bg-yellow-400/20" borderColor="border-yellow-400/40" title="Yellow Card" desc="A. El Hassouni (Wydad)" pulse />
                        <EventItem time="82'" icon="sports_soccer" color="text-green-500" bgColor="bg-green-500/20" borderColor="border-green-500/40" title="GOAL!" desc="N. Zerhouni (Raja) • Assist by Bouzok" opacity="opacity-80" />
                        <EventItem time="65'" icon="sync_alt" color="text-blue-400" bgColor="bg-blue-500/20" borderColor="border-blue-500/40" title="Substitution" desc="Out: H. Ahadad, In: Z. Habti" opacity="opacity-60" />
                    </div>
                </section>

                {/* 4. Fan Sentiment Poll */}
                <section className="px-4 mb-8">
                    <h3 className="text-white text-sm font-black uppercase italic tracking-tight mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">how_to_vote</span>
                        Fan Sentiment
                    </h3>
                    <div className="bg-gradient-to-br from-surface-dark to-black border border-white/10 rounded-[1.5rem] p-5">
                        <p className="text-white text-center text-xs font-black uppercase tracking-wide mb-4">Who scores next?</p>
                        <div className="flex gap-3">
                            <PollOption label="Raja" percent="60" colorClass="green" />
                            <PollOption label="Wydad" percent="25" colorClass="red" />
                            <PollOption label="None" percent="15" colorClass="gray" />
                        </div>
                    </div>
                </section>
            </main>

            {/* 5. Floating Quick Access Bar */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full px-6 max-w-sm">
                <div className="bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 flex justify-between items-center">
                    <ActionButton icon="forum" label="Live Chat" />
                    <div className="w-[1px] h-8 bg-white/10"></div>
                    <ActionButton icon="stadium" label="Lineups" />
                    <div className="w-[1px] h-8 bg-white/10"></div>
                    <ActionButton icon="auto_awesome" label="AI Insights" primary hasBadge />
                </div>
            </div>
        </div>
    );
}

function EventItem({ time, icon, color, bgColor, borderColor, title, desc, pulse, opacity = '' }: any) {
    return (
        <div className={`flex items-center gap-3 bg-surface-dark border border-white/5 p-3 rounded-2xl ${pulse ? 'animate-pulse border-primary/20' : ''} ${opacity}`}>
            <div className="flex-shrink-0 w-10 text-right font-mono text-gray-400 font-bold text-sm block">{time}</div>
            <div className={`size-8 rounded-full ${bgColor} flex items-center justify-center border ${borderColor}`}>
                <span className={`material-symbols-outlined ${color} text-sm`}>{icon}</span>
            </div>
            <div className="flex-1">
                <p className="text-white text-sm font-black uppercase tracking-tight">{title}</p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">{desc}</p>
            </div>
        </div>
    );
}

function PollOption({ label, percent, colorClass }: { label: string, percent: string, colorClass: 'green' | 'red' | 'gray' }) {
    const colors = {
        green: { bg: 'bg-green-900/30', hover: 'hover:bg-green-900/50', border: 'border-green-500/30', barBg: 'bg-green-900/50', barFill: 'bg-green-500', text: 'text-green-400' },
        red: { bg: 'bg-red-900/30', hover: 'hover:bg-red-900/50', border: 'border-red-500/30', barBg: 'bg-red-900/50', barFill: 'bg-red-500', text: 'text-red-400' },
        gray: { bg: 'bg-gray-800/30', hover: 'hover:bg-gray-800/50', border: 'border-gray-600/30', barBg: 'bg-gray-700/50', barFill: 'bg-gray-400', text: 'text-gray-400' }
    };
    const c = colors[colorClass];

    return (
        <button className={`flex-1 ${c.bg} ${c.hover} border ${c.border} py-3 rounded-xl flex flex-col items-center gap-1 transition-all active:scale-95 group`}>
            <span className={`text-white font-black text-xs uppercase tracking-tight`}>{label}</span>
            <div className={`w-full px-2 h-1 ${c.barBg} rounded-full mt-1 overflow-hidden`}>
                <div className={`${c.barFill} h-full`} style={{ width: `${percent}%` }}></div>
            </div>
            <span className={`text-[10px] ${c.text} mt-1 font-mono font-bold`}>{percent}%</span>
        </button>
    );
}

function ActionButton({ icon, label, primary, hasBadge }: { icon: string, label: string, primary?: boolean, hasBadge?: boolean }) {
    return (
        <button className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-xl transition-all ${primary ? 'text-primary bg-primary/10 hover:bg-primary/20 relative' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <span className={`material-symbols-outlined text-2xl ${primary ? 'filled' : ''}`}>{icon}</span>
            <span className="text-[9px] font-black uppercase tracking-wide">{label}</span>
            {hasBadge && <span className="absolute top-1 right-3 size-2 bg-red-500 rounded-full border border-[#1a1a1a] shadow-glow-sm"></span>}
        </button>
    );
}
