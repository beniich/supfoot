'use client';

import React from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function NewsHubPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased pb-24 min-h-screen selection:bg-primary selection:text-black">
            {/* Top App Bar */}
            <div className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary flex items-center justify-center text-background-dark font-bold text-lg shadow-glow-sm">
                        <span className="material-symbols-outlined text-[20px]">sports_soccer</span>
                    </div>
                    <h1 className="text-xl font-black tracking-tight uppercase">FootballHub<span className="text-primary">+</span></h1>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-background-dark"></span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex flex-col gap-8">
                {/* Hero Section: Immersive Video Card */}
                <div className="relative w-full aspect-[4/5] md:aspect-video px-4 pt-4">
                    <Link href="/news/video" className="block h-full">
                        <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer border border-white/5">
                            {/* Background Image */}
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000&auto=format&fit=crop')" }}>
                            </div>
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>

                            {/* Video Controls / Badge */}
                            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-white/10">
                                <span className="material-symbols-outlined text-white text-[16px]">volume_off</span>
                                <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest">Preview</span>
                            </div>
                            <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded shadow-lg">
                                Live Highlights
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-start gap-4">
                                <div className="space-y-1">
                                    <h2 className="text-3xl font-black leading-tight text-white tracking-tight uppercase">
                                        Derby Day:<br /><span className="text-primary neon-text">City vs. United</span>
                                    </h2>
                                    <p className="text-gray-300 text-sm font-medium line-clamp-2 max-w-[90%]">
                                        Catch the intense highlights of the season&apos;s most anticipated rivalry. Every goal, every tackle, every moment.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 w-full">
                                    <button className="flex-1 bg-primary hover:scale-[1.02] active:scale-[0.98] text-background-dark h-12 px-6 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-glow">
                                        <span className="material-symbols-outlined filled">play_arrow</span>
                                        Watch Now
                                    </button>
                                    <button className="size-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                                        <span className="material-symbols-outlined">add</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Top Stories Horizontal Scroll */}
                <section className="flex flex-col gap-4">
                    <div className="px-4 flex items-center justify-between">
                        <h3 className="text-xl font-black text-white tracking-tight uppercase">Top Stories</h3>
                        <Link href="/news/articles" className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">View All</Link>
                    </div>
                    <div className="flex overflow-x-auto no-scrollbar pb-4 px-4 gap-5 snap-x snap-mandatory">
                        <StoryCard
                            title="Golden Boot Race Heats Up"
                            category="Exclusive"
                            time="3h ago"
                            image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
                        />
                        <StoryCard
                            title="Tactical Breakdown: The High Press"
                            category="Analysis"
                            time="5h ago"
                            image="https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=600"
                        />
                        <StoryCard
                            title="Transfer Rumors: Summer Window"
                            category="Rumors"
                            time="8h ago"
                            image="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=600"
                        />
                    </div>
                </section>

                {/* Video Categories */}
                <section className="flex flex-col gap-4">
                    <h3 className="text-xl font-black text-white tracking-tight px-4 uppercase">Media Library</h3>
                    <div className="flex overflow-x-auto no-scrollbar px-4 gap-3">
                        {['Highlights', 'Interviews', 'Tactics', 'Press', 'Shorts'].map((cat, i) => (
                            <button key={cat} className={`whitespace-nowrap rounded-xl px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${i === 0 ? 'bg-primary text-background-dark shadow-glow-sm' : 'bg-surface-dark text-gray-400 border border-white/5 hover:bg-white/5'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Vertical Content List */}
                <section className="flex flex-col px-4 gap-5 pb-8">
                    <VideoListItem
                        title="Goal of the Month Contenders: October"
                        league="Premier League"
                        views="12k"
                        time="2h ago"
                        duration="04:22"
                        image="https://images.unsplash.com/photo-1431324155629-1a6eda1fed2d?auto=format&fit=crop&q=80&w=800"
                    />
                    <VideoListItem
                        title="Pre-Match Conference: Manager Thoughts"
                        league="Champions League"
                        views="8.5k"
                        time="4h ago"
                        duration="12:05"
                        image="https://images.unsplash.com/photo-1624891151630-1439b177976c?auto=format&fit=crop&q=80&w=800"
                    />
                </section>
            </main>

            <BottomNav activeTab="news" />
        </div>
    );
}

function StoryCard({ title, category, time, image }: { title: string, category: string, time: string, image: string }) {
    return (
        <Link href="/news/article" className="snap-center shrink-0 w-[290px] flex flex-col gap-4 group">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-card-dark border border-white/5 shadow-lg">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${image})` }}>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/80 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                        {category}
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-2 px-1">
                <h4 className="text-primary font-black text-lg leading-tight group-hover:text-white transition-colors uppercase tracking-tight line-clamp-2">{title}</h4>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <span>News</span>
                    <span className="size-1 rounded-full bg-gray-500/30"></span>
                    <span>{time}</span>
                </div>
            </div>
        </Link>
    );
}

function VideoListItem({ title, league, views, time, duration, image }: { title: string, league: string, views: string, time: string, duration: string, image: string }) {
    return (
        <Link href="/news/video" className="flex flex-col bg-surface-dark rounded-2xl overflow-hidden shadow-xl border border-white/5 group transition-all hover:border-primary/20">
            <div className="relative w-full aspect-[21/9]">
                <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
                    style={{ backgroundImage: `url(${image})` }}>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                    <div className="size-12 rounded-full bg-primary/90 text-background-dark flex items-center justify-center shadow-glow transform scale-100 group-hover:scale-110 transition-all">
                        <span className="material-symbols-outlined text-[28px] filled">play_arrow</span>
                    </div>
                </div>
                <span className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-[10px] font-black px-2 py-1 rounded-lg border border-white/10 tracking-widest">
                    {duration}
                </span>
            </div>
            <div className="p-5 flex flex-col gap-3">
                <h4 className="text-white text-base font-black leading-snug uppercase tracking-tight group-hover:text-primary transition-colors">{title}</h4>
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span className="text-primary/70">{league}</span>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">visibility</span> {views}</span>
                        <span>{time}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
