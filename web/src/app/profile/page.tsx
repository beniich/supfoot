'use client';

import React from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function ProfilePage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased overflow-x-hidden min-h-screen">
            <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto pb-32">
                {/* Header */}
                <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-black/5 dark:border-white/5">
                    <Link href="/" className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Profile</h2>
                    <Link href="/login" className="flex w-12 items-center justify-end group">
                        <span className="text-slate-500 dark:text-[#bab59c] group-hover:text-red-500 transition-colors text-sm font-bold leading-normal tracking-wide shrink-0">Logout</span>
                    </Link>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col items-center w-full px-4 pt-2 gap-6">
                    {/* Profile Header Section */}
                    <div className="flex flex-col w-full items-center gap-5 mt-2">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-br from-primary to-orange-500 rounded-full opacity-75 blur-sm group-hover:opacity-100 transition duration-500"></div>
                            <div className="relative w-32 h-32 rounded-full p-[3px] bg-background-dark">
                                <div
                                    className="w-full h-full rounded-full bg-cover bg-center border-2 border-background-dark"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop')" }}
                                ></div>
                            </div>
                            <button className="absolute bottom-1 right-1 bg-surface-dark border border-white/10 p-2 rounded-full text-white shadow-lg hover:bg-primary hover:text-black transition-colors">
                                <span className="material-symbols-outlined block text-[18px]">edit</span>
                            </button>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1">
                            <h1 className="text-slate-900 dark:text-white text-[26px] font-bold leading-tight tracking-tight text-center">Alex Morgan</h1>
                            <p className="text-slate-500 dark:text-[#bab59c] text-sm font-medium text-center">alex.morgan@footballhub.com</p>
                        </div>
                        <div className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-primary to-yellow-500 rounded-full shadow-glow">
                            <span className="material-symbols-outlined text-black mr-2 text-[18px] filled">verified</span>
                            <span className="text-black text-xs font-bold tracking-wider uppercase">VIP Member</span>
                        </div>
                    </div>

                    {/* Membership Status Card */}
                    <div className="w-full">
                        <div className="relative overflow-hidden rounded-2xl bg-surface-dark border border-white/5 shadow-xl">
                            {/* Background Decoration */}
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
                            <div className="relative p-5 flex flex-col gap-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex flex-col gap-1 text-white">
                                        <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">Current Tier</p>
                                        <h3 className="text-xl font-bold">Champions League</h3>
                                        <p className="text-white/60 text-xs">Renews: Oct 24, 2024</p>
                                    </div>
                                    <div className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-primary">
                                        <span className="material-symbols-outlined">trophy</span>
                                    </div>
                                </div>
                                {/* Progress Section */}
                                <div className="flex flex-col gap-2 mt-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-white text-sm font-medium">Loyalty Progress</span>
                                        <span className="text-primary text-sm font-bold">1,250 <span className="text-white/40 font-normal">/ 2,000</span></span>
                                    </div>
                                    <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-primary to-yellow-300 rounded-full" style={{ width: '62.5%' }}></div>
                                    </div>
                                    <p className="text-white/40 text-xs text-right italic">750 pts to Legend Tier</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Menu List */}
                    <div className="w-full flex flex-col gap-3 pb-6">
                        <ProfileMenuItem
                            icon="card_membership"
                            label="My Membership"
                            href="/profile/membership"
                            primary
                        />
                        <ProfileMenuItem
                            icon="loyalty"
                            label="Loyalty Rewards"
                            href="/loyalty"
                        />
                        <ProfileMenuItem
                            icon="diversity_3"
                            label="Refer a Friend"
                            href="/referral"
                        />
                        <ProfileMenuItem
                            icon="receipt_long"
                            label="Order History"
                            href="/profile/orders"
                        />
                        <ProfileMenuItem
                            icon="credit_card"
                            label="Payment Methods"
                            href="/profile/payments"
                        />
                        <ProfileMenuItem
                            icon="settings"
                            label="Settings Hub"
                            href="/settings"
                        />
                        <ProfileMenuItem
                            icon="handshake"
                            label="Partnerships"
                            href="/partners"
                        />
                        <ProfileMenuItem
                            icon="token"
                            label="Brand Assets"
                            href="/brand"
                        />
                        <ProfileMenuItem
                            icon="info"
                            label="About Us"
                            href="/about"
                        />
                        <ProfileMenuItem
                            icon="support_agent"
                            label="Help & Support"
                            href="/profile/support"
                        />
                        <button className="w-full mt-4 py-3 flex items-center justify-center text-red-500 font-bold hover:text-red-400 transition-colors text-sm uppercase tracking-widest">
                            Sign Out of Account
                        </button>
                    </div>
                </main>

                <BottomNav activeTab="profile" />
            </div>
        </div>
    );
}

function ProfileMenuItem({ icon, label, href = "#", primary = false }: { icon: string, label: string, href?: string, primary?: boolean }) {
    return (
        <Link href={href}>
            <button className="group w-full flex items-center gap-4 bg-surface-dark hover:bg-black transition-all p-4 rounded-xl border border-white/5 shadow-sm active:scale-[0.98]">
                <div className={`flex items-center justify-center rounded-full shrink-0 size-10 ${primary ? 'bg-primary/10 group-hover:bg-primary text-primary group-hover:text-black' : 'bg-white/5 group-hover:bg-white/10 text-white group-hover:text-primary'} transition-all`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
                <div className="flex flex-1 flex-col items-start">
                    <span className="text-white text-base font-bold tracking-tight">{label}</span>
                </div>
                <span className="material-symbols-outlined text-white/20 group-hover:text-primary transition-colors">chevron_right</span>
            </button>
        </Link>
    );
}
