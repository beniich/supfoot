'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
    const [isProcessing, setIsProcessing] = useState(false);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen pb-40 selection:bg-primary selection:text-black">
            {/* Top App Bar */}
            <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4 justify-between border-b border-black/5 dark:border-white/5">
                <Link href="/shop" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h2 className="text-lg font-bold leading-tight tracking-tight">Checkout</h2>
                <div className="size-10"></div>
            </header>

            {/* Progress Indicators */}
            <div className="flex w-full flex-row items-center justify-center gap-2 py-8">
                <div className="h-1.5 w-12 rounded-full bg-primary shadow-glow"></div>
                <div className="h-1.5 w-12 rounded-full bg-primary shadow-glow"></div>
                <div className="h-1.5 w-12 rounded-full bg-primary shadow-glow"></div>
            </div>

            <main className="max-w-md mx-auto px-6 space-y-10">
                {/* Order Summary */}
                <section>
                    <h2 className="text-xl font-bold leading-tight pb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">shopping_basket</span>
                        Your Order
                    </h2>
                    <div className="flex items-center gap-4 bg-white dark:bg-surface-dark p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-background-dark border border-black/5 dark:border-white/5">
                            <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Jersey" />
                        </div>
                        <div className="flex flex-1 flex-col min-w-0">
                            <p className="text-base font-bold truncate">National Team Home Jersey</p>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Size: L • Qty: 1</p>
                        </div>
                        <div className="shrink-0">
                            <p className="text-lg font-bold text-primary">799 MAD</p>
                        </div>
                    </div>
                </section>

                {/* Delivery Address */}
                <section>
                    <h2 className="text-xl font-bold leading-tight pb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">location_on</span>
                        Delivery Address
                    </h2>
                    <div className="flex items-center gap-4 bg-white dark:bg-surface-dark p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="shrink-0 flex items-center justify-center size-12 rounded-2xl bg-primary/10 text-primary">
                            <span className="material-symbols-outlined">home</span>
                        </div>
                        <div className="flex flex-col flex-1">
                            <p className="text-sm font-bold">123 Stadium Avenue</p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Casablanca, Morocco 20000</p>
                        </div>
                        <button className="text-primary text-xs font-bold uppercase tracking-wider hover:underline">Change</button>
                    </div>
                </section>

                {/* Payment Method */}
                <section>
                    <h2 className="text-xl font-bold leading-tight pb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">payments</span>
                        Payment Method
                    </h2>
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden p-6 space-y-6 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Credit Card</span>
                            <div className="flex gap-1">
                                <div className="w-8 h-5 bg-slate-100 dark:bg-white/5 rounded flex items-center justify-center border border-black/5 dark:border-white/10">
                                    <span className="text-[10px] font-bold">VISA</span>
                                </div>
                                <div className="w-8 h-5 bg-slate-100 dark:bg-white/5 rounded flex items-center justify-center border border-black/5 dark:border-white/10">
                                    <span className="text-[10px] font-bold">MC</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Card Number</label>
                            <div className="relative flex items-center">
                                <span className="absolute left-4 text-slate-400 dark:text-white/20 material-symbols-outlined">credit_card</span>
                                <input className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-all placeholder-slate-400 dark:placeholder-white/10" placeholder="0000 0000 0000 0000" type="text" />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-[2]">
                                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Expiry</label>
                                <input className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-white/10 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-primary transition-all placeholder-slate-400 dark:placeholder-white/10" placeholder="MM / YY" type="text" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest">CVC</label>
                                <input className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-white/10 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-primary transition-all placeholder-slate-400 dark:placeholder-white/10" placeholder="123" type="password" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Breakdown */}
                <section className="pt-4 space-y-4">
                    <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
                        <span>750 MAD</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-slate-500 dark:text-slate-400">Tax & Fees</span>
                        <span>49 MAD</span>
                    </div>
                    <div className="h-px w-full bg-slate-200 dark:bg-white/5"></div>
                    <div className="flex justify-between items-end">
                        <span className="text-lg font-bold">Total Amount</span>
                        <span className="text-3xl font-bold text-primary tracking-tighter shadow-glow">799 MAD</span>
                    </div>
                </section>
            </main>

            {/* Floating Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-black/5 dark:border-white/10 p-6 pb-10 shadow-2xl max-w-md mx-auto">
                <Link
                    href="/shop/confirmation"
                    className="w-full bg-primary hover:scale-[1.02] active:scale-[0.98] transition-all rounded-2xl py-4 flex items-center justify-center gap-3 shadow-glow"
                    onClick={() => setIsProcessing(true)}
                >
                    <span className="text-background-dark font-bold text-lg">
                        {isProcessing ? 'Processing...' : 'Pay 799 MAD'}
                    </span>
                    {!isProcessing && <span className="material-symbols-outlined text-background-dark">lock</span>}
                </Link>
                <div className="flex items-center justify-center gap-2 mt-4 text-slate-400 dark:text-white/40">
                    <span className="material-symbols-outlined text-green-500 text-[16px] filled">verified_user</span>
                    <p className="text-[10px] font-bold uppercase tracking-widest">100% SECURE CHECKOUT VIA STRIPE</p>
                </div>
            </div>
        </div>
    );
}
