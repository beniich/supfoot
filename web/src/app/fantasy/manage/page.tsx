'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ManageSquadPage() {
    const [formation, setFormation] = useState('4-4-2');

    return (
        <div className="bg-background-light dark:bg-[#181711] text-white font-display overflow-hidden min-h-screen flex flex-col selection:bg-primary selection:text-black">
            <div className="relative flex flex-col h-screen w-full max-w-md mx-auto bg-[#181711] shadow-2xl overflow-hidden">

                {/* Top Bar */}
                <header className="z-30 flex items-center justify-between px-4 py-4 bg-[#181711] border-b border-white/5 shadow-xl">
                    <div className="flex flex-col">
                        <h2 className="text-white text-lg font-black leading-tight tracking-tight uppercase">Manage Squad</h2>
                        <span className="text-[#bab59c] text-[10px] font-bold uppercase tracking-widest">
                            GW34 Deadline: <span className="text-primary">Fri 18:30</span>
                        </span>
                    </div>
                    <button className="bg-primary hover:scale-105 active:scale-95 text-background-dark px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-glow">
                        Save Team
                    </button>
                </header>

                {/* Stats Strip */}
                <div className="z-20 bg-[#23221b] px-4 py-3 flex justify-between items-center border-b border-white/5 shadow-inner">
                    <StatItem label="Bank" value="£2.5m" />
                    <div className="h-6 w-px bg-white/5"></div>
                    <StatItem label="Free Transfers" value="1" highlight />
                    <div className="h-6 w-px bg-white/5"></div>
                    <StatItem label="Total Pts" value="1,240" />
                </div>

                {/* Main Content Area: The Pitch */}
                <main className="flex-1 relative w-full overflow-hidden flex flex-col">
                    {/* Pitch Background & Markings */}
                    <div className="absolute inset-0 z-0">
                        <PitchVisuals />
                    </div>

                    {/* Formation Toggle (Floating) */}
                    <div className="relative z-10 w-full flex justify-center pt-6">
                        <div className="flex bg-black/40 backdrop-blur-xl p-1 rounded-2xl border border-white/10 shadow-2xl">
                            {['4-4-2', '3-5-2', '4-3-3'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFormation(f)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${formation === f ? 'bg-primary text-background-dark shadow-glow-sm' : 'text-white/40 hover:text-white'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Players on Pitch */}
                    <div className="relative z-10 flex-1 flex flex-col justify-between py-6 px-4 pb-20">
                        {/* GK */}
                        <div className="flex justify-center w-full">
                            <PitchPlayer name="Ramsdale" cost="5.0" pts={45} image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100" color="border-yellow-500" />
                        </div>

                        {/* Defenders Line */}
                        <div className="flex justify-center items-end gap-2 w-full">
                            <PitchPlayer name="White" cost="5.5" hasAlert />
                            <PitchPlayer name="Saliba" cost="5.2" />
                            <PitchPlayer name="Gabriel" cost="5.1" />
                            <PitchPlayer name="Zinchenko" cost="5.0" />
                        </div>

                        {/* Midfielders Line */}
                        <div className="flex justify-center items-center gap-2 w-full">
                            <PitchPlayer name="Saka" cost="9.0" isCaptain color="border-primary shadow-glow-sm" />
                            <PitchPlayer name="Odegaard" cost="8.5" />
                            <PitchPlayer name="Rice" cost="7.0" />
                            <PitchPlayer name="Martinelli" cost="8.0" hasTrend />
                        </div>

                        {/* Forwards Line */}
                        <div className="flex justify-center items-start gap-8 w-full">
                            <PitchPlayer name="Jesus" cost="8.0" isViceCaptain />
                            <PitchPlayer name="Havertz" cost="7.5" />
                        </div>
                    </div>

                    {/* Substitutes Bottom Sheet Panel */}
                    <div className="relative z-20 w-full bg-[#181711]/95 backdrop-blur-2xl border-t border-white/10 rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex flex-col pb-6">
                        <div className="w-full flex justify-center py-3">
                            <div className="w-12 h-1.5 bg-white/10 rounded-full"></div>
                        </div>
                        <div className="px-6 pb-2 flex items-center justify-between mb-4">
                            <h3 className="text-white text-sm font-black uppercase tracking-tight">Bench</h3>
                            <span className="text-primary/50 text-[10px] font-bold uppercase tracking-widest">Tap to Swap</span>
                        </div>
                        <div className="flex gap-4 px-6 pb-4 overflow-x-auto no-scrollbar">
                            <BenchPlayer name="Turner" role="GK" opacity="opacity-50" />
                            <BenchPlayer name="Tomiyasu" role="DEF" />
                            <BenchPlayer name="Jorginho" role="MID" />
                            <BenchPlayer name="Nketiah" role="FWD" />
                        </div>
                    </div>
                </main>

                {/* Bottom Nav Mock (Simplified for manage page) */}
                <nav className="z-30 bg-[#0f0f0f] border-t border-white/5 px-6 pb-8 pt-3 flex justify-between items-center max-w-md mx-auto w-full">
                    <NavAction icon="home" label="Home" active={false} href="/" />
                    <NavAction icon="sports_soccer" label="Squad" active={true} href="/fantasy/manage" />
                    <NavAction icon="bar_chart" label="Stats" active={false} href="/fantasy" />
                    <NavAction icon="emoji_events" label="Leagues" active={false} href="/fantasy" />
                    <NavAction icon="person" label="Profile" active={false} href="/profile" />
                </nav>
            </div>
        </div>
    );
}

function StatItem({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-[#bab59c] text-[10px] uppercase tracking-widest font-black mb-1">{label}</span>
            <span className={`text-sm font-black ${highlight ? 'text-primary neon-text' : 'text-white'}`}>{value}</span>
        </div>
    );
}

function PitchVisuals() {
    return (
        <div className="absolute inset-0 bg-[#365c32] shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]">
            <div className="absolute inset-x-0 inset-y-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_40px,rgba(0,0,0,1)_40px,rgba(0,0,0,1)_80px)]"></div>
            {/* Markings */}
            <div className="absolute inset-4 border border-white/20 rounded-2xl pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/20 pointer-events-none"></div>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-52 h-20 border-b border-l border-r border-white/20 rounded-b-xl"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 h-20 border-t border-l border-r border-white/20 rounded-t-xl"></div>
        </div>
    );
}

function PitchPlayer({ name, cost, pts, image, color = "border-white/30", isCaptain = false, isViceCaptain = false, hasAlert = false, hasTrend = false }: {
    name: string, cost: string, pts?: number, image?: string, color?: string, isCaptain?: boolean, isViceCaptain?: boolean, hasAlert?: boolean, hasTrend?: boolean
}) {
    return (
        <div className="flex flex-col items-center gap-1 w-20 group cursor-pointer active:scale-95 transition-all">
            <div className="relative">
                <div
                    className={`w-14 h-14 rounded-full border-2 ${color} bg-surface-dark bg-cover bg-center shadow-2xl transition-all group-hover:scale-110 group-hover:shadow-glow-sm`}
                    style={image ? { backgroundImage: `url(${image})` } : {}}
                >
                    {!image && <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black opacity-20">{name.substring(0, 3).toUpperCase()}</span>}
                </div>
                {isCaptain && <div className="absolute -top-1.5 -left-1.5 bg-white text-black text-[8px] font-black size-5 flex items-center justify-center rounded-full border-2 border-gray-100 shadow-lg">C</div>}
                {isViceCaptain && <div className="absolute -top-1.5 -left-1.5 bg-gray-500 text-white text-[8px] font-black size-5 flex items-center justify-center rounded-full border-2 border-gray-300 shadow-lg">V</div>}
                {hasAlert && <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] size-4 flex items-center justify-center rounded-full font-black shadow-lg animate-pulse">!</div>}
                {hasTrend && <div className="absolute -top-1 -right-1 bg-primary text-black text-[10px] size-4 flex items-center justify-center rounded-full font-black shadow-lg">
                    <span className="material-symbols-outlined text-[10px] font-black">trending_up</span>
                </div>}
            </div>
            <div className="bg-[#0f0f0f]/90 backdrop-blur-md rounded-xl px-2 py-1.5 text-center w-full border border-white/10 shadow-xl group-hover:border-primary/40 transition-all">
                <p className="text-white text-[10px] font-black leading-none truncate uppercase tracking-tight">{name}</p>
                <p className="text-[#bab59c] text-[9px] font-bold mt-1 tracking-widest">£{cost} {pts && `| ${pts}`}</p>
            </div>
        </div>
    );
}

function BenchPlayer({ name, role, opacity = "opacity-100" }: { name: string, role: string, opacity?: string }) {
    return (
        <div className={`flex-shrink-0 flex flex-col items-center gap-2 w-16 group ${opacity}`}>
            <div className="w-12 h-12 rounded-full border-2 border-white/10 bg-surface-dark flex items-center justify-center shadow-lg group-hover:border-primary/50 transition-all">
                <span className="material-symbols-outlined text-white/20 select-none">person</span>
            </div>
            <div className="bg-[#23221b] rounded-lg px-2 py-1 w-full text-center border border-white/5 shadow-md">
                <p className="text-white text-[9px] font-black truncate uppercase tracking-tight">{name}</p>
                <p className="text-[#bab59c] text-[8px] font-bold uppercase tracking-widest mt-0.5">{role}</p>
            </div>
        </div>
    );
}

function NavAction({ icon, label, active, href }: { icon: string, label: string, active: boolean, href: string }) {
    return (
        <Link href={href} className="flex flex-col items-center gap-1 group">
            <span className={`material-symbols-outlined text-[26px] transition-all group-hover:-translate-y-1 ${active ? 'text-primary filled neon-text' : 'text-white/40 group-hover:text-white'}`} style={active ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {icon}
            </span>
            <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-primary' : 'text-white/30 group-hover:text-white'}`}>
                {label}
            </span>
        </Link>
    );
}
