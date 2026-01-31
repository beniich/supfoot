'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
    const [toggles, setToggles] = useState({
        visibility: true,
        activity: false,
        ads: false,
        analytics: true
    });

    const toggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-black pb-24 min-h-screen">
            <div className="flex flex-col w-full max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark min-h-screen">

                {/* Header */}
                <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-white/5 h-20 flex items-center px-6">
                    <Link href="/settings" className="flex items-center justify-center size-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </Link>
                    <h1 className="text-sm font-black uppercase tracking-[0.3em] absolute left-1/2 -translate-x-1/2 italic">Privacy Vault</h1>
                    <div className="ml-auto w-12 flex justify-end">
                        <span className="material-symbols-outlined text-primary shadow-glow-sm filled">gpp_good</span>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    {/* Privacy Overview Card */}
                    <div className="p-6">
                        <div className="flex flex-col gap-6 rounded-3xl bg-surface-dark p-8 shadow-2xl border border-white/5 relative overflow-hidden group">
                            {/* Background Decoration */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transform group-hover:scale-110 transition-transform duration-1000"></div>

                            <div className="flex flex-col gap-2 z-10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="h-2 w-12 bg-primary rounded-full shadow-glow"></div>
                                    <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">Vault Shield: ACTIVE</p>
                                </div>
                                <h2 className="text-white text-3xl font-black leading-tight uppercase italic tracking-tighter">Your Data,<br />Your Control</h2>
                                <p className="text-gray-500 dark:text-[#bab59c] text-xs font-bold leading-relaxed mt-2 uppercase tracking-tight">
                                    Your profile visibility is optimized for maximum security. Review your 2024 audit below.
                                </p>
                            </div>

                            <div className="flex items-center gap-4 mt-4 z-10">
                                <button className="flex-1 flex items-center justify-center gap-3 bg-primary hover:scale-[1.02] active:scale-[0.98] text-black text-[10px] font-black uppercase tracking-widest py-4 rounded-xl shadow-glow transition-all">
                                    <span>Run Privacy Audit</span>
                                    <span className="material-symbols-outlined text-[18px] font-black">security_update_good</span>
                                </button>
                                <div className="size-14 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:text-primary transition-colors cursor-pointer group">
                                    <span className="material-symbols-outlined text-[24px]">troubleshoot</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Togglable Settings Sections */}
                    <div className="px-6 flex flex-col gap-10 mt-4">

                        <PrivacySection title="Social Visibility">
                            <ToggleItem
                                icon="visibility"
                                label="Profile Discovery"
                                desc="Allow matches & fans to find you"
                                active={toggles.visibility}
                                onToggle={() => toggle('visibility')}
                            />
                            <ToggleItem
                                icon="share"
                                label="Neural Activity"
                                desc="Share bets & performance scores"
                                active={toggles.activity}
                                onToggle={() => toggle('activity')}
                            />
                        </PrivacySection>

                        <PrivacySection title="Neural Data Assets">
                            <ToggleItem
                                icon="ads_click"
                                label="Elite Targeting"
                                desc="Tailored offers from club partners"
                                active={toggles.ads}
                                onToggle={() => toggle('ads')}
                            />
                            <ToggleItem
                                icon="analytics"
                                label="System Improvement"
                                desc="Anonymized data for hub training"
                                active={toggles.analytics}
                                onToggle={() => toggle('analytics')}
                            />
                        </PrivacySection>

                        {/* Critical Actions */}
                        <div className="flex flex-col gap-4 mt-4">
                            <button className="flex items-center justify-between w-full bg-surface-dark border border-white/5 rounded-2xl p-6 shadow-xl group hover:border-primary/20 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary transition-all">
                                        <span className="material-symbols-outlined">download</span>
                                    </div>
                                    <span className="text-white text-sm font-black uppercase tracking-tight italic">Extract My Data Vault</span>
                                </div>
                                <span className="material-symbols-outlined text-gray-500 group-hover:text-white transition-colors text-xl">arrow_right_alt</span>
                            </button>

                            <button className="flex items-center justify-center w-full rounded-2xl p-6 text-red-500 font-black uppercase tracking-widest text-[10px] hover:bg-red-500/10 transition-all gap-3 border border-red-500/10 active:scale-95">
                                <span className="material-symbols-outlined text-[20px]">delete_forever</span>
                                <span>Terminate Identity</span>
                            </button>

                            <p className="text-center text-[9px] font-black text-white/20 px-8 uppercase tracking-[0.2em] leading-relaxed">
                                Terminating your identity is IRREVERSIBLE. All betting history, fantasy rankings, and premium access will be purged.
                            </p>
                        </div>
                    </div>
                </main>

                <div className="h-20"></div>

                {/* Bottom Navigation (Mocked for Privacy View) */}
                <div className="fixed bottom-0 left-0 w-full bg-background-dark/95 backdrop-blur-xl border-t border-white/5 pb-10 pt-4 px-8 z-40">
                    <div className="flex justify-around items-center max-w-md mx-auto">
                        <Link href="/" className="opacity-40"><span className="material-symbols-outlined">home</span></Link>
                        <Link href="/matches" className="opacity-40"><span className="material-symbols-outlined">sports_soccer</span></Link>
                        <div className="relative flex flex-col items-center gap-1 text-primary">
                            <div className="absolute -top-4 w-10 h-1 bg-primary rounded-full shadow-glow"></div>
                            <span className="material-symbols-outlined filled scale-110 shadow-glow-sm">shield_person</span>
                        </div>
                        <Link href="/fantasy" className="opacity-40"><span className="material-symbols-outlined">psychology</span></Link>
                        <Link href="/profile" className="opacity-40"><span className="material-symbols-outlined">person</span></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PrivacySection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-[10px] font-black text-gray-500 dark:text-[#bab59c] uppercase tracking-[0.3em] ml-2 italic">{title}</h3>
            <div className="flex flex-col gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                {children}
            </div>
        </div>
    );
}

function ToggleItem({ icon, label, desc, active, onToggle }: {
    icon: string, label: string, desc: string, active: boolean, onToggle: () => void
}) {
    return (
        <div className="flex items-center gap-4 bg-surface-dark px-6 py-6 border-b border-white/5 last:border-0 group hover:bg-white/5 transition-all">
            <div className="flex items-center gap-5 flex-1">
                <div className={`flex items-center justify-center rounded-2xl shrink-0 size-12 border transition-all ${active ? 'bg-primary border-primary text-black shadow-glow-sm' : 'bg-white/5 border-white/5 text-white/20'}`}>
                    <span className="material-symbols-outlined text-[24px] font-black">{icon}</span>
                </div>
                <div className="flex flex-col">
                    <p className="text-white text-base font-black uppercase tracking-tight italic transition-colors group-hover:text-primary">{label}</p>
                    <p className="text-gray-500 dark:text-[#bab59c] text-[9px] font-black uppercase tracking-widest mt-1 opacity-60 leading-tight">{desc}</p>
                </div>
            </div>
            <button
                onClick={onToggle}
                className={`relative flex h-8 w-14 cursor-pointer items-center rounded-full transition-all duration-500 ${active ? 'bg-primary shadow-glow' : 'bg-white/10'}`}
            >
                <div className={`h-6 w-6 rounded-full bg-white shadow-2xl transition-all duration-500 ${active ? 'ml-7' : 'ml-1'}`}></div>
            </button>
        </div>
    );
}
