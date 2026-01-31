'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function NotificationPreferencesPage() {
    const [toggles, setToggles] = useState({
        goals: true,
        lineups: true,
        matchStatus: false,
        cards: false,
        winProbability: true,
        playerStats: false,
        community: true,
        priceDrops: false,
        dnd: true
    });

    const toggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-black min-h-screen">
            <div className="relative flex flex-col max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark min-h-screen pb-32">

                {/* Header */}
                <header className="sticky top-0 z-50 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 p-4 backdrop-blur-md border-b border-black/5 dark:border-white/5">
                    <Link href="/notifications" className="flex size-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </Link>
                    <h1 className="text-lg font-black leading-tight uppercase italic tracking-tighter">Preferences</h1>
                    <button className="flex size-10 items-center justify-center rounded-xl text-primary font-black text-xs border border-primary/20 hover:bg-primary/10 transition-colors">
                        Save
                    </button>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto no-scrollbar px-4 pt-6 pb-6">

                    {/* Section: Match Alerts */}
                    <PreferenceSection title="Match Alerts">
                        <ToggleItem
                            icon="sports_soccer"
                            label="Goals"
                            desc="Instant push when a goal is scored"
                            iconBg="bg-primary/10"
                            iconColor="text-primary"
                            active={toggles.goals}
                            onToggle={() => toggle('goals')}
                        />
                        <ToggleItem
                            icon="groups"
                            label="Lineups"
                            desc="Starting XI announcements"
                            iconBg="bg-primary/10"
                            iconColor="text-primary"
                            active={toggles.lineups}
                            onToggle={() => toggle('lineups')}
                        />
                        <ToggleItem
                            icon="timer"
                            label="Match Status"
                            desc="Half-time and Full-time scores"
                            iconBg="bg-primary/10"
                            iconColor="text-primary"
                            active={toggles.matchStatus}
                            onToggle={() => toggle('matchStatus')}
                        />
                        <ToggleItem
                            icon="style"
                            label="Cards"
                            desc="Red card alerts"
                            iconBg="bg-primary/10"
                            iconColor="text-primary"
                            active={toggles.cards}
                            onToggle={() => toggle('cards')}
                        />
                    </PreferenceSection>

                    {/* Section: AI Insights */}
                    <PreferenceSection title="AI Insights">
                        <ToggleItem
                            icon="psychology"
                            label="Win Probability"
                            desc="Live predictive updates"
                            iconBg="bg-indigo-500/10"
                            iconColor="text-indigo-500 dark:text-indigo-400"
                            active={toggles.winProbability}
                            onToggle={() => toggle('winProbability')}
                        />
                        <ToggleItem
                            icon="trending_up"
                            label="Player Stats"
                            desc="Key performance milestones"
                            iconBg="bg-indigo-500/10"
                            iconColor="text-indigo-500 dark:text-indigo-400"
                            active={toggles.playerStats}
                            onToggle={() => toggle('playerStats')}
                        />
                    </PreferenceSection>

                    {/* Section: Community */}
                    <PreferenceSection title="Community">
                        <ToggleItem
                            icon="forum"
                            label="Replies & Mentions"
                            desc="When someone talks to you"
                            iconBg="bg-pink-500/10"
                            iconColor="text-pink-500 dark:text-pink-400"
                            active={toggles.community}
                            onToggle={() => toggle('community')}
                        />
                    </PreferenceSection>

                    {/* Section: Store Alerts */}
                    <PreferenceSection title="Store Alerts">
                        <ToggleItem
                            icon="sell"
                            label="Price Drops"
                            desc="Discounts on wishlist items"
                            iconBg="bg-emerald-500/10"
                            iconColor="text-emerald-500 dark:text-emerald-400"
                            active={toggles.priceDrops}
                            onToggle={() => toggle('priceDrops')}
                        />
                    </PreferenceSection>

                    {/* Section: Do Not Disturb */}
                    <div className="mb-8">
                        <h3 className="mb-2 px-1 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-[#bab59c]">Do Not Disturb</h3>
                        <div className="overflow-hidden rounded-3xl bg-white dark:bg-surface-dark shadow-sm border border-black/5 dark:border-white/5">
                            <div className="p-4 border-b border-slate-100 dark:border-white/5">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-500/10 text-slate-600 dark:text-slate-300 dark:bg-slate-500/20">
                                            <span className="material-symbols-outlined text-xl">do_not_disturb_on</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-base font-black leading-none mb-1 uppercase tracking-tight italic">Scheduled Quiet Hours</span>
                                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">Mute all notifications during sleep</span>
                                        </div>
                                    </div>
                                    <ToggleSwitch active={toggles.dnd} onToggle={() => toggle('dnd')} />
                                </div>
                            </div>
                            {/* Time Selector */}
                            <div className="flex items-center justify-between px-6 py-4 bg-slate-50/50 dark:bg-black/20">
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest">From</span>
                                    <div className="flex items-center rounded-lg bg-white dark:bg-white/10 px-3 py-1.5 shadow-sm border border-slate-200 dark:border-white/5">
                                        <span className="text-sm font-black">22:00</span>
                                    </div>
                                </div>
                                <div className="h-[1px] w-8 bg-slate-300 dark:bg-slate-600"></div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest">To</span>
                                    <div className="flex items-center rounded-lg bg-white dark:bg-white/10 px-3 py-1.5 shadow-sm border border-slate-200 dark:border-white/5">
                                        <span className="text-sm font-black">07:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <BottomNav activeTab="profile" />
            </div>
        </div>
    );
}

function PreferenceSection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="mb-6">
            <h3 className="mb-2 px-1 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-[#bab59c]">{title}</h3>
            <div className="overflow-hidden rounded-3xl bg-white dark:bg-surface-dark shadow-sm border border-black/5 dark:border-white/5">
                {children}
            </div>
        </div>
    );
}

function ToggleItem({ icon, label, desc, iconBg, iconColor, active, onToggle }: {
    icon: string, label: string, desc: string, iconBg: string, iconColor: string, active: boolean, onToggle: () => void
}) {
    return (
        <div className="flex items-center justify-between gap-4 p-4 border-b border-slate-100 dark:border-white/5 last:border-0">
            <div className="flex items-center gap-3">
                <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
                    <span className="material-symbols-outlined text-xl">{icon}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-base font-black leading-none mb-1 uppercase tracking-tight italic">{label}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">{desc}</span>
                </div>
            </div>
            <ToggleSwitch active={active} onToggle={onToggle} />
        </div>
    );
}

function ToggleSwitch({ active, onToggle }: { active: boolean, onToggle: () => void }) {
    return (
        <label className="relative inline-flex cursor-pointer items-center">
            <input checked={active} className="sr-only peer" type="checkbox" onChange={onToggle} />
            <div className="peer h-7 w-12 rounded-full bg-slate-200 dark:bg-black/40 after:absolute after:start-[2px] after:top-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none shadow-inner"></div>
        </label>
    );
}
