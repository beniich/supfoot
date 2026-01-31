'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-sans antialiased selection:bg-primary selection:text-background-dark min-h-screen">
            <div className="relative flex flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark min-h-screen pb-10">
                {/* TopAppBar */}
                <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-primary/10">
                    <Link href="/profile" className="flex items-center justify-center size-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-900 dark:text-white text-2xl">arrow_back</span>
                    </Link>
                    <h1 className="text-slate-900 dark:text-white text-lg font-black leading-tight tracking-tighter flex-1 text-center uppercase">
                        About Hub<span className="text-primary">+</span>
                    </h1>
                    <div className="flex w-10 items-center justify-end">
                        <span className="material-symbols-outlined text-primary filled scale-110">stars</span>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="px-4 py-6">
                    <div className="relative flex flex-col justify-end overflow-hidden bg-background-dark min-h-[480px] rounded-3xl w-full shadow-2xl group">
                        {/* Background Image */}
                        <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000&auto=format&fit=crop')" }}></div>
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent"></div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col p-8 gap-3">
                            <span className="inline-block px-4 py-1.5 mb-2 text-[10px] font-black tracking-[0.2em] text-background-dark uppercase bg-primary rounded-xl w-fit shadow-glow">
                                EST. 2020
                            </span>
                            <h2 className="text-primary tracking-tighter text-4xl font-black leading-[1] uppercase italic">
                                Elevating<br />The Beautiful<br />Game
                            </h2>
                            <p className="text-white/80 text-sm font-bold mt-2 max-w-xs leading-relaxed uppercase tracking-tight">
                                Merging elite AI technology with the passion of football to empower clubs worldwide.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Our Journey (Timeline) */}
                <section className="px-6 mt-6">
                    <h2 className="text-[24px] font-black leading-tight tracking-tight mb-8 uppercase italic italic">Our Journey</h2>
                    <div className="grid grid-cols-[40px_1fr] gap-x-4">
                        <TimelineItem
                            year="2020"
                            title="The Kickoff"
                            desc="Beta launch with 50 local clubs in Morocco, gathering core performance data."
                            icon="flag"
                            active
                        />
                        <TimelineItem
                            year="2021"
                            title="Data Mastery"
                            desc="Official data provider for the National Youth League. Expansion into AI analytics."
                            icon="handshake"
                        />
                        <TimelineItem
                            year="2023"
                            title="Global Arena"
                            desc="Opening offices in London and Dubai to serve our growing international user base."
                            icon="public"
                            last
                        />
                    </div>
                </section>

                {/* Our Core Values */}
                <section className="mt-12 px-6">
                    <div className="mb-8">
                        <h2 className="text-[24px] font-black leading-tight tracking-tight uppercase italic">Core Values</h2>
                        <p className="text-[10px] text-gray-500 dark:text-[#bab59c] font-black uppercase tracking-widest mt-2">The fuel behind our innovation engine.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <ValueCard icon="lightbulb" title="Innovation" desc="Constantly pushing the boundaries of what data can reveal about the game." />
                        <ValueCard icon="diversity_3" title="Community" desc="Building a global network of coaches, players, and passionate fans." />
                        <ValueCard icon="military_tech" title="Excellence" desc="Delivering premium quality in every pixel and every tactical data point." />
                    </div>
                </section>

                {/* Team Carousel */}
                <section className="mt-16 px-6">
                    <div className="mb-8 flex justify-between items-end">
                        <h2 className="text-[24px] font-black leading-tight tracking-tight uppercase italic">The Leadership</h2>
                        <div className="flex gap-2">
                            <button className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                            </button>
                            <button className="size-10 rounded-xl bg-primary text-black flex items-center justify-center shadow-glow transition-all">
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex overflow-x-auto pb-10 gap-6 snap-x no-scrollbar">
                        <TeamCard name="Marcus Thorne" role="CEO & FOUNDER" />
                        <TeamCard name="Sarah Jenkins" role="CHIEF DATA OFFICER" />
                        <TeamCard name="David Rossi" role="HEAD OF PARTNERSHIPS" />
                    </div>
                </section>

                {/* Footer / CTA */}
                <section className="px-6 pb-12">
                    <div className="rounded-3xl bg-gradient-to-br from-primary to-[#d4b50b] p-10 text-center relative overflow-hidden shadow-glow">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 size-40 bg-white/10 rounded-full blur-3xl"></div>
                        <h2 className="text-background-dark text-3xl font-black mb-4 relative z-10 tracking-tighter uppercase italic">Ready to Lead?</h2>
                        <p className="text-background-dark/80 mb-8 font-bold text-sm relative z-10 uppercase tracking-tight">Join the platform redefining modern football management.</p>
                        <button className="relative z-10 w-full bg-background-dark text-white font-black py-5 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs">
                            Contact Sales
                        </button>
                    </div>
                    <p className="text-center text-[10px] font-black text-white/20 mt-10 uppercase tracking-[0.5em]">© 2024 FootballHub+</p>
                </section>
            </div>
        </div>
    );
}

function TimelineItem({ year, title, desc, icon, active = false, last = false }: {
    year: string, title: string, desc: string, icon: string, active?: boolean, last?: boolean
}) {
    return (
        <>
            <div className="flex flex-col items-center gap-2">
                <div className={`flex items-center justify-center size-10 rounded-xl border-2 transition-all shadow-lg ${active ? 'bg-primary border-primary text-black shadow-glow' : 'bg-surface-dark border-white/10 text-white/30'}`}>
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </div>
                {!last && <div className="w-1 bg-gradient-to-b from-white/10 to-transparent h-full min-h-[80px] rounded-full"></div>}
            </div>
            <div className={`flex flex-1 flex-col pb-12 pl-2 transition-opacity ${active ? 'opacity-100' : 'opacity-40'}`}>
                <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">{year}</span>
                <h3 className="text-white text-lg font-black uppercase tracking-tight italic">{title}</h3>
                <p className="text-gray-500 dark:text-[#bab59c] text-sm font-bold leading-relaxed mt-2 uppercase tracking-tight">
                    {desc}
                </p>
            </div>
        </>
    );
}

function ValueCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
    return (
        <div className="flex items-start gap-5 p-6 rounded-2xl bg-surface-dark border border-white/5 hover:border-primary/20 transition-all group">
            <div className="flex items-center justify-center size-14 shrink-0 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all shadow-lg">
                <span className="material-symbols-outlined text-3xl font-black">{icon}</span>
            </div>
            <div>
                <h3 className="text-white font-black text-lg uppercase tracking-tight mb-1">{title}</h3>
                <p className="text-gray-500 dark:text-[#bab59c] text-[11px] font-bold leading-relaxed uppercase tracking-tight">
                    {desc}
                </p>
            </div>
        </div>
    );
}

function TeamCard({ name, role }: { name: string, role: string }) {
    return (
        <div className="min-w-[240px] snap-center group">
            <div className="h-80 w-full rounded-2xl overflow-hidden relative mb-4 shadow-2xl">
                <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000&auto=format&fit=crop')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                    <span className="material-symbols-outlined text-primary text-2xl filled drop-shadow-glow-sm">verified</span>
                </div>
            </div>
            <h3 className="text-white font-black text-xl uppercase tracking-tighter italic">{name}</h3>
            <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mt-1">{role}</p>
        </div>
    );
}
