'use client';

import React from 'react';
import Link from 'next/link';

export default function WidgetsPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-white antialiased overflow-x-hidden min-h-screen relative">
            {/* Background Simulation */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl transform scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522770179533-24471fcdba45')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark/90 via-background-dark/95 to-background-dark"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Top App Bar */}
                <header className="flex items-center justify-between p-4 bg-transparent">
                    <div className="w-12"></div>
                    <h2 className="text-white text-lg font-black leading-tight tracking-tighter text-center uppercase italic">Widgets</h2>
                    <div className="flex w-12 items-center justify-end">
                        <Link href="/profile" className="text-primary hover:text-white transition-colors text-sm font-black uppercase tracking-widest">
                            Done
                        </Link>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 px-6 pb-12 flex flex-col gap-10">
                    {/* Headline */}
                    <div className="text-center pt-4">
                        <h1 className="text-3xl font-black tracking-tighter mb-3 text-white uppercase italic">Customize Your<br /><span className="text-primary">Home Screen</span></h1>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wide leading-relaxed max-w-xs mx-auto">Stay updated with real-time scores and stats without opening the app.</p>
                    </div>

                    {/* Widget Showcase */}
                    <div className="space-y-12">
                        {/* Small Widget */}
                        <section className="flex flex-col items-center">
                            <h3 className="text-[10px] font-black text-primary/80 mb-4 uppercase tracking-[0.2em]">Small Widget (Next Match)</h3>
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 w-[160px] h-[160px] rounded-[1.5rem] p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-primary/30 transition-colors">
                                <div className="absolute top-0 right-0 p-3 opacity-50">
                                    <span className="material-symbols-outlined text-lg">sports_soccer</span>
                                </div>
                                <div className="flex flex-col gap-1 mt-1">
                                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Next Match</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-white/10 bg-center bg-cover border border-white/10"></div>
                                        <span className="text-sm font-black uppercase">ARS</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-white/10 bg-center bg-cover border border-white/10"></div>
                                        <span className="text-sm font-black uppercase">LIV</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[9px] text-gray-400 mb-0.5 font-bold uppercase tracking-wide">Kickoff in</p>
                                    <p className="text-primary text-xl font-mono font-bold tracking-tight">02:15:30</p>
                                </div>
                            </div>
                        </section>

                        {/* Medium Widget */}
                        <section className="flex flex-col items-center w-full">
                            <h3 className="text-[10px] font-black text-primary/80 mb-4 uppercase tracking-[0.2em]">Medium Widget (Live Score)</h3>
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-[340px] h-[160px] rounded-[1.5rem] p-5 flex flex-col justify-center shadow-2xl relative overflow-hidden hover:border-primary/30 transition-colors">
                                {/* Header Line */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-wide text-white/90">Live • 64&apos;</span>
                                    </div>
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">La Liga</span>
                                </div>
                                {/* Match Content */}
                                <div className="flex items-center justify-between px-2">
                                    <div className="flex flex-col items-center gap-2 w-1/3">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 bg-center bg-cover shadow-lg"></div>
                                        <span className="text-sm font-black uppercase tracking-tight">RMA</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center w-1/3">
                                        <span className="text-4xl font-black text-primary tracking-tighter drop-shadow-glow">2 - 0</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 w-1/3">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 bg-center bg-cover shadow-lg"></div>
                                        <span className="text-sm font-black uppercase tracking-tight">BAR</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Large Widget */}
                        <section className="flex flex-col items-center w-full">
                            <h3 className="text-[10px] font-black text-primary/80 mb-4 uppercase tracking-[0.2em]">Large Widget (Match Center)</h3>
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 w-[340px] h-[340px] rounded-[1.5rem] p-6 flex flex-col shadow-2xl relative overflow-hidden hover:border-primary/30 transition-colors">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h4 className="text-sm font-black text-white uppercase italic tracking-tight">Premier League</h4>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Matchday 12</p>
                                    </div>
                                    <div className="bg-white/10 px-2 py-1 rounded-lg text-[10px] font-black uppercase text-primary tracking-wide">
                                        Full Time
                                    </div>
                                </div>
                                {/* Score Section */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 bg-center bg-cover"></div>
                                        <span className="text-3xl font-black text-white">3</span>
                                    </div>
                                    <span className="text-gray-600 font-mono text-sm uppercase tracking-widest">FT</span>
                                    <div className="flex items-center gap-3 flex-row-reverse">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 bg-center bg-cover"></div>
                                        <span className="text-3xl font-black text-gray-400">1</span>
                                    </div>
                                </div>
                                {/* Stats Section */}
                                <div className="flex-1 flex flex-col justify-end gap-5">
                                    {/* Possession */}
                                    <div>
                                        <div className="flex justify-between text-[10px] mb-2 font-black uppercase tracking-wide">
                                            <span className="text-primary">65%</span>
                                            <span className="text-gray-400">Possession</span>
                                            <span className="text-gray-300">35%</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
                                            <div className="h-full bg-primary w-[65%] shadow-glow-sm"></div>
                                            <div className="h-full bg-gray-600 w-[35%]"></div>
                                        </div>
                                    </div>
                                    {/* Last Event */}
                                    <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3 border border-white/5">
                                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-sm">sports_soccer</span>
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-wide">Latest Goal</p>
                                            <p className="text-xs font-bold text-white uppercase tracking-tight">Haaland <span className="text-primary font-normal">78&apos;</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* CTA Section */}
                    <div className="pt-4 pb-8">
                        <button className="w-full bg-primary hover:bg-yellow-400 transition-colors text-background-dark text-lg font-black py-4 rounded-2xl shadow-glow flex items-center justify-center gap-2 group uppercase tracking-tight italic">
                            <span>How to Add Widgets</span>
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform font-bold">arrow_forward</span>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
