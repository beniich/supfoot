'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticlePage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-sans antialiased text-gray-900 dark:text-gray-100 selection:bg-primary selection:text-black min-h-screen">
            <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto overflow-hidden bg-background-light dark:bg-background-dark shadow-2xl pb-32">

                {/* Top App Bar */}
                <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/10">
                    <Link href="/news" className="text-gray-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-xl hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
                    </Link>
                    <h2 className="text-gray-900 dark:text-white text-lg font-black leading-tight tracking-tighter flex-1 text-center uppercase">FootballHub<span className="text-primary">+</span></h2>
                    <div className="flex w-10 items-center justify-end">
                        <button className="size-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors text-gray-900 dark:text-white">
                            <span className="material-symbols-outlined text-[24px]">bookmark_border</span>
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar">
                    {/* Hero Image */}
                    <div className="relative w-full h-[320px] overflow-hidden">
                        <div
                            className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-1000 transform hover:scale-105"
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000&auto=format&fit=crop")' }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-black/30"></div>
                        <div className="absolute bottom-6 left-6">
                            <span className="bg-primary text-black font-black text-[10px] px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-glow">
                                Match Analysis
                            </span>
                        </div>
                    </div>

                    {/* Content Container */}
                    <div className="px-6 pt-6">
                        <h1 className="text-gray-900 dark:text-primary tracking-tight text-3xl font-black leading-[1.1] pb-6 uppercase">
                            Lions of the Atlas: Tactical Mastery in Casablanca Derby
                        </h1>

                        {/* Author Metadata */}
                        <div className="flex items-center gap-4 py-6 border-y border-gray-200 dark:border-white/10 mb-8">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-2xl h-12 w-12 ring-2 ring-primary/20 shadow-lg"
                                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100")' }}>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-900 dark:text-white text-sm font-black uppercase tracking-tight">Ahmed Benali</p>
                                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">2h ago • 5 min read</p>
                            </div>
                            <button className="ml-auto p-3 rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-primary transition-colors border border-white/5">
                                <span className="material-symbols-outlined text-[20px]">share</span>
                            </button>
                        </div>

                        {/* Article Body */}
                        <div className="space-y-6 text-gray-800 dark:text-gray-300 text-lg leading-relaxed font-display">
                            <p className="first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:mt-2">
                                The atmospheric tension at the Stade Mohamed V was palpable as the giants of Moroccan football clashed in a tactical battle that will be remembered for years.
                            </p>
                            <p>
                                Every tactical transition was met with intense focus from both coaching staffs. The precision shown in the defensive third allowed for explosive counter-attacks that kept the 45,000-strong crowd on the edge of their seats.
                            </p>

                            {/* Pull Quote */}
                            <figure className="my-10 pl-6 border-l-4 border-primary bg-primary/5 dark:bg-white/5 p-6 rounded-r-2xl shadow-inner relative overflow-hidden">
                                <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                                    <span className="material-symbols-outlined text-8xl text-primary font-black">format_quote</span>
                                </div>
                                <blockquote className="text-xl font-black italic text-gray-900 dark:text-white leading-tight uppercase tracking-tight">
                                    &quot;This match wasn&apos;t just about three points; it was about the identity of Casablanca. Every tackle carried the weight of history.&quot;
                                </blockquote>
                                <figcaption className="mt-4 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                                    — Walid Regragui, Head Coach
                                </figcaption>
                            </figure>

                            {/* Match Center Component */}
                            <div className="my-10 rounded-2xl overflow-hidden bg-white dark:bg-[#1f1e16] border border-gray-200 dark:border-white/5 shadow-2xl">
                                <div className="bg-primary/10 p-4 border-b border-primary/10 flex justify-between items-center px-6">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Match Intelligence</span>
                                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-[14px]">calendar_today</span> Oct 24, 20:00
                                    </span>
                                </div>
                                <div className="p-8 flex items-center justify-between">
                                    <TeamBadge name="RAJA" color="from-green-600 to-green-800" />
                                    <div className="flex flex-col items-center">
                                        <span className="text-3xl font-black text-gray-900 dark:text-white tracking-widest italic">VS</span>
                                        <span className="text-[8px] text-gray-500 uppercase font-black mt-2 tracking-[0.2em]">Live Tracking Available</span>
                                    </div>
                                    <TeamBadge name="WYD" color="from-red-600 to-red-800" />
                                </div>
                                <div className="px-6 pb-6">
                                    <Link href="/matches" className="w-full bg-primary hover:scale-[1.02] active:scale-[0.98] text-background-dark font-black py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-glow uppercase text-xs tracking-widest">
                                        <span className="material-symbols-outlined text-[20px] filled">analytics</span>
                                        Full Match Data
                                    </Link>
                                </div>
                            </div>

                            <p>
                                As the match reached its climax, tactical substitutions played a pivotal role. The depth of the bench proved to be the deciding factor in maintaining the high-intensity press that ultimately broke the deadlock.
                            </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-10 mb-12">
                            {['#Morocco', '#Derby', '#BotolaPro', '#MatchAnalysis'].map(tag => (
                                <span key={tag} className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full text-[10px] font-black text-gray-700 dark:text-gray-400 border border-white/5 uppercase tracking-widest">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sticky Bottom Action Bar */}
                <div className="fixed bottom-0 z-50 w-full max-w-md bg-background-light dark:bg-[#181711]/95 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 px-6 py-6 flex items-center justify-between pb-8">
                    <div className="flex items-center gap-8">
                        <ArticleAction icon="favorite" label="1.2k" active />
                        <ArticleAction icon="chat_bubble" label="342" />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="size-11 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white flex items-center justify-center hover:bg-primary hover:text-black transition-all border border-white/5">
                            <span className="material-symbols-outlined text-[22px]">ios_share</span>
                        </button>
                        <button className="bg-primary hover:scale-105 active:scale-95 text-background-dark font-black py-3 px-8 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-glow">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TeamBadge({ name, color }: { name: string, color: string }) {
    return (
        <div className="flex flex-col items-center gap-3 w-1/3">
            <div className={`size-16 rounded-3xl bg-gradient-to-br ${color} p-0.5 shadow-xl`}>
                <div className="w-full h-full rounded-[20px] bg-background-dark/20 flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <span className="text-white font-black text-xl italic">{name[0]}</span>
                </div>
            </div>
            <span className="text-xs font-black text-gray-900 dark:text-white tracking-widest uppercase">{name}</span>
        </div>
    );
}

function ArticleAction({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) {
    return (
        <button className="flex flex-col items-center gap-1.5 group">
            <div className={`p-2 rounded-2xl transition-all ${active ? 'bg-primary/10' : 'group-hover:bg-white/5'}`}>
                <span className={`material-symbols-outlined text-[24px] transition-all group-active:scale-125 ${active ? 'text-primary filled neon-text' : 'text-gray-500 dark:text-gray-500'}`} style={active ? { fontVariationSettings: "'FILL' 1" } : {}}>
                    {icon}
                </span>
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-primary' : 'text-gray-500'}`}>{label}</span>
        </button>
    );
}
