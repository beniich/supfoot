'use client';

import React from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function OrderConfirmationPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-32 min-h-screen">
            {/* Main Container */}
            <div className="relative flex flex-col overflow-x-hidden">
                {/* Top App Bar */}
                <div className="flex items-center p-4 pt-8 pb-4 justify-between sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
                    <Link href="/shop" className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">close</span>
                    </Link>
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Order Confirmation</h2>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">share</span>
                    </button>
                </div>

                {/* Success Animation & Hero */}
                <div className="flex flex-col items-center justify-center py-10 px-4">
                    <div className="relative w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-green-900/20 border-2 border-green-500/30 animate-scale-in">
                        <div className="absolute inset-0 rounded-full bg-green-500 blur-xl opacity-20"></div>
                        <span className="material-symbols-outlined text-green-500 text-6xl filled">check_circle</span>
                    </div>
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight px-4 text-center mb-2">Payment Successful!</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal px-4 text-center">Order #FH-98234 is confirmed</p>
                    <div className="mt-4 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
                        <p className="text-primary text-xs font-bold uppercase tracking-wider">Estimated Delivery: Oct 24 - Oct 26</p>
                    </div>
                </div>

                {/* What&apos;s Next? Section */}
                <div className="px-6 w-full max-w-md mx-auto">
                    <h3 className="text-slate-900 dark:text-white text-[20px] font-bold leading-tight tracking-tight mb-4">What&apos;s Next??</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Card 1: Track Order */}
                        <button className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-all active:scale-95 shadow-lg shadow-black/5">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                                <span className="material-symbols-outlined text-primary text-2xl">local_shipping</span>
                            </div>
                            <span className="text-slate-900 dark:text-white font-bold text-sm">Track Order</span>
                            <span className="text-slate-500 dark:text-slate-400 text-[10px] mt-1 text-center font-medium">View updates</span>
                        </button>
                        {/* Card 2: Continue Shopping */}
                        <Link href="/shop" className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-all active:scale-95 shadow-lg shadow-black/5">
                            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-3 group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">
                                <span className="material-symbols-outlined text-slate-600 dark:text-slate-300 text-2xl">shopping_bag</span>
                            </div>
                            <span className="text-slate-900 dark:text-white font-bold text-sm">Keep Shopping</span>
                            <span className="text-slate-500 dark:text-slate-400 text-[10px] mt-1 text-center font-medium">Browse gear</span>
                        </Link>
                    </div>
                </div>

                {/* Order Summary Widget */}
                <div className="px-6 w-full max-w-md mx-auto mt-8">
                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-xl shadow-black/5">
                        <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-white/5 pb-4">
                            <h4 className="text-slate-900 dark:text-white font-bold text-lg">Purchase Summary</h4>
                            <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider border border-green-500/20">Paid</span>
                        </div>

                        {/* Items */}
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-background-dark overflow-hidden flex-shrink-0 border border-black/5 dark:border-white/5">
                                    <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Jersey" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="text-slate-900 dark:text-white font-bold text-sm truncate">National Team Home Jersey</p>
                                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 font-medium">Size: L • Color: Red</p>
                                        </div>
                                        <p className="text-slate-900 dark:text-white font-bold text-sm ml-2">799 MAD</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 mt-6 border-t border-slate-100 dark:border-white/5">
                            <span className="text-slate-500 dark:text-slate-400 font-bold text-sm">Total Paid</span>
                            <span className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">799 MAD</span>
                        </div>

                        <div className="mt-8">
                            <button className="w-full flex items-center justify-center gap-2 bg-primary hover:scale-[1.02] active:scale-[0.98] text-background-dark font-bold text-sm py-4 rounded-xl transition-all shadow-glow">
                                <span className="material-symbols-outlined text-[20px]">download</span>
                                Download Receipt
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <BottomNav activeTab="shop" />
        </div>
    );
}
