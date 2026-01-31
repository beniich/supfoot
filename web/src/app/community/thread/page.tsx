'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BottomNav from '@/components/BottomNav';
import { CommentItemProps } from '@/types/components';
import { formatDate, formatNumber } from '@/utils/formatters';

export default function CommunityThreadPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#181711] dark:text-white font-sans overflow-hidden selection:bg-primary/30 min-h-screen">
            <div className="relative mx-auto flex h-full min-h-screen w-full max-w-md flex-col overflow-hidden bg-background-light dark:bg-background-dark shadow-2xl pb-32">
                {/* Header */}
                <header className="sticky top-0 z-30 flex items-center justify-between border-b border-black/5 dark:border-white/5 bg-background-light/95 dark:bg-background-dark/95 px-4 py-3 backdrop-blur-md">
                    <Link href="/community" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-all">
                        <span className="material-symbols-outlined text-[28px]">chevron_left</span>
                    </Link>
                    <h2 className="text-xs font-black tracking-widest uppercase text-black/70 dark:text-white/60">Tactical Analysis</h2>
                    <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-all">
                        <span className="material-symbols-outlined text-[24px]">more_horiz</span>
                    </button>
                </header>

                {/* Main Content (Scrollable) */}
                <main className="flex-1 overflow-y-auto no-scrollbar">
                    {/* Original Post (OP) */}
                    <article className="border-b border-black/5 dark:border-white/5 bg-background-light dark:bg-background-dark px-5 pb-6 pt-8">
                        {/* OP Header: User Info */}
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-primary/20 p-0.5 shadow-lg">
                                    <Image
                                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100"
                                        alt="AtlasFan_99"
                                        fill
                                        className="object-cover rounded-[14px]"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="font-black text-lg leading-none uppercase tracking-tight">AtlasFan_99</span>
                                        <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.2em] text-primary border border-primary/20 shadow-glow-sm">Premium</span>
                                    </div>
                                    <span className="text-[10px] text-black/50 dark:text-[#bab59c] font-black uppercase tracking-widest mt-1">
                                        {formatDate.relative('2026-01-31T15:00:00')} • Lion&apos;s Den
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* OP Content */}
                        <div className="mb-6">
                            <h1 className="mb-4 text-2xl font-black leading-tight tracking-tight uppercase italic">
                                Who should be the starting XI for the next Lions of the Atlas match?
                            </h1>
                            <p className="text-base leading-relaxed text-black/80 dark:text-gray-300 font-medium">
                                Considering the injuries in midfield, do we shift to a 4-3-3 or stick with the diamond? I think Ounahi needs to start, but I&apos;m worried about the defensive cover without Amrabat. What do you all think?
                            </p>
                        </div>

                        {/* OP Actions */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-2xl bg-black/5 dark:bg-white/5 p-1 border border-white/5">
                                <button className="flex items-center justify-center p-2 text-primary hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-all active:scale-125">
                                    <span className="material-symbols-outlined text-[20px] font-bold filled">arrow_upward</span>
                                </button>
                                <span className="min-w-[24px] text-center text-sm font-black text-black/70 dark:text-white/90">
                                    {formatNumber.compact(128)}
                                </span>
                                <button className="flex items-center justify-center p-2 text-black/40 dark:text-white/40 hover:text-red-500 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-all active:scale-125">
                                    <span className="material-symbols-outlined text-[20px]">arrow_downward</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-5 text-black/50 dark:text-white/50">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest">45 Comments</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">share</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Share</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Filter/Sort Bar */}
                    <div className="sticky top-[61px] z-10 flex items-center justify-between bg-background-light dark:bg-background-dark/95 backdrop-blur-md px-5 py-4 border-b border-black/5 dark:border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 dark:text-[#bab59c]">Discussion Feed</span>
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                            Top Comments
                            <span className="material-symbols-outlined text-[18px]">sort</span>
                        </button>
                    </div>

                    {/* Comments List */}
                    <div className="flex flex-col">
                        <CommentItem
                            user="TacticalGenius"
                            time="1h ago"
                            content="Absolutely 4-3-3. We need width against this opponent. The diamond gets too congested in the middle against low blocks."
                            votes={24}
                        />
                        <div className="relative pl-8 bg-black/[0.02] dark:bg-white/[0.01]">
                            <div className="absolute left-6 top-0 bottom-0 w-px bg-primary/10"></div>
                            <CommentItem
                                user="SarahKick"
                                time="45m ago"
                                content="But who plays pivot? Amrabat is out and we don't have a direct replacement for that anchor role."
                                votes={5}
                                isStaff
                                isReply
                            />
                        </div>
                        <CommentItem
                            user="UltraFan"
                            time="2h ago"
                            content="I disagree. The diamond worked perfectly in the last friendly. We just need to trust the system."
                            votes={-2}
                        />
                        <CommentItem
                            user="KrimoDev"
                            time="3h ago"
                            content="Anyone watching the U23 team? Some serious talent there that could step up."
                            votes={8}
                        />
                    </div>
                </main>

                {/* Floating Action Button */}
                <button className="fixed bottom-28 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-background-dark shadow-glow transition-all active:scale-90 hover:scale-105">
                    <span className="material-symbols-outlined text-[32px] font-black">edit</span>
                </button>

                <BottomNav activeTab="home" />
            </div>
        </div>
    );
}

function CommentItem({ user, time, content, votes, isStaff = false, isReply = false }: CommentItemProps) {
    return (
        <div className={`border-b border-black/5 dark:border-white/5 p-5 transition-all hover:bg-black/5 dark:hover:bg-white/5 ${isReply ? '' : 'bg-background-light dark:bg-background-dark'}`}>
            <div className="flex gap-4">
                <div className={`relative shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-md ${isReply ? 'h-10 w-10' : 'h-12 w-12'}`}>
                    <Image
                        src={`https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&author=${user}`}
                        alt={user}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="font-black text-sm uppercase tracking-tight">{user}</span>
                            {isStaff && <span className="rounded-md bg-white/10 border border-white/10 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-widest text-[#bab59c]">Staff</span>}
                        </div>
                        <span className="text-[10px] font-black text-black/40 dark:text-[#bab59c] uppercase tracking-widest">{time}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-black/80 dark:text-gray-300 font-medium">
                        {content}
                    </p>
                    <div className="mt-4 flex items-center gap-6">
                        <div className="flex items-center gap-1 rounded-xl bg-black/5 dark:bg-white/5 px-2 py-0.5 border border-white/5">
                            <button className="text-black/40 dark:text-white/40 hover:text-primary transition-all active:scale-125">
                                <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                            </button>
                            <span className={`text-[10px] font-black min-w-[16px] text-center ${votes < 0 ? 'text-red-500' : 'text-gray-400'}`}>{votes}</span>
                            <button className="text-black/40 dark:text-white/40 hover:text-red-500 transition-all active:scale-125">
                                <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                            </button>
                        </div>
                        <button className="text-[9px] font-black text-black/40 dark:text-[#bab59c] hover:text-primary uppercase tracking-widest transition-colors">Reply</button>
                        <button className="text-[9px] font-black text-black/40 dark:text-[#bab59c] hover:text-primary uppercase tracking-widest transition-colors">Award</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
