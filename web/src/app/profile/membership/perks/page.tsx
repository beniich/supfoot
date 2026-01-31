'use client';

import React from 'react';
import Link from 'next/link';

export default function PartnerPerksPage() {
    const perks = [
        {
            brand: 'Adidas',
            offer: '20% Off Outlet',
            code: 'FOOTBALLPLUS20',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
            logo: '👟',
            tier: 'Pro+'
        },
        {
            brand: 'MatchHotel',
            offer: '15% Off Match Stays',
            code: 'AWAYDAY15',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400',
            logo: '🏨',
            tier: 'Elite Only'
        },
        {
            brand: 'BeIN Sports',
            offer: 'Free Monthly Pass',
            code: 'REDEEMED',
            image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=400',
            logo: '📺',
            tier: 'Elite Only',
            isRedeemed: true
        },
        {
            brand: 'Uber Football',
            offer: 'Free Stadium Trip',
            code: 'STADIUM24',
            image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400',
            logo: '🚗',
            tier: 'Pro+'
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-white min-h-screen pb-24">
            <div className="max-w-md mx-auto flex flex-col min-h-screen shadow-2xl overflow-x-hidden bg-background-light dark:bg-background-dark">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-white/5">
                    <Link href="/profile/membership" className="size-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-lg font-black uppercase italic tracking-tight">Partner Perks</h1>
                    <div className="size-10"></div>
                </header>

                <main className="flex-1 p-6 space-y-8">
                    {/* Hero Info */}
                    <div className="space-y-4">
                        <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                            <p className="text-primary text-[10px] font-black uppercase tracking-widest">Membership Rewards</p>
                        </div>
                        <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Exclusive <span className="text-primary">Deals</span></h2>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
                            Hand-picked offers from our official partners, curated specifically for our community.
                        </p>
                    </div>

                    {/* Perks Grid */}
                    <div className="flex flex-col gap-6">
                        {perks.map((perk, idx) => (
                            <div key={idx} className="relative group overflow-hidden rounded-[2rem] bg-surface-dark border border-white/5 shadow-2xl transition-all hover:border-primary/30">
                                {/* Background Image with Blur/Gradient */}
                                <div className="absolute inset-x-0 top-0 h-32 overflow-hidden">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${perk.image})` }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/40 to-transparent"></div>
                                </div>

                                <div className="relative pt-24 p-6 flex flex-col gap-4">
                                    {/* Logo/Brand Icon */}
                                    <div className="absolute top-16 left-6 size-14 rounded-2xl bg-black border-4 border-surface-dark shadow-xl flex items-center justify-center text-2xl">
                                        {perk.logo}
                                    </div>

                                    <div className="flex justify-between items-start mt-4">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">{perk.offer}</h3>
                                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Brand Partner: {perk.brand}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${perk.tier.includes('Elite') ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 shadow-glow-sm' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                                            {perk.tier}
                                        </span>
                                    </div>

                                    {/* Code/Action Area */}
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between group-hover:border-primary/40 transition-colors">
                                            <span className="font-mono text-sm font-bold text-gray-300 tracking-wider">
                                                {perk.isRedeemed ? '••••••••••••' : perk.code}
                                            </span>
                                            <button className="text-primary hover:text-white transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                            </button>
                                        </div>
                                        <button className={`h-[46px] px-6 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${perk.isRedeemed ? 'bg-white/5 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark text-background-dark shadow-glow'}`}>
                                            {perk.isRedeemed ? 'Claimed' : 'Redeem'}
                                        </button>
                                    </div>

                                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tight italic">
                                        * Terms and conditions apply. One use per account.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Info */}
                    <div className="text-center py-6 border-t border-white/5 opacity-40">
                        <p className="text-[9px] font-black uppercase tracking-widest">Partner since 2024 • Verified by FootballHub+</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
