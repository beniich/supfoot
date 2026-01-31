'use client';

import React from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function FantasyPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white min-h-screen flex flex-col overflow-x-hidden pb-32">
            {/* Header */}
            <header className="sticky top-0 z-40 flex items-center justify-between p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div
                            className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-primary/50"
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100")' }}
                        ></div>
                        <div className="absolute -bottom-1 -right-1 bg-primary text-background-dark text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-glow-sm">PRO</div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-black tracking-tight leading-none uppercase">FootballHub<span className="text-primary">+</span></h1>
                        <span className="text-[10px] font-bold text-primary tracking-widest uppercase mt-0.5">Fantasy League</span>
                    </div>
                </div>
                <button className="relative p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl text-white">notifications</span>
                    <span className="absolute top-1.5 right-1.5 size-2.5 bg-red-500 rounded-full border-2 border-background-dark"></span>
                </button>
            </header>

            {/* Performance HUD */}
            <section className="px-4 py-8 max-w-md mx-auto w-full">
                <div className="grid grid-cols-3 gap-4">
                    <Link href="/profile/membership" className="block"><HUDCard label="Overall Points" value="1,245" color="text-primary" /></Link>
                    <Link href="/fantasy" className="block"><HUDCard label="Global Rank" value="#45k" highlight /></Link>
                    <Link href="/ai-hub" className="block"><HUDCard label="GW 14 Stats" value="Live" icon="arrow_upward" iconColor="text-green-400" /></Link>
                </div>
            </section>

            {/* My Team Section */}
            <section className="px-4 mb-10 max-w-md mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black tracking-tight uppercase">Squad Highlight</h2>
                    <Link href="/fantasy/manage" className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">Manage Team</Link>
                </div>

                {/* AI Insight Chip */}
                <div className="flex mb-6">
                    <Link href="/ai-hub" className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-primary/10 border border-primary/20 shadow-glow-sm hover:scale-[1.02] transition-all">
                        <span className="material-symbols-outlined text-primary text-base filled">auto_awesome</span>
                        <p className="text-xs font-bold text-primary-light tracking-tight">AI Insight: Haaland is a risk this week (Ankle)</p>
                    </Link>
                </div>

                {/* Pitch Visualizer (Simplified) */}
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                    <PitchBackground />

                    {/* Players (4-4-2 Formation) */}
                    <div className="relative h-full flex flex-col justify-between py-8 z-10">
                        {/* Goalkeeper */}
                        <div className="flex justify-center">
                            <PlayerNode name="Raya" role="GK" points={6} color="bg-yellow-600" />
                        </div>

                        {/* Defenders */}
                        <div className="flex justify-center gap-4">
                            <PlayerNode name="White" role="DEF" points={2} color="bg-red-600" />
                            <PlayerNode name="Saliba" role="DEF" isAIPick color="bg-blue-600" />
                            <PlayerNode name="Dias" role="DEF" points={8} color="bg-sky-600" />
                            <PlayerNode name="Trent" role="DEF" color="bg-red-600" />
                        </div>

                        {/* Midfielders */}
                        <div className="flex justify-center gap-4">
                            <PlayerNode name="Salah" role="MID" points={12} color="bg-red-700" />
                            <PlayerNode name="Saka" role="MID" isCaptain color="bg-white" />
                            <PlayerNode name="Palmer" role="MID" color="bg-blue-800" />
                            <PlayerNode name="Bruno" role="MID" color="bg-black" />
                        </div>

                        {/* Forwards */}
                        <div className="flex justify-center gap-12">
                            <PlayerNode name="Haaland" role="FWD" isViceCaptain points={2} color="bg-sky-300" />
                            <PlayerNode name="Watkins" role="FWD" points={5} color="bg-purple-700" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Leagues Leaderboard */}
            <section className="px-4 mb-8 max-w-md mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black tracking-tight uppercase">Leagues</h2>
                    <div className="flex bg-surface-dark rounded-xl p-1 border border-white/10 shadow-lg">
                        <button className="px-4 py-1.5 rounded-lg text-xs font-bold bg-primary text-background-dark shadow-glow-sm uppercase">Private</button>
                        <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-white/40 hover:text-white uppercase">Global</button>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <LeagueItem rank={1} name="Office Legends" manager="Sarah K." points={1302} trend="up" trendVal={12} isFirst />
                    <LeagueItem rank={2} name="Sunday League Pro" manager="Mike R." points={1288} trend="down" trendVal={4} />
                    <LeagueItem rank={3} name="FootballHub FC" manager="You" points={1245} trend="up" trendVal={24} isUser />
                </div>
            </section>

            {/* Floating Transfer Bar & Bottom Nav */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-background-dark/90 backdrop-blur-xl border-t border-white/5 pb-8 pt-4">
                <div className="max-w-md mx-auto px-4">
                    {/* Transfer Market CTA */}
                    <div className="px-0 -mt-10 mb-4">
                        <Link href="/fantasy/manage">
                            <button className="w-full bg-primary hover:scale-[1.02] active:scale-[0.98] text-background-dark font-black text-xl h-16 rounded-2xl shadow-glow flex items-center justify-between px-6 transition-all">
                                <div className="flex flex-col items-start translate-y-0.5">
                                    <span className="leading-none uppercase tracking-tighter">Transfer Market</span>
                                    <span className="text-[10px] opacity-80 font-bold mt-1 uppercase tracking-widest">Next Deadline: Fri, 18:30</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-mono bg-black/10 px-3 py-1.5 rounded-xl border border-black/5 font-bold">02:14:35</span>
                                    <span className="material-symbols-outlined font-black">arrow_forward</span>
                                </div>
                            </button>
                        </Link>
                    </div>
                    {/* Tab Bar handled by BottomNav */}
                </div>
            </div>

            <BottomNav activeTab="matches" />
        </div>
    );
}

function HUDCard({ label, value, color = "text-white", highlight = false, icon = "", iconColor = "" }: {
    label: string, value: string, color?: string, highlight?: boolean, icon?: string, iconColor?: string
}) {
    return (
        <div className={`flex flex-col items-center justify-center p-5 rounded-2xl bg-surface-dark border border-white/5 shadow-xl relative overflow-hidden transition-all hover:border-primary/30 group`}>
            {highlight && <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>}
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mb-2 group-hover:text-primary transition-colors">{label}</span>
            <div className="flex items-center gap-1.5">
                <span className={`text-2xl font-black ${color} tracking-tight`}>{value}</span>
                {icon && <span className={`material-symbols-outlined text-lg font-black ${iconColor}`}>{icon}</span>}
            </div>
        </div>
    );
}

function PitchBackground() {
    return (
        <div className="absolute inset-0 bg-gradient-to-b from-green-900 to-green-950 opacity-95">
            {/* Pitch Markings */}
            <div className="absolute inset-6 border-2 border-white/10 rounded-2xl"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-20 border-b-2 border-l-2 border-r-2 border-white/10 rounded-b-2xl"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-20 border-t-2 border-l-2 border-r-2 border-white/10 rounded-t-2xl"></div>
            <div className="absolute top-1/2 left-0 right-0 border-t-2 border-white/10 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-24 rounded-full border-2 border-white/10"></div>
        </div>
    );
}

function PlayerNode({ name, role, points, color, isCaptain = false, isViceCaptain = false, isAIPick = false }: {
    name: string, role: string, points?: number, color: string, isCaptain?: boolean, isViceCaptain?: boolean, isAIPick?: boolean
}) {
    return (
        <div className="flex flex-col items-center gap-2 group">
            <div className={`relative size-11 ${color} rounded-full flex items-center justify-center shadow-xl border-2 border-white/30 transform group-hover:scale-110 transition-all`}>
                <span className={`text-[10px] font-black ${color === 'bg-white' ? 'text-black' : 'text-white'}`}>{role}</span>
                {points !== undefined && (
                    <div className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-lg border border-black/5">
                        {points}
                    </div>
                )}
                {isCaptain && (
                    <div className="absolute -bottom-1 -right-1 bg-black text-primary text-[9px] font-black size-5 flex items-center justify-center rounded-full border-2 border-primary shadow-glow-sm">C</div>
                )}
                {isViceCaptain && (
                    <div className="absolute -bottom-1 -right-1 bg-gray-500 text-white text-[9px] font-black size-5 flex items-center justify-center rounded-full border border-white">V</div>
                )}
                {isAIPick && (
                    <div className="absolute -left-2 top-0 bg-primary text-black text-[8px] font-black px-1.5 py-0.5 rounded border border-black/20 shadow-glow-sm uppercase">AI</div>
                )}
            </div>
            <div className="bg-black/60 px-3 py-1 rounded-lg text-[10px] font-bold backdrop-blur-md text-white border border-white/10 shadow-lg truncate max-w-[70px]">
                {name}
            </div>
        </div>
    );
}

function LeagueItem({ rank, name, manager, points, trend, trendVal, isFirst = false, isUser = false }: {
    rank: number, name: string, manager: string, points: number, trend: 'up' | 'down', trendVal: number, isFirst?: boolean, isUser?: boolean
}) {
    return (
        <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${isUser ? 'bg-primary/5 border-primary/30 shadow-glow-sm relative overflow-hidden' : 'bg-surface-dark border-white/5 shadow-lg'}`}>
            {isUser && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
            <div className="flex flex-col items-center w-8">
                {isFirst ? (
                    <span className="material-symbols-outlined text-primary text-2xl filled neon-text">military_tech</span>
                ) : (
                    <span className={`font-black text-sm ${isUser ? 'text-white' : 'text-white/30'}`}>{rank}</span>
                )}
            </div>
            <div className="flex-1">
                <p className={`text-sm font-black ${isUser ? 'text-white' : 'text-white/90'} tracking-tight`}>
                    {name}
                    {isUser && <span className="ml-2 text-[8px] bg-primary text-background-dark px-1.5 py-0.5 rounded-md font-black uppercase">Me</span>}
                </p>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Manager: {manager}</p>
            </div>
            <div className="text-right">
                <p className={`text-base font-black ${isUser ? 'text-primary neon-text' : 'text-white'} leading-none`}>{points.toLocaleString()}</p>
                <p className={`text-[9px] font-black mt-1 flex items-center justify-end gap-0.5 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {trend === 'up' ? '▲' : '▼'} {trendVal}
                </p>
            </div>
        </div>
    );
}
