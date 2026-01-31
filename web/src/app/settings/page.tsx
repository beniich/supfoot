'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
    const [toggles, setToggles] = useState({
        twoFactor: false,
        biometric: true,
        darkMode: true
    });

    const toggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-black min-h-screen">
            <div className="relative flex flex-col max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark min-h-screen pb-32">

                {/* Top App Bar */}
                <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-white/5 px-4 py-3 flex items-center justify-between">
                    <Link href="/profile" className="flex items-center gap-2 text-slate-900 dark:text-white cursor-pointer hover:text-primary transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
                    </Link>
                    <h1 className="text-sm font-black uppercase tracking-[0.3em] absolute left-1/2 -translate-x-1/2 italic">Settings HUB</h1>
                    <div className="w-8"></div>
                </header>

                {/* Profile Header Card */}
                <div className="px-6 py-8">
                    <div className="bg-surface-dark rounded-3xl p-6 shadow-2xl border border-white/5 flex items-center gap-5 group hover:border-primary/20 transition-all">
                        <div className="relative shrink-0">
                            <div className="w-20 h-20 rounded-2xl bg-cover bg-center border-2 border-primary shadow-glow transition-transform group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100')" }}></div>
                            <div className="absolute -bottom-2 -right-2 bg-primary text-black text-[9px] font-black px-2 py-1 rounded-lg border-2 border-surface-dark shadow-glow-sm">PRO</div>
                        </div>
                        <div className="flex flex-col justify-center flex-1 min-w-0">
                            <h2 className="text-2xl font-black truncate uppercase italic">Alex Morgan</h2>
                            <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest mt-1">
                                <span className="material-symbols-outlined filled text-sm">verified</span>
                                <span>Gold Elite Member</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Sections */}
                <main className="flex flex-col gap-8 px-6">

                    <SettingsSection title="Account Identity">
                        <SettingsItem icon="mail" label="Email" value="alex.morgan@pro.com" />
                        <SettingsItem icon="call" label="Phone" value="+1 (555) 123-4567" />
                        <SettingsItem icon="lock_reset" label="Security Patch" value="Update Required" highlight />
                    </SettingsSection>

                    <SettingsSection title="Nexus Security">
                        <ToggleItem
                            icon="security"
                            label="Two-Factor Auth"
                            desc="Protect your account assets"
                            active={toggles.twoFactor}
                            onToggle={() => toggle('twoFactor')}
                        />
                        <ToggleItem
                            icon="face"
                            label="Biometric Access"
                            desc="Face ID & Touch ID enabled"
                            active={toggles.biometric}
                            onToggle={() => toggle('biometric')}
                        />
                        <SettingsItem icon="devices" label="Manage Devices" value="3 Active" />
                    </SettingsSection>

                    <SettingsSection title="Data & Deep Privacy">
                        <Link href="/settings/privacy">
                            <SettingsItem icon="policy" label="Privacy Controls" value="Secured" />
                        </Link>
                        <SettingsItem icon="analytics" label="Neural Training Data" value="Optimized" />
                        <SettingsItem icon="gavel" label="Terms of Engagement" />
                    </SettingsSection>

                    {/* Log Out & Version */}
                    <div className="mt-4 pb-8 flex flex-col items-center gap-6">
                        <button className="w-full bg-white/5 border border-red-500/20 text-red-500 font-black py-5 rounded-2xl active:bg-red-500/10 transition-all uppercase tracking-[0.2em] text-xs shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                            Terminate Session
                        </button>
                        <div className="flex flex-col items-center gap-1 opacity-20">
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em]">FootballHub+ v4.12.0</p>
                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Build 2024.Elite</p>
                        </div>
                    </div>
                </main>

                {/* Bottom Bar Integration (Profile Link) */}
                <div className="fixed bottom-0 left-0 w-full bg-background-dark/95 backdrop-blur-xl border-t border-white/5 pb-10 pt-4 px-8 z-40">
                    <div className="flex justify-between items-center max-w-md mx-auto">
                        <Link href="/" className="flex flex-col items-center gap-1 group opacity-40 hover:opacity-100 transition-all">
                            <span className="material-symbols-outlined text-[26px]">home</span>
                        </Link>
                        <Link href="/stats" className="flex flex-col items-center gap-1 group opacity-40 hover:opacity-100 transition-all">
                            <span className="material-symbols-outlined text-[26px]">leaderboard</span>
                        </Link>
                        <Link href="/profile" className="flex flex-col items-center gap-1 group">
                            <span className="material-symbols-outlined text-primary shadow-glow-sm" style={{ fontSize: '28px', fontVariationSettings: "'FILL' 1" }}>person</span>
                        </Link>
                        <Link href="/settings" className="flex flex-col items-center gap-1 group opacity-40 hover:opacity-100 transition-all">
                            <span className="material-symbols-outlined text-[26px]">settings</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SettingsSection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-[10px] font-black text-gray-500 dark:text-[#bab59c] uppercase tracking-[0.3em] ml-2">{title}</h3>
            <div className="bg-surface-dark rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                {children}
            </div>
        </div>
    );
}

function SettingsItem({ icon, label, value, highlight = false }: { icon: string, label: string, value?: string, highlight?: boolean }) {
    return (
        <div className="flex items-center justify-between p-5 border-b border-white/5 active:bg-white/5 transition-all cursor-pointer group last:border-0">
            <div className="flex items-center gap-4 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/10 group-hover:bg-primary group-hover:text-black transition-all">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{icon}</span>
                </div>
                <span className="text-sm font-black uppercase tracking-tight italic transition-colors group-hover:text-primary">{label}</span>
            </div>
            <div className="flex items-center gap-3 pl-4 shrink-0">
                {value && <span className={`text-[10px] font-black uppercase tracking-widest ${highlight ? 'text-primary' : 'text-gray-500'}`}>{value}</span>}
                <span className="material-symbols-outlined text-gray-500 group-hover:text-white transition-colors" style={{ fontSize: '20px' }}>chevron_right</span>
            </div>
        </div>
    );
}

function ToggleItem({ icon, label, desc, active, onToggle }: { icon: string, label: string, desc: string, active: boolean, onToggle: () => void }) {
    return (
        <div className="flex items-center gap-4 bg-transparent px-5 py-5 justify-between border-b border-white/5 last:border-0 hover:bg-white/5 transition-all">
            <div className="flex items-center gap-4 flex-1">
                <div className={`flex items-center justify-center rounded-xl shrink-0 size-10 border transition-all ${active ? 'bg-primary border-primary text-black shadow-glow-sm' : 'bg-white/5 border-white/5 text-white/30'}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{icon}</span>
                </div>
                <div className="flex flex-col">
                    <p className="text-white text-sm font-black uppercase tracking-tight italic">{label}</p>
                    <p className="text-gray-500 dark:text-[#bab59c] text-[8px] font-black uppercase tracking-widest mt-1 opacity-60">{desc}</p>
                </div>
            </div>
            <button
                onClick={onToggle}
                className={`relative flex h-7 w-12 cursor-pointer items-center rounded-full transition-all duration-300 ${active ? 'bg-primary shadow-glow-sm' : 'bg-white/10'}`}
            >
                <div className={`h-5 w-5 rounded-full bg-white shadow-xl transition-all duration-300 ${active ? 'ml-6' : 'ml-1'}`}></div>
            </button>
        </div>
    );
}
