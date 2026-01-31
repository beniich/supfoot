'use client';

import React from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function ReferralPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-black min-h-screen">
            <div className="relative flex flex-col max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark min-h-screen pb-32">

                {/* Top App Bar */}
                <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-primary/10">
                    <Link href="/loyalty" className="flex items-center justify-center size-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-900 dark:text-white text-2xl">arrow_back</span>
                    </Link>
                    <h1 className="text-slate-900 dark:text-white text-lg font-black leading-tight tracking-tighter flex-1 text-center uppercase italic">
                        Refer a Friend
                    </h1>
                    <button className="flex h-10 px-3 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <p className="text-gray-500 dark:text-[#bab59c] text-[10px] font-black uppercase tracking-widest">Rules</p>
                    </button>
                </header>

                <main className="flex flex-col flex-1 w-full pb-6">
                    {/* Hero Illustration */}
                    <div className="w-full relative h-[280px]">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000')" }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>

                        {/* Headline Section Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-6 text-center z-10">
                            <h2 className="text-3xl font-black leading-[1] pb-2 drop-shadow-lg uppercase italic tracking-tighter text-white">
                                Invite a Friend,<br />
                                <span className="text-primary neon-text">Earn Gold Points</span>
                            </h2>
                            <p className="text-gray-300 text-xs font-bold leading-relaxed max-w-xs mx-auto uppercase tracking-wide">
                                Give 500, Get 500. Help your squad get ahead of the game.
                            </p>
                        </div>
                    </div>

                    {/* Referral Code Card */}
                    <div className="px-6 -mt-4 relative z-20">
                        <div className="bg-surface-dark border border-white/10 rounded-3xl p-6 flex flex-col items-center gap-6 shadow-2xl backdrop-blur-xl">
                            <div className="flex flex-col items-center gap-3 w-full">
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Your Unique Code</p>
                                {/* Code Pill */}
                                <button className="w-full max-w-xs bg-black/20 border-2 border-primary/30 hover:border-primary active:scale-[0.98] transition-all rounded-2xl p-2 pl-6 pr-2 flex items-center justify-between group">
                                    <span className="text-xl font-black tracking-[0.2em] font-mono text-white group-hover:text-primary transition-colors">GOAL-8821</span>
                                    <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-black shadow-glow-sm group-hover:scale-105 transition-transform">
                                        <span className="material-symbols-outlined text-[20px] font-black">content_copy</span>
                                    </div>
                                </button>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-1 animate-pulse">Tap code to copy</p>
                            </div>

                            <div className="w-full h-px bg-white/5"></div>

                            <div className="flex justify-between w-full px-2 gap-2">
                                <ShareButton icon="chat" label="WhatsApp" color="bg-[#25D366]" />
                                <ShareButton icon="sms" label="Message" color="bg-[#007AFF]" />
                                <ShareButton icon="mail" label="Email" color="bg-white/10" />
                                <ShareButton icon="ios_share" label="More" color="bg-primary text-black" />
                            </div>
                        </div>
                    </div>

                    {/* How it Works */}
                    <div className="px-6 mt-8">
                        <h3 className="text-sm font-black uppercase italic tracking-tight mb-4 pl-1 text-white">How it works</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <StepCard number="1" icon="link" title="Invite" desc="Share your link with friends." />
                            <StepCard number="2" icon="person_add" title="They Join" desc="They sign up & subscribe." />
                            <StepCard number="3" icon="emoji_events" title="Earn" desc="Both get 500 Gold Points." />
                        </div>
                    </div>

                    {/* Referral History */}
                    <div className="px-6 mt-8">
                        <div className="flex items-center justify-between mb-4 pl-1 pr-1">
                            <h3 className="text-sm font-black uppercase italic tracking-tight text-white">Referral History</h3>
                            <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
                                <span className="text-primary text-[10px] font-black uppercase tracking-widest">1,500 Pts Earned</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <HistoryItem name="Alex Martinez" time="Joined 2h ago" points="+500" status="Completed" avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" />
                            <HistoryItem name="Sarah Jenkins" time="Joined 1d ago" points="+500" status="Completed" avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330" />
                            <HistoryItem name="Mike Thompson" time="Invite Sent" points="Pending" status="Pending" avatar="https://images.unsplash.com/photo-1599566150163-29194dcaad36" pending />
                        </div>
                    </div>
                </main>

                <BottomNav activeTab="profile" />
            </div>
        </div>
    );
}

function ShareButton({ icon, label, color }: { icon: string, label: string, color: string }) {
    return (
        <button className="flex flex-col items-center gap-2 group transition-all hover:-translate-y-1 flex-1">
            <div className={`size-12 rounded-2xl ${color} flex items-center justify-center shadow-lg`}>
                <span className={`material-symbols-outlined text-2xl ${color.includes('text-black') ? 'text-black' : 'text-white'}`}>{icon}</span>
            </div>
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wide group-hover:text-white transition-colors">{label}</span>
        </button>
    );
}

function StepCard({ number, icon, title, desc }: { number: string, icon: string, title: string, desc: string }) {
    return (
        <div className="bg-surface-dark rounded-2xl p-4 flex flex-col items-center text-center gap-3 border border-white/5 hover:border-primary/20 transition-all group">
            <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all shadow-glow-sm">
                <span className="material-symbols-outlined text-xl">{icon}</span>
            </div>
            <div>
                <p className="text-xs font-black text-white uppercase tracking-tight">{number}. {title}</p>
                <p className="text-[9px] text-gray-500 leading-tight mt-1 font-bold">{desc}</p>
            </div>
        </div>
    );
}

function HistoryItem({ name, time, points, status, avatar, pending = false }: { name: string, time: string, points: string, status: string, avatar: string, pending?: boolean }) {
    return (
        <div className={`flex items-center justify-between bg-surface-dark p-4 rounded-2xl border border-white/5 ${pending ? 'opacity-60' : ''}`}>
            <div className="flex items-center gap-4">
                <div className="size-10 rounded-xl bg-gray-700 bg-center bg-cover shadow-sm border border-white/10" style={{ backgroundImage: `url('${avatar}')` }}></div>
                <div className="flex flex-col">
                    <span className="text-xs font-black text-white uppercase tracking-tight">{name}</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">{time}</span>
                </div>
            </div>
            <div className="flex flex-col items-end">
                {pending ? (
                    <div className="flex items-center gap-1 text-gray-500">
                        <span className="text-xs font-bold uppercase tracking-tight">Pending</span>
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-1 text-primary">
                            <span className="text-xs font-black">{points}</span>
                            <span className="material-symbols-outlined text-[14px] filled">bolt</span>
                        </div>
                        <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">{status}</span>
                    </>
                )}
            </div>
        </div>
    );
}
