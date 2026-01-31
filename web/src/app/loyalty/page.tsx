'use client';

import React from 'react';
import BottomNav from '@/components/BottomNav';

export default function LoyaltyPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-black min-h-screen">
            <div className="relative flex flex-col max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark min-h-screen pb-32">

                {/* Header */}
                <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-primary/10">
                    <h2 className="text-xl font-black leading-tight tracking-tighter uppercase italic flex-1">Rewards Hub</h2>
                    <div className="flex items-center justify-end gap-3">
                        <div className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20 shadow-glow-sm">
                            <span className="material-symbols-outlined text-primary text-[20px] font-black filled">bolt</span>
                            <span className="text-sm font-black text-primary">2,450</span>
                        </div>
                        <button className="flex items-center justify-center rounded-xl size-10 bg-white/5 hover:bg-white/10 text-slate-900 dark:text-white transition-colors border border-white/5">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                    </div>
                </header>

                <main className="flex flex-col gap-8 pt-6">
                    {/* Tier Status Card */}
                    <div className="px-4">
                        <div className="relative overflow-hidden rounded-3xl bg-surface-dark shadow-2xl border border-white/5 group">
                            {/* Dynamic Background */}
                            <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100')" }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>

                            <div className="relative p-6 flex flex-col items-center text-center gap-4">
                                <div className="rounded-full bg-gradient-to-b from-primary to-yellow-600 p-[2px] shadow-glow animate-pulse-gold">
                                    <div className="bg-black/80 rounded-full p-4 backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-primary text-[40px] filled">trophy</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Gold Striker</h3>
                                    <p className="text-slate-300 text-[10px] font-black uppercase tracking-widest opacity-80">Top 5% of fans this month</p>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full flex flex-col gap-2 mt-2">
                                    <div className="flex justify-between items-end px-1">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Level 4</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">550 pts to Platinum</span>
                                    </div>
                                    <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                                        <div className="h-full bg-gradient-to-r from-yellow-600 via-primary to-yellow-200 rounded-full shadow-glow" style={{ width: '82%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ways to Earn Carousel */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between px-6">
                            <h3 className="text-lg font-black uppercase italic tracking-tight">Ways to Earn</h3>
                            <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All</button>
                        </div>
                        <div className="flex overflow-x-auto pb-4 px-6 gap-3 snap-x no-scrollbar">
                            <EarnCard icon="calendar_today" title="Daily Login" points="+10" color="text-primary" bg="bg-primary/10" />
                            <EarnCard icon="play_circle" title="Watch Highlights" points="+50" color="text-blue-500" bg="bg-blue-500/10" />
                            <EarnCard icon="group_add" title="Refer a Friend" points="+500" color="text-emerald-500" bg="bg-emerald-500/10" />
                            <EarnCard icon="poll" title="Predict Match" points="Lvl 5 Reqd" color="text-purple-500" bg="bg-purple-500/10" locked />
                        </div>
                    </div>

                    {/* Rewards Store Grid */}
                    <div className="flex flex-col gap-4 px-6">
                        <h3 className="text-lg font-black uppercase italic tracking-tight">Rewards Store</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <RewardCard
                                title="10% Shop Discount"
                                desc="Get 10% off your next jersey purchase."
                                cost="1,000"
                                image="https://images.unsplash.com/photo-1522770179533-24471fcdba45"
                            />
                            <RewardCard
                                title="VIP Match Tickets"
                                desc="Exclusive box seats for the derby."
                                cost="5,000"
                                image="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9"
                                locked
                            />
                            <RewardCard
                                title="Exclusive AI Insights"
                                desc="Deep dive stats for next match."
                                cost="500"
                                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                            />
                            <RewardCard
                                title="Signed Jersey"
                                desc="Enter the raffle for a signed kit."
                                cost="2,500"
                                image="https://images.unsplash.com/photo-1577223625816-7546f13df25d"
                                locked
                            />
                        </div>
                    </div>
                </main>

                <BottomNav activeTab="profile" />
            </div>
        </div>
    );
}

function EarnCard({ icon, title, points, color, bg, locked = false }: { icon: string, title: string, points: string, color: string, bg: string, locked?: boolean }) {
    return (
        <div className={`flex-none snap-start w-36 flex flex-col gap-3 p-4 rounded-2xl bg-surface-dark border border-white/5 shadow-lg group hover:border-primary/20 transition-all ${locked ? 'opacity-60' : ''}`}>
            <div className={`w-full aspect-square rounded-xl ${bg} flex items-center justify-center ${color} relative overflow-hidden`}>
                <div className={`absolute inset-0 ${bg} opacity-50 scale-0 group-hover:scale-100 transition-transform rounded-xl`}></div>
                <span className="material-symbols-outlined text-[32px] z-10">{icon}</span>
                {locked && (
                    <div className="absolute top-2 right-2">
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-xs font-bold truncate text-white mb-1">{title}</p>
                <p className={`text-[10px] font-black ${locked ? 'text-gray-500' : 'text-primary'} uppercase tracking-wider`}>{points} {locked ? '' : 'pts'}</p>
            </div>
        </div>
    );
}

function RewardCard({ title, desc, cost, image, locked = false }: { title: string, desc: string, cost: string, image: string, locked?: boolean }) {
    return (
        <div className={`flex flex-col bg-surface-dark rounded-2xl overflow-hidden border border-white/5 shadow-lg group hover:border-primary/20 transition-all ${locked ? 'opacity-70' : ''}`}>
            <div className="relative h-32 w-full bg-slate-800">
                <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 ${locked ? 'grayscale' : ''}`} style={{ backgroundImage: `url('${image}')` }}></div>
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[9px] font-black text-primary border border-primary/20 shadow-glow-sm">
                    {cost} pts
                </div>
                {locked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                        <span className="material-symbols-outlined text-white/80 text-3xl drop-shadow-lg">lock</span>
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h4 className="font-bold text-xs text-white mb-1 line-clamp-1 uppercase tracking-tight">{title}</h4>
                <p className="text-[10px] text-gray-400 mb-4 line-clamp-2 leading-relaxed">{desc}</p>
                <button className={`mt-auto w-full py-2.5 text-[9px] font-black rounded-xl uppercase tracking-widest transition-all ${locked ? 'bg-white/5 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark text-black shadow-glow hover:shadow-glow-lg'}`}>
                    {locked ? 'Not Enough Pts' : 'Redeem'}
                </button>
            </div>
        </div>
    );
}
