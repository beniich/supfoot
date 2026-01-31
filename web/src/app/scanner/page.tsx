'use client';

import React from 'react';
import Link from 'next/link';

export default function StadiumScannerPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-white overflow-hidden h-screen flex flex-col">
            {/* Main Scanner Viewport */}
            <div className="relative h-full w-full bg-black flex flex-col">
                {/* Camera Viewfinder (Simulated with Background) */}
                <div className="absolute inset-0 z-0">
                    <div
                        className="w-full h-full bg-cover bg-center opacity-80"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB1Mk-CVXOVsZnMBdZ6SfXZKvKBN4ON98XO8yi9vsuFibiyymZwxINQT688Cagkzx7X79WvXK8ClDArRVYRhAtkF5wM_sdZSIKOEhmVueAlAAK27KFXJNYVGqViG9zxuwutWfjKXynChM92L6EMavOcuuNbDtVG8NwAXjlxBT2lTm-cFkDh_7oXEaoewvfVl5eK4GUyL_AeQUma8ES-DibLjZ7kcc_0DBAowBI7vYFQGZPYo5LKcXYPW_BWFce8plpfLl-mPPbU4IQ")' }}
                    >
                    </div>
                    {/* Dark Overlay for focus - using explicit styles for mask simulation since tailwind mask utilities might be limited without config */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" style={{ maskImage: 'radial-gradient(circle 160px at center, transparent 100%, black 100%)', WebkitMaskImage: 'radial-gradient(circle 160px at center, transparent 100%, black 100%)' }}></div>
                </div>

                {/* Top App Bar */}
                <div className="relative z-20 flex items-center bg-black/20 backdrop-blur-md p-4 pb-2 justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="bg-primary/20 p-2 rounded-xl text-primary hover:bg-primary/30 transition-colors">
                            <span className="material-symbols-outlined text-2xl">stadium</span>
                        </Link>
                        <div>
                            <h2 className="text-white text-base font-black leading-none tracking-tight uppercase italic">FootballHub+</h2>
                            <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest mt-1">Staff Access Pro</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center justify-center rounded-xl size-10 bg-black/40 text-white hover:bg-black/60 transition-colors">
                            <span className="material-symbols-outlined text-2xl">bolt</span>
                        </button>
                        <button className="flex items-center justify-center rounded-xl size-10 bg-black/40 text-white hover:bg-black/60 transition-colors">
                            <span className="material-symbols-outlined text-2xl">flip_camera_ios</span>
                        </button>
                    </div>
                </div>

                {/* Scanning Area */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center pb-32 pointer-events-none">
                    <div className="w-64 h-64 relative flex items-center justify-center">
                        {/* Manual CSS borders for scanner frame corners */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-xl shadow-glow-sm"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-xl shadow-glow-sm"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-xl shadow-glow-sm"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-xl shadow-glow-sm"></div>

                        {/* Animated Scan Line */}
                        <div className="absolute inset-x-0 h-[2px] bg-primary/40 top-1/2 -translate-y-1/2 blur-[1px] animate-pulse"></div>
                    </div>
                    <p className="mt-8 text-white/80 text-xs font-bold uppercase tracking-widest bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
                        Align QR code within the frame
                    </p>
                </div>

                {/* Bottom Sheet / Recent Scans */}
                <div className="relative z-30 flex flex-col justify-end items-stretch mt-auto">
                    <div className="flex flex-col items-stretch bg-background-light dark:bg-background-dark rounded-t-[2rem] shadow-2xl border-t border-white/10">
                        {/* Handle */}
                        <div className="flex h-6 w-full items-center justify-center">
                            <div className="h-1.5 w-12 rounded-full bg-black/10 dark:bg-white/20"></div>
                        </div>

                        {/* Section Header */}
                        <div className="flex items-center justify-between px-6 pt-2 pb-1">
                            <h3 className="text-slate-900 dark:text-white text-lg font-black leading-tight tracking-tighter uppercase italic">Recent Scans</h3>
                            <span className="text-[10px] text-primary font-black uppercase tracking-widest px-2 py-1 bg-primary/10 rounded-lg">Live Feed</span>
                        </div>

                        {/* List Item (Active Success) */}
                        <div className="px-4 pb-4 pt-2">
                            <div className="flex items-center gap-4 bg-green-500/10 border border-green-500/20 rounded-2xl px-4 min-h-[88px] py-3 justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="text-green-500 flex items-center justify-center rounded-2xl bg-green-500/20 shrink-0 size-14">
                                        <span className="material-symbols-outlined text-3xl font-bold">check_circle</span>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="text-slate-900 dark:text-white text-lg font-black leading-tight uppercase tracking-tight">Access Granted</p>
                                        <p className="text-gray-500 dark:text-white/70 text-sm font-bold leading-normal mt-0.5 uppercase tracking-wide">
                                            Alex Wright <span className="mx-1">•</span> <span className="text-green-600 dark:text-green-400">Gate 4</span>
                                        </p>
                                        <p className="text-gray-400 dark:text-white/40 text-[10px] font-bold mt-1 flex items-center gap-1 uppercase tracking-wider">
                                            <span className="material-symbols-outlined text-[14px]">confirmation_number</span>
                                            ID: FH-9928-1102
                                        </p>
                                    </div>
                                </div>
                                <div className="shrink-0 self-start pt-1">
                                    <p className="text-gray-400 dark:text-white/50 text-[10px] font-bold uppercase tracking-wide">Just now</p>
                                </div>
                            </div>
                        </div>

                        {/* Previous Items (Subtle) */}
                        <div className="px-4 pb-2 opacity-50">
                            <div className="flex items-center gap-4 bg-gray-100 dark:bg-white/5 rounded-2xl px-4 min-h-[64px] py-2 justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="text-gray-400 dark:text-white/40 flex items-center justify-center rounded-xl bg-gray-200 dark:bg-white/5 shrink-0 size-10">
                                        <span className="material-symbols-outlined text-xl">check_circle</span>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-tight line-clamp-1">Sarah Jenkins • Gate 4</p>
                                        <p className="text-gray-500 dark:text-white/50 text-[10px] font-bold uppercase tracking-wide">2 mins ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tab Bar Navigation (iOS Style) */}
                        <div className="flex items-center justify-around bg-background-light/95 dark:bg-black/40 backdrop-blur-xl border-t border-black/5 dark:border-white/5 pt-3 pb-safe px-6">
                            <NavButton icon="dashboard" label="Dashboard" href="#" />
                            <div className="flex flex-col items-center gap-1 text-primary -mt-6">
                                <div className="bg-primary hover:bg-yellow-400 px-4 py-3 rounded-full mb-1 shadow-glow transition-colors cursor-pointer text-black">
                                    <span className="material-symbols-outlined text-2xl">qr_code_scanner</span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-wide">Scanner</span>
                            </div>
                            <NavButton icon="history" label="History" href="#" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NavButton({ icon, label, href }: { icon: string, label: string, href: string }) {
    return (
        <Link href={href} className="flex flex-col items-center gap-1 group w-16">
            <span className="material-symbols-outlined text-2xl text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{icon}</span>
            <span className="text-[10px] font-bold text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors uppercase tracking-wide">{label}</span>
        </Link>
    );
}
