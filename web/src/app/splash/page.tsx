'use client';

import React from 'react';

export default function SplashScreen() {
    return (
        <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-dark hex-pattern transition-colors duration-300 font-display">
            {/* Decorative Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/90 via-[#181711]/80 to-[#121212]/90 pointer-events-none"></div>

            {/* Main Content Area: Centered Logo */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-6">
                <div className="flex flex-col items-center justify-center gap-6">
                    {/* FH+ Emblem */}
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl border border-primary/20 bg-[#181711] shadow-glow animate-pulse-gold">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/5 to-transparent"></div>

                        <svg fill="none" height="80" viewBox="0 0 100 100" width="80" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 20 H50 V30 H32 V44 H48 V54 H32 V80 H20 V20 Z" fill="#f2d00d"></path>
                            <path d="M56 20 H68 V44 H82 V20 H94 V80 H82 V54 H68 V80 H56 V20 Z" fill="#f2d00d"></path>
                            <path d="M88 15 L98 15 L98 35 L88 35 Z" fill="#f2d00d" transform="rotate(45 93 25)"></path>
                        </svg>

                        <div className="absolute -right-4 -top-4 text-primary text-5xl font-black drop-shadow-glow-sm">+</div>
                    </div>

                    {/* App Name */}
                    <h1 className="text-primary tracking-tighter text-[40px] font-black leading-tight text-center uppercase italic">
                        FootballHub<span className="text-white">++</span>
                    </h1>
                </div>
            </div>

            {/* Bottom Area: Loading Indicator */}
            <div className="relative z-10 flex flex-col items-center gap-4 px-8 pb-32 pt-4">
                <div className="w-full max-w-[240px] flex flex-col gap-4">
                    <p className="text-[#bab59c] text-[10px] font-black uppercase tracking-[0.3em] text-center opacity-60">
                        Loading your world...
                    </p>

                    {/* Progress Bar */}
                    <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden border border-white/5">
                        <div className="h-full rounded-full bg-primary shadow-glow animate-progress"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
