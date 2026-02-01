'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MediaSubscriptionPage() {
    const [selectedRole, setSelectedRole] = useState<'photographer' | 'auditor'>('photographer');

    const plans = {
        photographer: {
            title: 'Elite Photographer',
            price: '19.99€',
            period: 'per month',
            description: 'Capture the game from the best angles with professional access and tools.',
            features: [
                'Sideline Access Pass',
                '100GB Cloud Storage',
                'Advanced Watermarking Tools',
                'Exclusive Media Badge',
                'Direct Upload to Match Gallery',
                'Portfolio Professional Page'
            ],
            color: 'from-blue-600 to-indigo-600',
            icon: 'camera',
        },
        auditor: {
            title: 'News Insider',
            price: '9.99€',
            period: 'per month',
            description: 'Deep dive into every story with ad-free audio and exclusive press content.',
            features: [
                'Ad-Free Live News Stream',
                'Daily Digital Press Review',
                'Exclusive Audio Interviews',
                'Verified "Reporter" Badge',
                'Offline Audio Downloads',
                'Early Access to Podcasts'
            ],
            color: 'from-orange-500 to-red-600',
            icon: 'headset',
        }
    };

    const activePlan = plans[selectedRole];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-white font-display antialiased pb-24 selection:bg-primary selection:text-black">
            {/* Header / Hero */}
            <div className={`relative h-[300px] overflow-hidden bg-gradient-to-br ${activePlan.color} flex items-center justify-center`}>
                <div className="absolute inset-0 opacity-20 pitch-pattern"></div>
                <div className="relative z-10 text-center px-6">
                    <motion.div
                        key={selectedRole}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="size-20 bg-white/20 backdrop-blur-xl rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-2xl border border-white/30"
                    >
                        <span className="material-symbols-outlined text-4xl filled">{activePlan.icon}</span>
                    </motion.div>
                    <h1 className="text-4xl font-black italic uppercase italic tracking-tighter mb-2">Media <span className="text-white/70">Subscription</span></h1>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-80">Professional Tools for Professional Fans</p>
                </div>

                {/* Curve decoration */}
                <div className="absolute -bottom-1 left-0 right-0 h-16 bg-background-dark" style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }}></div>
            </div>

            <main className="max-w-md mx-auto px-6 -mt-8 relative z-20">
                {/* Role Switcher */}
                <div className="flex bg-surface-dark p-1.5 rounded-2xl border border-white/10 shadow-xl mb-8">
                    <button
                        onClick={() => setSelectedRole('photographer')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedRole === 'photographer' ? 'bg-primary text-black' : 'text-gray-500 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined text-base">camera</span>
                        Photographer
                    </button>
                    <button
                        onClick={() => setSelectedRole('auditor')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedRole === 'auditor' ? 'bg-primary text-black' : 'text-gray-500 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined text-base">headset</span>
                        Auditor
                    </button>
                </div>

                {/* Pricing Card */}
                <motion.div
                    key={activePlan.title}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-surface-dark border border-white/5 rounded-[40px] p-8 shadow-2xl relative overflow-hidden group"
                >
                    {/* Background Glow */}
                    <div className={`absolute -right-20 -top-20 size-64 bg-gradient-to-br ${activePlan.color} blur-[100px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity`}></div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-2">{activePlan.title}</h2>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-primary">{activePlan.price}</span>
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{activePlan.period}</span>
                        </div>
                    </div>

                    <p className="text-sm text-gray-400 font-medium leading-relaxed mb-8 italic">
                        "{activePlan.description}"
                    </p>

                    <div className="space-y-4 mb-10">
                        {activePlan.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className={`size-4 rounded-full bg-gradient-to-br ${activePlan.color} flex items-center justify-center`}>
                                    <span className="material-symbols-outlined text-white text-[8px] font-black">check</span>
                                </div>
                                <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <button className="w-full bg-white text-black h-16 rounded-[20px] font-black text-lg uppercase tracking-tighter italic shadow-glow-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
                        Subscribe Now
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </motion.div>

                {/* FAQ / Trust badge */}
                <div className="mt-12 text-center space-y-4">
                    <div className="flex justify-center -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="size-10 rounded-full border-2 border-background-dark bg-gray-800 flex items-center justify-center overflow-hidden">
                                <span className="material-symbols-outlined text-xs text-gray-500">person</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Joined by 500+ professionals worldwide</p>
                </div>
            </main>

            {/* Back button */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                <Link href="/news" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">
                    Back to News Hub
                </Link>
            </div>
        </div>
    );
}
