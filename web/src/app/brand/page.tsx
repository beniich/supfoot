'use client';

import React from 'react';
import Link from 'next/link';

export default function BrandPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-black min-h-screen">
            <div className="relative flex flex-col max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark min-h-screen pb-32">

                {/* TopAppBar */}
                <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-primary/10">
                    <Link href="/about" className="flex items-center justify-center size-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-900 dark:text-white text-2xl">arrow_back</span>
                    </Link>
                    <h1 className="text-slate-900 dark:text-white text-lg font-black leading-tight tracking-tighter flex-1 text-center uppercase">
                        Brand Assets<span className="text-primary">+</span>
                    </h1>
                    <div className="flex w-10 items-center justify-end">
                        <span className="material-symbols-outlined text-primary scale-110">ios_share</span>
                    </div>
                </header>

                <main className="flex flex-col flex-1 gap-12">
                    {/* Hero Section with Main Icon */}
                    <div className="relative flex flex-col items-center justify-center pt-12 pb-6 px-10">
                        {/* Ambient Glow Behind Icon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>

                        {/* Main Icon Render */}
                        <div className="relative w-56 h-56 rounded-[50px] shadow-glow ring-2 ring-white/10 bg-gradient-to-br from-[#2a2a2a] to-[#0f0f0f] flex items-center justify-center overflow-hidden z-10 group cursor-pointer transition-transform hover:scale-105 active:scale-95 duration-500">
                            {/* Leather Texture Simulation overlay */}
                            <div className="absolute inset-0 opacity-20 mix-blend-overlay hex-pattern"></div>
                            {/* Gold Rim */}
                            <div className="absolute inset-0 rounded-[50px] border-2 border-primary/30"></div>

                            {/* Emblem Logo */}
                            <div className="relative flex flex-col items-center justify-center">
                                <svg fill="none" height="120" viewBox="0 0 100 100" width="120" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-glow">
                                    <path d="M20 20 H50 V30 H32 V44 H48 V54 H32 V80 H20 V20 Z" fill="#f2d00d"></path>
                                    <path d="M56 20 H68 V44 H82 V20 H94 V80 H82 V54 H68 V80 H56 V20 Z" fill="#f2d00d"></path>
                                </svg>
                                <div className="absolute -right-2 -top-2 text-primary text-5xl font-black drop-shadow-glow">+</div>
                            </div>

                            {/* Gloss/Shine Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
                        </div>

                        {/* Reflection Shadow */}
                        <div className="w-48 h-10 bg-gradient-to-b from-primary/10 to-transparent blur-2xl mt-8 opacity-50 rounded-[100%]"></div>

                        <div className="text-center mt-6">
                            <h2 className="text-white tracking-tighter text-4xl font-black leading-tight uppercase italic italic">The Elite Seal</h2>
                            <p className="text-gray-500 dark:text-[#bab59c] text-[10px] font-black leading-normal tracking-[0.4em] uppercase mt-2">Premium Variant • Gold Trimmed Leather</p>
                        </div>
                    </div>

                    {/* Scalability Preview */}
                    <section className="px-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white text-xl font-black tracking-tighter uppercase italic italic">Scalability</h3>
                            <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20 shadow-glow-sm tracking-widest uppercase">Adaptive Layout</span>
                        </div>
                        <div className="bg-surface-dark rounded-3xl p-8 border border-white/5 shadow-2xl backdrop-blur-sm">
                            <div className="flex items-end justify-around gap-6 w-full">
                                <IconVariant size={80} label="Home" pt="1024" />
                                <IconVariant size={56} label="Settings" pt="512" />
                                <IconVariant size={40} label="Notif" pt="128" />
                            </div>
                        </div>
                    </section>

                    {/* Color Engine Palette */}
                    <section className="px-8 pb-10">
                        <h3 className="text-white text-xl font-black tracking-tighter uppercase italic italic mb-6">Color Engine</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <ColorCard color="#F2D00D" name="ELITE GOLD" desc="Primary Momentum" />
                            <ColorCard color="#1A1A1A" name="CHARCOAL" desc="Foundation Layer" />
                        </div>
                    </section>

                    {/* Download Action */}
                    <div className="px-8 pb-12">
                        <button className="w-full flex items-center justify-center gap-4 bg-primary text-black font-black text-xs h-20 rounded-3xl hover:bg-primary-dark active:scale-[0.98] transition-all shadow-glow uppercase tracking-[0.2em]">
                            <span className="material-symbols-outlined font-black">download</span>
                            Download Asset Pack (SVG)
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

function IconVariant({ size, label, pt }: { size: number, label: string, pt: string }) {
    return (
        <div className="flex flex-col items-center gap-4">
            <div
                className="rounded-[22%] bg-gradient-to-br from-[#2a2a2a] to-[#0f0f0f] ring-1 ring-white/10 shadow-xl flex items-center justify-center relative overflow-hidden group"
                style={{ width: size, height: size }}
            >
                <div className="absolute inset-0 rounded-[22%] border border-primary/20"></div>
                <span className="text-primary font-black" style={{ fontSize: size * 0.35 }}>FH+</span>
            </div>
            <div className="text-center">
                <p className="text-[10px] text-gray-500 dark:text-[#bab59c] font-black uppercase tracking-widest">{label}</p>
                <p className="text-[8px] text-gray-400 font-mono mt-0.5 opacity-40">{pt}pt</p>
            </div>
        </div>
    );
}

function ColorCard({ color, name, desc }: { color: string, name: string, desc: string }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-3xl bg-surface-dark border border-white/5 active:scale-95 transition-all cursor-pointer group hover:border-primary/20">
            <div className="w-14 h-14 rounded-2xl shadow-glow-sm group-hover:scale-110 transition-transform" style={{ backgroundColor: color }}></div>
            <div className="flex flex-col justify-center">
                <p className="text-[12px] font-black text-white uppercase tracking-tight">{name}</p>
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest opacity-60">{color}</p>
            </div>
        </div>
    );
}
