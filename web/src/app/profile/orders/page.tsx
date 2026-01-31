'use client';

import React from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function OrderHistoryPage() {
    const orders = [
        {
            id: 'FH-98234',
            product: 'Premium Analytics Annual',
            date: 'Oct 24, 2023',
            status: 'Delivered',
            amount: '1290 MAD',
            statusColor: 'green'
        },
        {
            id: 'FH-97112',
            product: 'Tactical Board Pro (Physical)',
            date: 'Sep 12, 2023',
            status: 'Shipped',
            amount: '450 MAD',
            statusColor: 'blue'
        },
        {
            id: 'FH-99001',
            product: 'Team Kit Bundle (20 Sets)',
            date: 'Nov 01, 2023',
            status: 'Processing',
            amount: '8500 MAD',
            statusColor: 'yellow'
        },
        {
            id: 'FH-91022',
            product: '1-Month Premium Trial',
            date: 'Aug 05, 2023',
            status: 'Cancelled',
            amount: '0 MAD',
            statusColor: 'red'
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col antialiased selection:bg-primary selection:text-background-dark text-slate-900 dark:text-white pb-32">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-black/5 dark:border-white/10">
                <div className="flex items-center justify-between p-4 h-16 max-w-md mx-auto w-full">
                    <Link href="/profile" className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back</span>
                    </Link>
                    <h1 className="text-lg font-bold tracking-tight uppercase">Order History</h1>
                    <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>tune</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-md mx-auto px-4 py-4">
                {/* Search Bar */}
                <div className="mb-6">
                    <label className="relative flex w-full items-center">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>search</span>
                        </div>
                        <input
                            className="block w-full rounded-2xl border-none bg-white dark:bg-surface-dark py-4 pl-12 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary shadow-sm"
                            placeholder="Search by ID or product..."
                            type="text"
                        />
                    </label>
                </div>

                {/* Filter Chips */}
                <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar pb-1">
                    <button className="shrink-0 h-10 px-6 rounded-full bg-primary text-background-dark text-xs font-bold uppercase tracking-widest shadow-glow active:scale-95 transition-all">
                        All Orders
                    </button>
                    <FilterChip label="Pending" />
                    <FilterChip label="Shipped" />
                    <FilterChip label="Delivered" />
                </div>

                {/* Order List */}
                <div className="flex flex-col gap-4">
                    {orders.map((order) => (
                        <div key={order.id} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-black/5 dark:border-white/5 transition-all hover:border-primary/50 hover:shadow-xl active:scale-[0.99] cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mb-1">Order #{order.id}</span>
                                    <h3 className="text-base font-bold leading-tight group-hover:text-primary transition-colors">{order.product}</h3>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 dark:text-white/30 whitespace-nowrap uppercase tracking-widest">{order.date}</span>
                            </div>

                            <div className="flex justify-between items-end mt-6">
                                <div className="flex items-center gap-2">
                                    <StatusBadge status={order.status} color={order.statusColor} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-slate-900 dark:text-primary shadow-glow-sm">{order.amount}</span>
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-all group-hover:translate-x-1" style={{ fontSize: '20px' }}>arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <BottomNav activeTab="profile" />
        </div>
    );
}

function FilterChip({ label }: { label: string }) {
    return (
        <button className="shrink-0 h-10 px-6 rounded-full bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5 text-slate-500 dark:text-white/40 text-xs font-bold uppercase tracking-widest whitespace-nowrap hover:bg-slate-50 dark:hover:bg-white/10 hover:text-primary dark:hover:text-primary transition-all active:scale-95">
            {label}
        </button>
    );
}

function StatusBadge({ status, color }: { status: string, color: string }) {
    const colorMap: Record<string, string> = {
        green: "bg-green-500/10 text-green-500 border-green-500/20",
        blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        yellow: "bg-primary/10 text-primary border-primary/20",
        red: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    const dotMap: Record<string, string> = {
        green: "bg-green-500",
        blue: "bg-blue-500",
        yellow: "bg-primary shadow-glow-sm",
        red: "bg-red-500",
    };

    return (
        <span className={`inline-flex items-center gap-2 rounded-lg border ${colorMap[color]} px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-sm`}>
            <span className={`size-2 rounded-full ${dotMap[color]}`}></span>
            {status}
        </span>
    );
}
