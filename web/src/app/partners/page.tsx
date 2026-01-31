'use client';

import React from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function PartnersPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-background-dark min-h-screen">
            <div className="relative flex flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark min-h-screen pb-32">
                {/* TopAppBar */}
                <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-primary/10">
                    <Link href="/" className="flex items-center justify-center size-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-900 dark:text-white text-2xl">arrow_back</span>
                    </Link>
                    <h1 className="text-slate-900 dark:text-white text-lg font-black leading-tight tracking-tighter flex-1 text-center uppercase">
                        PartnersHub<span className="text-primary">+</span>
                    </h1>
                    <div className="flex w-10 items-center justify-end">
                        <span className="material-symbols-outlined text-primary filled scale-110">handshake</span>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex flex-col gap-8 px-6 pt-6">
                    <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl group min-h-[420px] flex flex-col justify-end">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop')" }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        <div className="relative p-8 pt-32">
                            <span className="mb-4 inline-flex items-center rounded-xl bg-primary/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary backdrop-blur-md border border-primary/30 shadow-glow">
                                ELITE OPPORTUNITIES
                            </span>
                            <h2 className="text-white text-4xl font-black leading-[1] tracking-tighter mb-4 uppercase italic">
                                Join the Elite <br /><span className="text-primary neon-text">Ecosystem</span>
                            </h2>
                            <p className="text-gray-300 text-sm font-bold leading-relaxed max-w-[280px] mb-8 uppercase tracking-tight">
                                Connect your brand with millions of passionate football fans worldwide.
                            </p>
                            <button className="w-full flex items-center justify-between rounded-2xl bg-primary px-8 py-5 text-[#181711] text-xs font-black shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.1em]">
                                <span>Get Your Brand Featured</span>
                                <span className="material-symbols-outlined text-[20px] font-black">arrow_forward</span>
                            </button>
                        </div>
                    </div>

                    {/* Current Partners Grid */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-white text-xl font-black tracking-tighter uppercase italic italic">Current Partners</h2>
                            <Link href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:underline">View Global Grid</Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <PartnerCard name="SportCo" icon="sports_soccer" category="Official Ball" />
                            <PartnerCard name="FlyEmir" icon="flight_takeoff" category="Arline Global" />
                            <PartnerCard name="Energy+" icon="bolt" category="Nutrition" />
                            <PartnerCard name="FinBank" icon="payments" category="Fintech Elite" />
                        </div>
                    </section>

                    {/* Why Sponsor Us Section */}
                    <section className="flex flex-col gap-6">
                        <div className="mb-2">
                            <h2 className="text-white text-xl font-black tracking-tighter uppercase italic italic">Why Partner With Us?</h2>
                            <p className="text-[10px] text-[#bab59c] font-black uppercase tracking-widest mt-2">Scale your presence with the game&apos;s digital leader.</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <MetricCard icon="groups" title="10M+ Global Fans" desc="Highly engaged youth and pro demographics." />
                            <MetricCard icon="public" title="50+ Countries" desc="Hyper-local targeting in emerging markets." />
                            <MetricCard icon="trending_up" title="Premium Retention" desc="Top-tier click-through and conversion rates." />
                        </div>
                    </section>
                </main>

                <BottomNav activeTab="home" />
            </div>
        </div>
    );
}

function PartnerCard({ name, icon, category }: { name: string, icon: string, category: string }) {
    return (
        <div className="aspect-square flex flex-col items-center justify-center rounded-3xl bg-surface-dark border border-white/5 p-6 hover:border-primary/50 transition-all group shadow-xl">
            <div className="flex items-center justify-center size-16 rounded-2xl bg-white/5 mb-4 group-hover:bg-primary transition-all">
                <span className="material-symbols-outlined text-4xl text-gray-500 group-hover:text-black transition-colors">{icon}</span>
            </div>
            <span className="text-white font-black text-sm uppercase tracking-tight mb-1">{name}</span>
            <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{category}</span>
        </div>
    );
}

function MetricCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
    return (
        <div className="flex items-center gap-5 p-5 rounded-2xl bg-surface-dark border border-white/5 hover:border-primary/10 transition-all shadow-lg group">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/10 group-hover:bg-primary group-hover:text-black transition-all shadow-glow-sm">
                <span className="material-symbols-outlined text-2xl font-black">{icon}</span>
            </div>
            <div className="flex flex-col">
                <h3 className="text-base font-black text-white uppercase tracking-tight">{title}</h3>
                <p className="text-[11px] font-bold text-gray-500 dark:text-[#bab59c] uppercase tracking-tight mt-0.5">{desc}</p>
            </div>
        </div>
    );
}
