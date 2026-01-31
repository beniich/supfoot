'use client';

import React from 'react';
import Link from 'next/link';

export default function MembershipActivationPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-white selection:bg-primary/30 min-h-screen">
            <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto overflow-x-hidden shadow-2xl">
                {/* Top App Bar */}
                <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-transparent">
                    <Link href="/profile/membership" className="text-white flex size-12 shrink-0 items-center justify-center hover:bg-white/10 rounded-xl transition-colors">
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </Link>
                    <h2 className="text-white text-lg font-black leading-tight tracking-tighter flex-1 text-center pr-12 uppercase italic">Activation</h2>
                </div>

                <div className="flex-1 flex flex-col items-stretch">
                    {/* Headline Section */}
                    <div className="pt-8 pb-4">
                        <h1 className="text-white tracking-tighter text-[32px] font-black leading-tight px-4 text-center uppercase italic">Setup Complete!</h1>
                        <p className="text-white/60 text-sm font-bold text-center mt-2 px-8 uppercase tracking-wide">Welcome to the inner circle of FootballHub+</p>
                    </div>

                    {/* Membership Card Section */}
                    <div className="p-6 relative">
                        {/* Subtle Gold Glow Behind Card */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
                        </div>
                        {/* Digital Membership Card */}
                        <div
                            className="relative z-10 bg-cover bg-center flex flex-col items-stretch justify-end rounded-2xl pt-[160px] shadow-glow border border-primary/20 overflow-hidden transform transition-transform hover:scale-[1.02]"
                            style={{ backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAmmsynUbRRVZ6_Fi_7rpDIbuKiTo3csRpXrayyHkSHuS6rTOmC9QAfO6THhbVEQQhMEsBNGmkuZiOy9-PCGxlTf_eS5oSOz-KBahISUkxZCsei2d5GypHUYMY-sHsK8Vgh2ioPfhIlOGc8H99rZMQF8gUVftJ_YTUimWLJrXp5F29c7U95dIRIj1cToleb7wcFlv-VcW1JPVL2X0Q2UZ3sZeYLaOhl-1BRYd31njs8yqIKQDjyiGjNG2Uy8x2gtUqu4o-D4iy8cP0")' }}
                        >
                            {/* Shimmer Overlay */}
                            <div className="absolute inset-0 pointer-events-none opacity-30" style={{ background: 'linear-gradient(135deg, rgba(242, 185, 13, 0.2) 0%, rgba(24, 22, 17, 0) 50%, rgba(242, 185, 13, 0.1) 100%)' }}></div>

                            {/* Card Details */}
                            <div className="flex w-full items-end justify-between gap-4 p-6 bg-black/40 backdrop-blur-sm">
                                <div className="flex max-w-[440px] flex-1 flex-col gap-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="material-symbols-outlined text-primary text-sm">verified</span>
                                        <p className="text-primary text-[10px] font-black tracking-[0.2em] uppercase">FootballHub+</p>
                                    </div>
                                    <p className="text-white tracking-tight text-xl font-black leading-tight uppercase">Alex Morgan</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-primary text-xs font-black leading-normal tracking-widest uppercase">Elite Member</p>
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#f2b90d]"></div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end opacity-60">
                                    <p className="text-[8px] text-white/80 uppercase font-bold tracking-widest">Member Since</p>
                                    <p className="text-[10px] text-white font-mono font-bold">2024</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checklists */}
                    <div className="px-6 py-4 flex-1">
                        <div className="bg-primary/5 rounded-[1.5rem] p-4 border border-white/5">
                            <CheckListItem label="Account Created" subLabel="Verified and secured" isChecked />
                            <CheckListItem label="Teams Followed" subLabel="Real-time updates active" isChecked />
                            <CheckListItem label="Rewards Activated" subLabel="Exclusive perks unlocked" isChecked isLast />
                        </div>
                    </div>

                    {/* CTA Button Section */}
                    <div className="px-6 py-8 mt-auto sticky bottom-0 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-20">
                        <Link href="/dashboard" className="w-full">
                            <button className="flex min-w-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-14 px-5 bg-primary hover:bg-yellow-400 text-[#181611] text-base font-black leading-normal tracking-wide active:scale-[0.98] transition-transform duration-100 shadow-glow uppercase italic">
                                <span className="truncate">Explore Dashboard</span>
                                <span className="material-symbols-outlined ml-2 text-[20px]">arrow_forward</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CheckListItem({ label, subLabel, isChecked, isLast }: { label: string, subLabel: string, isChecked?: boolean, isLast?: boolean }) {
    return (
        <label className={`flex gap-x-4 py-3 items-center ${!isLast ? 'border-b border-white/5' : ''}`}>
            <div className={`flex items-center justify-center h-6 w-6 rounded-full ${isChecked ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/20'}`}>
                <span className="material-symbols-outlined text-[18px] font-bold">check</span>
            </div>
            <div className="flex flex-col">
                <p className="text-white text-sm font-bold leading-tight uppercase tracking-tight">{label}</p>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-wide">{subLabel}</p>
            </div>
        </label>
    );
}
