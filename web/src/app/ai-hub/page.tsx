'use client';

import React from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function AIHubPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-32 min-h-screen">
            {/* Top App Bar */}
            <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-primary/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button className="flex items-center justify-center text-slate-900 dark:text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold tracking-tight leading-none uppercase">FootballHub<span className="text-primary">+</span></h1>
                        <span className="text-[10px] font-bold text-primary tracking-widest uppercase">AI Predictions</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center justify-center size-10 rounded-full bg-surface-dark/50 text-white hover:bg-surface-dark transition-colors">
                        <span className="material-symbols-outlined text-primary">notifications</span>
                    </button>
                    <Link href="/profile" className="size-9 rounded-full bg-gradient-to-tr from-primary to-orange-400 overflow-hidden border-2 border-primary/20">
                        <img
                            alt="User Profile"
                            className="w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100"
                        />
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex flex-col gap-8 p-4 max-w-md mx-auto">
                {/* Hero: Featured Match Analysis */}
                <section className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold tracking-wide uppercase">Featured Analysis</h2>
                        <span className="text-[10px] font-bold text-white/50 bg-white/5 px-2 py-1 rounded-full border border-white/5 uppercase tracking-widest">Live Odds</span>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl bg-surface-dark border border-white/5 p-6 shadow-2xl">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="flex justify-between items-center mb-8">
                            <TeamBadge shortName="MC" name="Man City" color="bg-blue-500" />
                            <div className="text-center flex flex-col items-center">
                                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-2">19:45 GMT</span>
                                <div className="text-xl font-bold font-mono bg-black/40 px-4 py-1.5 rounded-lg text-primary border border-primary/20 shadow-glow-sm">VS</div>
                            </div>
                            <TeamBadge shortName="ARS" name="Arsenal" color="bg-red-500" />
                        </div>

                        {/* Win Probability Gauge */}
                        <div className="flex flex-col items-center justify-center relative py-4">
                            <div className="relative size-52">
                                <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                                    <circle className="text-white/5 stroke-current" cx="50" cy="50" fill="none" r="42" strokeWidth="10"></circle>
                                    <circle className="text-primary stroke-current drop-shadow-[0_0_12px_rgba(242,204,13,0.5)]" cx="50" cy="50" fill="none" r="42" strokeDasharray="118 264" strokeDashoffset="0" strokeLinecap="round" strokeWidth="10"></circle>
                                    <circle className="text-white/20 stroke-current" cx="50" cy="50" fill="none" r="42" strokeDasharray="52 264" strokeDashoffset="-123" strokeLinecap="round" strokeWidth="10"></circle>
                                    <circle className="text-white/50 stroke-current" cx="50" cy="50" fill="none" r="42" strokeDasharray="92 264" strokeDashoffset="-180" strokeLinecap="round" strokeWidth="10"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] mb-1">Win chance</span>
                                    <span className="text-5xl font-bold text-primary neon-text tracking-tighter">45%</span>
                                    <div className="flex items-center gap-1 mt-2 px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20">
                                        <span className="material-symbols-outlined text-[12px] text-primary filled">verified</span>
                                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Elite AI</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center gap-6 mt-8 w-full">
                                <LegendItem label="City" color="bg-primary" />
                                <LegendItem label="Draw" color="bg-white/20" />
                                <LegendItem label="Arsenal" color="bg-white/50" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Smart Insights */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold tracking-wide uppercase flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary neon-text">auto_awesome</span>
                        Smart Insights
                    </h2>
                    <div className="bg-gradient-to-br from-surface-dark to-background-dark border border-primary/20 rounded-2xl p-6 relative overflow-hidden group shadow-xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                        <div className="flex flex-col gap-6">
                            <InsightItem
                                icon="warning"
                                color="text-yellow-500"
                                bg="bg-yellow-500/10"
                                text="Haaland is doubtful (Ankle) for the upcoming fixture. City's xG drops by 0.8 without him."
                            />
                            <div className="w-full h-px bg-white/5"></div>
                            <InsightItem
                                icon="trending_up"
                                color="text-green-500"
                                bg="bg-green-500/10"
                                text="Arsenal is unbeaten in their last 5 away games, averaging 2.1 goals per match."
                            />
                        </div>
                        <div className="mt-6 pt-4 flex justify-end">
                            <button className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-all">
                                FULL REPORT <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Upcoming Recommendations */}
                <section className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold tracking-wide uppercase">Top Recommendations</h2>
                        <button className="text-primary text-xs font-bold uppercase tracking-widest">See All</button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <PredictionCard
                            home="Liverpool"
                            away="Chelsea"
                            homeColor="bg-red-800"
                            awayColor="bg-blue-700"
                            score="3 - 1"
                            prob={85}
                            confidence="High"
                        />
                        <PredictionCard
                            home="Real Madrid"
                            away="Barcelona"
                            homeColor="bg-slate-200"
                            awayColor="bg-red-600"
                            score="2 - 2"
                            prob={60}
                            confidence="Medium"
                        />
                    </div>
                </section>

                {/* Pro CTA */}
                <div className="mt-4 p-6 rounded-2xl relative overflow-hidden bg-cover bg-center shadow-2xl"
                    style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000&auto=format&fit=crop')" }}>
                    <div className="relative z-10 flex flex-col gap-3 items-start">
                        <span className="bg-primary text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Pro Feature</span>
                        <h3 className="text-xl font-bold text-white tracking-tight">Unlock Deep Player Stats</h3>
                        <p className="text-sm text-white/70 max-w-[85%] leading-relaxed">Get advanced xG models, movement heatmaps, and AI-predicted player ratings.</p>
                        <button className="mt-4 bg-primary text-black px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-glow">
                            Upgrade to Pro
                        </button>
                    </div>
                </div>
            </main>

            <BottomNav activeTab="ai-hub" />
        </div>
    );
}

function TeamBadge({ shortName, name, color }: { shortName: string, name: string, color: string }) {
    return (
        <div className="text-center w-1/3">
            <div className={`w-14 h-14 mx-auto ${color} rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-3 shadow-xl transform group-hover:scale-110 transition-all`}>
                {shortName}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/80">{name}</p>
        </div>
    );
}

function LegendItem({ label, color }: { label: string, color: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className={`size-2.5 rounded-full ${color} ${color.includes('primary') ? 'shadow-glow-sm' : ''}`}></div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">{label}</span>
        </div>
    );
}

function InsightItem({ icon, color, bg, text }: { icon: string, color: string, bg: string, text: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className={`mt-1 ${bg} ${color} p-2 rounded-xl border border-white/5`}>
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
            </div>
            <p className="text-white/90 font-medium text-sm leading-relaxed">{text}</p>
        </div>
    );
}

function PredictionCard({ home, away, homeColor, awayColor, score, prob, confidence }: {
    home: string, away: string, homeColor: string, awayColor: string, score: string, prob: number, confidence: string
}) {
    return (
        <div className="bg-surface-dark rounded-2xl p-5 border border-white/5 hover:border-primary/30 transition-all shadow-lg group cursor-pointer">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Tomorrow, 20:00</span>
                    <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded-full border border-white/10 text-white/50 font-bold uppercase tracking-widest">PL</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/5 rounded-full border border-primary/10">
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${confidence === 'High' ? 'text-primary' : 'text-yellow-600'}`}>
                        {confidence} Confidence
                    </span>
                    <span className={`material-symbols-outlined text-[14px] ${confidence === 'High' ? 'text-primary filled' : 'text-yellow-600'}`}>
                        {confidence === 'High' ? 'verified' : 'info'}
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-3 flex-1 min-w-0">
                    <TeamRow name={home} color={homeColor} />
                    <TeamRow name={away} color={awayColor} />
                </div>
                <div className="flex flex-col items-end pl-6 border-l border-white/5 ml-4">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Projected</span>
                    <div className="text-3xl font-bold font-mono text-primary neon-text tracking-tighter">{score}</div>
                    <div className="w-20 bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden border border-white/5">
                        <div
                            className={`h-full ${prob > 70 ? 'bg-primary shadow-glow-sm' : 'bg-yellow-600'}`}
                            style={{ width: `${prob}%` }}
                        ></div>
                    </div>
                    <span className={`text-[10px] font-bold mt-2 uppercase tracking-widest ${prob > 70 ? 'text-primary' : 'text-yellow-600'}`}>
                        {prob}% Prob
                    </span>
                </div>
            </div>
        </div>
    );
}

function TeamRow({ name, color }: { name: string, color: string }) {
    return (
        <div className="flex items-center gap-3 group-hover:translate-x-1 transition-all">
            <div className={`size-7 rounded-lg ${color} flex items-center justify-center text-[10px] font-black border border-white/10 shadow-lg`}>
                {name.substring(0, 3).toUpperCase()}
            </div>
            <span className="font-bold text-sm truncate uppercase tracking-tight">{name}</span>
        </div>
    );
}
