'use client';

import React from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function BillingPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-white antialiased min-h-screen flex flex-col">
            <div className="relative flex flex-col max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark min-h-screen pb-32 w-full">
                {/* Top App Bar */}
                <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-black/5 dark:border-white/5 pb-2 pt-4 px-4">
                    <div className="flex items-center justify-between">
                        <Link href="/profile/membership" className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors bg-white/5 border border-white/10">
                            <span className="material-symbols-outlined text-2xl">arrow_back</span>
                        </Link>
                        <h1 className="text-slate-900 dark:text-white text-lg font-black leading-tight tracking-tighter flex-1 text-center uppercase italic">Billing & Invoices</h1>
                        <div className="flex w-10 items-center justify-end">
                            <button className="flex items-center justify-center rounded-xl size-10 text-slate-900 dark:text-white hover:text-primary transition-colors hover:bg-white/5">
                                <span className="material-symbols-outlined text-2xl">help</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto no-scrollbar pb-6 w-full">
                    {/* Subscription Status Card */}
                    <div className="px-4 py-6">
                        <h2 className="text-slate-900 dark:text-white text-xl font-black mb-4 tracking-tighter uppercase italic">Subscription Status</h2>
                        <div className="bg-white dark:bg-[#2a2820] rounded-2xl p-5 border border-black/5 dark:border-white/5 relative overflow-hidden group shadow-sm">
                            {/* Decorative background accent */}
                            <div className="absolute -right-10 -top-10 size-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
                            <div className="relative z-10 flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-gray-500 dark:text-[#bab59c] text-[10px] font-black uppercase tracking-widest mb-1">Current Plan</p>
                                    <h3 className="text-slate-900 dark:text-white text-2xl font-black tracking-tight uppercase">FootballHub+ VIP</h3>
                                </div>
                                <span className="bg-primary/20 text-primary text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider border border-primary/20 shadow-glow-sm">Active</span>
                            </div>
                            <div className="relative z-10 flex items-center gap-3 text-gray-500 dark:text-[#bab59c] text-sm border-t border-black/5 dark:border-white/10 pt-4 mt-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">calendar_month</span>
                                <span className="font-bold uppercase tracking-tight text-xs">Next billing: <span className="text-slate-900 dark:text-white">Oct 24, 2023</span></span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods Section */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between px-4 pb-1">
                            <h2 className="text-slate-900 dark:text-white text-xl font-black tracking-tighter uppercase italic">Payment Methods</h2>
                            <span className="material-symbols-outlined text-gray-400 text-sm">lock</span>
                        </div>

                        {/* Cards Carousel */}
                        <div className="flex overflow-x-auto no-scrollbar px-4 gap-4 pb-4 snap-x snap-mandatory">
                            <PaymentCard
                                bgClass="bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a]"
                                last4="4242"
                                exp="12/25"
                                isDefault
                            />
                            <PaymentCard
                                bgClass="bg-gradient-to-br from-[#2c2a22] to-[#181711]"
                                last4="8821"
                                exp="09/24"
                            />
                        </div>

                        {/* Add Button */}
                        <div className="px-4">
                            <button className="w-full flex items-center justify-center gap-2 rounded-2xl h-12 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-dashed border-gray-300 dark:border-white/20 text-primary font-black text-xs uppercase tracking-widest transition-all active:scale-[0.98]">
                                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                                Add Payment Method
                            </button>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="mt-8">
                        <h2 className="text-slate-900 dark:text-white text-xl font-black px-4 mb-4 tracking-tighter uppercase italic">Past Transactions</h2>
                        <div className="flex flex-col px-4 gap-3">
                            <TransactionItem
                                month="Sep"
                                day="24"
                                title="VIP Monthly Subscription"
                                id="FH-994201"
                                amount="-$12.99"
                            />
                            <TransactionItem
                                month="Sep"
                                day="10"
                                title="Shop Purchase"
                                id="FH-882"
                                amount="-$45.00"
                                note="Official Jersey Kit"
                            />
                            <TransactionItem
                                month="Aug"
                                day="24"
                                title="VIP Monthly Subscription"
                                id="FH-812039"
                                amount="-$12.99"
                            />
                        </div>
                        <div className="p-6 text-center">
                            <button className="text-gray-500 dark:text-[#bab59c] text-xs font-black uppercase tracking-widest hover:text-primary transition-colors flex items-center justify-center gap-1 mx-auto">
                                View older transactions
                                <span className="material-symbols-outlined text-[16px]">expand_more</span>
                            </button>
                        </div>
                    </div>
                </main>

                <BottomNav activeTab="profile" />
            </div>
        </div>
    );
}

function PaymentCard({ bgClass, last4, exp, isDefault = false }: { bgClass: string, last4: string, exp: string, isDefault?: boolean }) {
    return (
        <div className={`snap-center shrink-0 w-[280px] h-[160px] rounded-2xl relative overflow-hidden flex flex-col justify-between p-5 ${bgClass} border border-white/10 shadow-lg group`}>
            {/* Abstract card pattern */}
            <div className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)' }}></div>

            <div className="relative z-10 flex justify-between items-start">
                <div className="h-6 w-10 bg-white/20 rounded ml-0"></div> {/* Generic card logo placeholder */}
                {isDefault && (
                    <span className="bg-white/20 backdrop-blur-sm text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Default</span>
                )}
            </div>

            <div className="relative z-10">
                <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest mb-1">Card Number</p>
                <p className="text-white text-lg font-mono tracking-widest">•••• {last4}</p>
            </div>

            <div className="relative z-10 flex justify-between items-center text-xs text-white/80">
                <span className="font-mono">Exp {exp}</span>
                <span className="font-black uppercase tracking-widest">J. Doe</span>
            </div>
        </div>
    );
}

function TransactionItem({ month, day, title, id, amount, note }: { month: string, day: string, title: string, id: string, amount: string, note?: string }) {
    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-[#22201a] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 text-center shrink-0">
                    <span className="text-[9px] uppercase font-black text-gray-500 tracking-wider">{month}</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white leading-none">{day}</span>
                </div>
                <div className="flex flex-col">
                    <p className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-tight">{title}</p>
                    <p className="text-gray-500 text-[10px] uppercase tracking-wide font-bold">ID: {id}</p>
                    {note && <p className="text-primary text-[10px] uppercase tracking-wide font-bold mt-0.5">{note}</p>}
                </div>
            </div>
            <div className="flex flex-col items-end gap-1">
                <span className="text-slate-900 dark:text-white font-black text-sm">{amount}</span>
                <button aria-label="Download Invoice" className="text-gray-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">download</span>
                </button>
            </div>
        </div>
    );
}
