'use client';

import React from 'react';
import Image from 'next/image';

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
                        <div className="relative w-24 h-24">
                            <Image src="/logo.svg" alt="FootballHub Logo" fill className="object-contain" />
                        </div>
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
