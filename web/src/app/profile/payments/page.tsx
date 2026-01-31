'use client';

import React from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function PaymentMethodsPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen pb-32">
            <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-black/5 dark:border-white/5">
                <Link href="/profile" className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h2 className="text-lg font-bold flex-1 text-center uppercase tracking-tight">Payment Methods</h2>
                <div className="size-10"></div>
            </header>

            <main className="max-w-md mx-auto px-6 pt-8 space-y-6">
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-slate-100 dark:bg-white/5 rounded border border-black/5 dark:border-white/10 flex items-center justify-center">
                                <span className="text-[10px] font-bold">VISA</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold">**** 4242</p>
                                <p className="text-xs text-slate-500">Expires 12/26</p>
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-widest">Default</span>
                    </div>
                    <button className="w-full py-3 text-red-500 text-xs font-bold uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">Remove Card</button>
                </div>

                <button className="w-full py-4 flex items-center justify-center gap-2 bg-primary hover:scale-[1.02] active:scale-[0.98] transition-all text-background-dark font-bold text-sm rounded-2xl shadow-glow">
                    <span className="material-symbols-outlined">add_card</span>
                    Add New Method
                </button>
            </main>

            <BottomNav activeTab="profile" />
        </div>
    );
}
