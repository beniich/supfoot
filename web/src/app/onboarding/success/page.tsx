'use client';

import React from 'react';
import Link from 'next/link';

export default function OnboardingSuccessPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-white overflow-x-hidden font-sans min-h-screen flex flex-col justify-center">
            <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto shadow-2xl overflow-hidden bg-background-light dark:bg-background-dark">
                {/* Hero Section with Background Image */}
                <div className="relative w-full h-[45vh] overflow-hidden">
                    {/* Stadium Background */}
                    <div
                        className="absolute inset-0 bg-center bg-no-repeat bg-cover scale-110"
                        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(24, 22, 17, 0.4), #181611), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCd4E-07Hi3lkjzCHDv65LN4dcEerlpuHiVqDedG726pf9OZekc2J1ZfnqDgPRSWoV01QCClZ02GoML3TMI-mSQvVqISqn4ZaYigHioSm3C8N1gVCSOsyPe0w9LlDpOqjGyN7EGb7CZtV3BY2ZfywP4aFGrf57cqRUpe_7wEn0glHLybc2oMoi6-INjNzGVIh9en1PgAT3VexhrC0awEwVGcC2RHDMePdCQTmBJCqV9OxduEPaKtRGvGauaAyHymSjWrvnXfiPQJw")' }}
                    >
                    </div>
                    {/* Confetti Overlay Effect */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #f2b90d 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    {/* Success Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 border-2 border-primary">
                            <span className="material-symbols-outlined text-primary !text-5xl font-bold">
                                check
                            </span>
                            <div className="absolute inset-0 rounded-full animate-pulse border-4 border-primary/30 scale-125"></div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 px-6 -mt-10 relative z-10">
                    {/* Headline */}
                    <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight text-center pb-3 uppercase italic">
                        You&apos;re in the Club!
                    </h1>
                    {/* Personalized Body Text */}
                    <p className="text-[#bab29c] text-base font-normal leading-relaxed text-center px-2">
                        Welcome to the inner circle of football, <span className="text-primary font-bold">Alex</span>.
                        Your feed is being tailored to your favorite teams and players.
                    </p>
                    {/* Spacer */}
                    <div className="flex-grow min-h-[40px]"></div>
                    {/* Primary Action Button */}
                    <div className="flex py-6">
                        <Link href="/dashboard" className="w-full">
                            <button className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-14 px-5 bg-primary hover:bg-yellow-400 text-[#181611] text-lg font-black leading-normal tracking-wide shadow-glow transition-transform active:scale-95 uppercase italic">
                                <span className="truncate">Enter the Hub</span>
                                <span className="material-symbols-outlined ml-2 !text-2xl">
                                    sports_soccer
                                </span>
                            </button>
                        </Link>
                    </div>
                    {/* Action Panel / Quick Tip */}
                    <div className="pb-10">
                        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#544e3b] bg-[#181611]/80 backdrop-blur-sm p-5">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-outlined text-primary !text-xl">lightbulb</span>
                                    <p className="text-white text-base font-bold leading-tight uppercase tracking-tight">Quick Tip</p>
                                </div>
                                <p className="text-[#bab29c] text-sm font-medium leading-normal">
                                    Enable notifications for live scores, VAR updates, and breaking transfer news before anyone else.
                                </p>
                            </div>
                            <Link href="/notifications/preferences" className="text-sm font-bold leading-normal tracking-wide flex items-center gap-2 text-primary hover:text-white transition-colors uppercase">
                                Enable Notifications
                                <span className="material-symbols-outlined !text-lg">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* iOS Bottom Indicator Spacer */}
                <div className="h-8 bg-background-light dark:bg-background-dark"></div>
            </div>
        </div>
    );
}
