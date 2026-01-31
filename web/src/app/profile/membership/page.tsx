'use client';

import React from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function MembershipPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-gray-900 dark:text-white antialiased min-h-screen">
            <div className="relative flex flex-col h-full min-h-screen w-full max-w-md mx-auto overflow-hidden bg-background-light dark:bg-background-dark transition-colors duration-200">
                {/* Top App Bar */}
                <div className="flex items-center px-4 py-4 justify-between bg-transparent z-10">
                    <Link href="/profile" className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </Link>
                    <h2 className="text-slate-900 dark:text-white text-lg font-black leading-tight tracking-tighter flex-1 text-center pr-12 text-transform uppercase italic">
                        My Subscription
                    </h2>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                    {/* Hero Card: Current Plan */}
                    <div className="px-4 pt-2 pb-6">
                        <div className="relative overflow-hidden rounded-[2rem] bg-surface-dark shadow-2xl border border-white/5">
                            {/* Decorative subtle gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50"></div>
                            <div className="relative p-6 flex flex-col items-center text-center space-y-4">
                                <div className="size-16 rounded-2xl bg-gradient-to-b from-primary/20 to-primary/5 flex items-center justify-center border border-primary/30 shadow-glow-sm transform rotate-3">
                                    <span className="material-symbols-outlined text-4xl text-primary drop-shadow-sm">emoji_events</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-primary/80 text-[10px] font-black tracking-widest uppercase">Current Plan</p>
                                    <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">VIP Membership</h1>
                                </div>
                                <div className="w-full h-px bg-white/10 my-2"></div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-gray-300 text-sm font-bold uppercase tracking-wide">Billed monthly • $19.99/mo</p>
                                    <div className="flex items-center justify-center gap-2 mt-1">
                                        <span className="material-symbols-outlined text-sm text-green-400">autorenew</span>
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Renews on Nov 24, 2023</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upgrade CTA */}
                    <div className="px-4 pb-8">
                        <button className="group relative w-full overflow-hidden rounded-2xl bg-primary p-4 text-background-dark shadow-glow transition-all hover:-translate-y-0.5 active:translate-y-0">
                            <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                            <span className="relative flex items-center justify-center gap-2 font-black text-lg uppercase tracking-tight italic">
                                Upgrade to Pro Annual
                                <span className="rounded-lg bg-black/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-black/70">Save 20%</span>
                            </span>
                        </button>
                    </div>

                    {/* Plan Overview Header */}
                    <div className="px-6 pb-2">
                        <h3 className="text-slate-900 dark:text-white text-xl font-black leading-tight uppercase italic tracking-tighter">Plan Overview</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 font-bold uppercase tracking-wide">Your active benefits</p>
                    </div>

                    {/* Benefits List */}
                    <div className="px-4 pb-8">
                        <div className="flex flex-col gap-3 rounded-[1.5rem] bg-white dark:bg-surface-dark p-5 border border-black/5 dark:border-white/5 shadow-sm">
                            <BenefitItem text="Ad-free experience" subtext="Enjoy matches without interruptions." />
                            <div className="h-px w-full bg-gray-100 dark:bg-white/5"></div>
                            <BenefitItem text="4K Match Replays" subtext="Crystal clear resolution for every game." />
                            <div className="h-px w-full bg-gray-100 dark:bg-white/5"></div>
                            <BenefitItem text="Scout Analysis Reports" subtext="Deep dive stats and player tracking." />
                        </div>
                    </div>

                    {/* Payment Method Section */}
                    <div className="px-6 pb-2 pt-2">
                        <h3 className="text-slate-900 dark:text-white text-xl font-black leading-tight uppercase italic tracking-tighter">Payment Method</h3>
                    </div>
                    <div className="px-4 pb-4">
                        <div className="flex items-center justify-between rounded-[1.5rem] bg-white dark:bg-surface-dark p-4 border border-black/5 dark:border-white/5 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10 p-1">
                                    <span className="material-symbols-outlined text-slate-800 dark:text-white text-2xl">credit_card</span>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-tight">Visa ending in 4242</p>
                                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wide">Expires 12/25</p>
                                </div>
                            </div>
                            <button className="text-primary text-xs font-black uppercase tracking-widest hover:text-primary/80 px-2 py-1">
                                Update
                            </button>
                        </div>
                    </div>

                    {/* Billing History Link */}
                    <div className="px-4 pb-8">
                        <Link href="/profile/billing">
                            <button className="flex w-full items-center justify-between rounded-[1.5rem] bg-transparent px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                                <span className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Billing History</span>
                                <span className="material-symbols-outlined text-gray-500 group-hover:text-slate-900 dark:group-hover:text-white">chevron_right</span>
                            </button>
                        </Link>
                    </div>
                </div>

                <BottomNav activeTab="profile" />
            </div>
        </div>
    );
}

function BenefitItem({ text, subtext }: { text: string, subtext: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="mt-0.5 flex items-center justify-center rounded-full bg-primary/10 p-1">
                <span className="material-symbols-outlined text-lg text-primary font-bold">check</span>
            </div>
            <div>
                <p className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-tight">{text}</p>
                <p className="text-gray-500 text-xs leading-snug font-medium">{subtext}</p>
            </div>
        </div>
    );
}
