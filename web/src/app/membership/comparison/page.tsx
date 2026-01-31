'use client';

import React from 'react';
import Link from 'next/link';

export default function MembershipComparisonPage() {
    const features = [
        { name: 'Live Match Center', free: 'Basic', pro: 'Advanced', elite: 'Ultra HD + Stats', proIcon: 'check_circle', eliteIcon: 'star' },
        { name: 'AI Predictions', free: false, pro: '10/week', elite: 'Unlimited + Expert', proIcon: 'check_circle', eliteIcon: 'star' },
        { name: 'Referee Analytics', free: false, pro: 'Basic', elite: 'Pro Visualization', proIcon: 'check_circle', eliteIcon: 'star' },
        { name: 'Digital Ticket Access', free: 'Public Sale', pro: 'Priority', elite: 'VIP + Lounge', proIcon: 'check_circle', eliteIcon: 'star' },
        { name: 'Store Discount', free: '0%', pro: '10%', elite: '25% + Early Access', proIcon: 'check_circle', eliteIcon: 'star' },
        { name: 'Ad-Free Experience', free: false, pro: true, elite: true, proIcon: 'check_circle', eliteIcon: 'star' },
        { name: 'Community Badge', free: 'Fan', pro: 'Silver', elite: 'Gold Legend', proIcon: 'check_circle', eliteIcon: 'star' },
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-white min-h-screen pb-24">
            <div className="max-w-md mx-auto flex flex-col min-h-screen shadow-2xl overflow-x-hidden bg-background-light dark:bg-background-dark">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-white/5">
                    <Link href="/membership" className="size-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-lg font-black uppercase italic tracking-tight">Compare Plans</h1>
                    <div className="size-10"></div>
                </header>

                <main className="flex-1 p-6 space-y-8">
                    {/* Hero */}
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Find Your Perfect <span className="text-primary">Tier</span></h2>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Upgrade to unlock the ultimate football experience</p>
                    </div>

                    {/* Comparison Table */}
                    <div className="bg-surface-dark rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                        {/* Table Header */}
                        <div className="grid grid-cols-4 p-4 bg-white/5 border-b border-white/5 items-center">
                            <div className="col-span-1"></div>
                            <div className="text-center text-[9px] font-black uppercase tracking-widest text-gray-400">Standard</div>
                            <div className="text-center text-[9px] font-black uppercase tracking-widest text-primary shadow-glow-sm">Pro</div>
                            <div className="text-center text-[9px] font-black uppercase tracking-widest text-yellow-500 neon-text">Elite</div>
                        </div>

                        {/* Features */}
                        <div className="divide-y divide-white/5">
                            {features.map((feature, idx) => (
                                <div key={idx} className="grid grid-cols-4 p-4 items-center hover:bg-white/5 transition-colors">
                                    <div className="col-span-1">
                                        <p className="text-[10px] font-bold text-white uppercase leading-tight">{feature.name}</p>
                                    </div>

                                    {/* Standard */}
                                    <div className="text-center">
                                        {feature.free === false ? (
                                            <span className="material-symbols-outlined text-gray-600 text-[18px]">close</span>
                                        ) : (
                                            <span className="text-[10px] font-bold text-gray-500 uppercase">{feature.free === true ? 'Yes' : feature.free}</span>
                                        )}
                                    </div>

                                    {/* Pro */}
                                    <div className="text-center bg-primary/5 py-2">
                                        {feature.pro === false ? (
                                            <span className="material-symbols-outlined text-gray-600 text-[18px]">close</span>
                                        ) : (
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="material-symbols-outlined text-primary text-[18px] filled">{feature.proIcon}</span>
                                                <span className="text-[9px] font-black text-primary uppercase">{feature.pro === true ? '' : feature.pro}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Elite */}
                                    <div className="text-center bg-yellow-500/5 py-2">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="material-symbols-outlined text-yellow-500 text-[18px] filled neon-text">{feature.eliteIcon}</span>
                                            <span className="text-[9px] font-black text-yellow-500 uppercase">{feature.elite === true ? '' : feature.elite}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Detailed Elite Perks */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-black uppercase italic tracking-tight flex items-center gap-2">
                            <span className="material-symbols-outlined text-yellow-600 filled">military_tech</span>
                            Exclusive Elite Perks
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            <PerkItem
                                icon="diamond"
                                title="24/7 Concierge"
                                desc="Dedicated support for ticket booking and travel arrangements."
                            />
                            <PerkItem
                                icon="stadium"
                                title="Lounge Access"
                                desc="Complimentary access to partner VIP lounges on match days."
                            />
                            <PerkItem
                                icon="diversity_3"
                                title="Player Meetups"
                                desc="Quarterly digital or physical meet & greet sessions."
                            />
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="pt-6">
                        <button className="w-full bg-primary hover:bg-primary-dark text-background-dark font-black text-lg py-5 rounded-2xl shadow-glow transition-all active:scale-95 uppercase italic tracking-tighter">
                            Upgrade to Elite — 199.99 Dhs
                        </button>
                        <p className="text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-4">
                            30-Day Money Back Guarantee • Secure Payment
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}

function PerkItem({ icon, title, desc }: { icon: string, title: string, desc: string }) {
    return (
        <div className="flex gap-4 p-4 bg-surface-dark border border-white/5 rounded-2xl hover:border-yellow-600/30 transition-all">
            <div className="size-10 bg-yellow-600/10 rounded-xl flex items-center justify-center text-yellow-600 shrink-0">
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div>
                <h4 className="text-sm font-black text-white uppercase italic">{title}</h4>
                <p className="text-xs text-gray-400 font-medium leading-relaxed mt-1">{desc}</p>
            </div>
        </div>
    );
}
