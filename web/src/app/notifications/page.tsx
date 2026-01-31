'use client';

import React, { useState } from 'react';
import BottomNav from '@/components/BottomNav';

export default function NotificationsPage() {
    const [filter, setFilter] = useState<'All' | 'Unread'>('All');

    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-black min-h-screen">
            <div className="relative flex flex-col max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark min-h-screen pb-32">

                {/* Top App Bar */}
                <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-black/5 dark:border-white/5">
                    <h2 className="text-xl font-black leading-tight uppercase italic tracking-tighter flex-1">Notifications</h2>
                    <button className="flex items-center justify-end hover:opacity-80 transition-opacity">
                        <p className="text-[#bab59c] text-[10px] font-black uppercase tracking-widest">Mark all read</p>
                    </button>
                </header>

                {/* Segmented Control */}
                <div className="px-4 py-4 bg-background-light dark:bg-background-dark">
                    <div className="flex h-10 w-full items-center justify-center rounded-xl bg-gray-200 dark:bg-[#393728] p-1">
                        <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 transition-all duration-200 group ${filter === 'All' ? 'bg-white dark:bg-background-dark shadow-sm' : ''}`}>
                            <span className={`text-sm font-bold uppercase tracking-tight ${filter === 'All' ? 'text-primary' : 'text-gray-500 dark:text-[#bab59c]'}`}>All</span>
                            <input
                                checked={filter === 'All'}
                                className="invisible w-0 h-0 absolute"
                                name="filter"
                                type="radio"
                                value="All"
                                onChange={() => setFilter('All')}
                            />
                        </label>
                        <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 transition-all duration-200 group ${filter === 'Unread' ? 'bg-white dark:bg-background-dark shadow-sm' : ''}`}>
                            <span className={`text-sm font-bold uppercase tracking-tight ${filter === 'Unread' ? 'text-primary' : 'text-gray-500 dark:text-[#bab59c]'}`}>Unread</span>
                            <input
                                checked={filter === 'Unread'}
                                className="invisible w-0 h-0 absolute"
                                name="filter"
                                type="radio"
                                value="Unread"
                                onChange={() => setFilter('Unread')}
                            />
                        </label>
                    </div>
                </div>

                {/* Notification List */}
                <div className="flex-1 overflow-y-auto pb-6">
                    {/* Section: Today */}
                    <div className="sticky top-[72px] z-10 bg-background-light dark:bg-background-dark">
                        <h3 className="text-gray-800 dark:text-white text-base font-black uppercase italic tracking-tight px-4 pb-2 pt-2">Today</h3>
                    </div>

                    <NotificationItem
                        icon="sports_soccer"
                        iconBg="bg-gray-100 dark:bg-[#393728]"
                        title="Man City 2 - 1 Liverpool"
                        description={<><span className="text-primary font-bold">Goal!</span> Julian Alvarez (88&apos;) hammers it into the top corner!</>}
                        time="2m ago"
                        unread
                    />

                    <NotificationItem
                        icon="smart_toy"
                        iconBg="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20"
                        iconColor="text-primary filled"
                        title="Real Madrid vs. Barcelona"
                        description="New AI prediction available. High confidence on Over 2.5 Goals."
                        time="2h ago"
                        unread
                    />

                    {/* Section: Yesterday */}
                    <div className="sticky top-[72px] z-10 bg-background-light dark:bg-background-dark">
                        <h3 className="text-gray-800 dark:text-white text-base font-black uppercase italic tracking-tight px-4 pb-2 pt-6">Yesterday</h3>
                    </div>

                    <NotificationItem
                        icon="shopping_bag"
                        iconBg="bg-gray-100 dark:bg-[#393728]"
                        title="Flash Sale: 2024 Kits"
                        description="Get 20% off all new season jerseys. Limited time offer for premium members."
                        time="1d ago"
                        thumbnail="https://images.unsplash.com/photo-1522770179533-24471fcdba45"
                    />

                    <NotificationItem
                        icon="settings"
                        iconBg="bg-gray-100 dark:bg-[#393728]"
                        iconColor="text-gray-500 dark:text-gray-400"
                        title="Subscription Renewed"
                        description="Your FootballHub+ Premium subscription was successfully renewed."
                        time="1d ago"
                    />

                    <NotificationItem
                        icon="sports_soccer"
                        iconBg="bg-gray-100 dark:bg-[#393728]"
                        iconColor="text-gray-500 dark:text-gray-400"
                        title="Arsenal 1 - 0 Chelsea"
                        description="Full time stats are now available for review."
                        time="1d ago"
                    />

                    {/* Loading indicator */}
                    <div className="p-8 flex flex-col items-center justify-center opacity-20">
                        <div className="w-1 h-1 bg-white rounded-full mb-1"></div>
                        <div className="w-1 h-1 bg-white rounded-full mb-1"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                </div>

                <BottomNav activeTab="profile" />
            </div>
        </div>
    );
}

function NotificationItem({
    icon,
    iconBg,
    iconColor = 'text-gray-900 dark:text-white',
    title,
    description,
    time,
    unread = false,
    thumbnail
}: {
    icon: string,
    iconBg: string,
    iconColor?: string,
    title: string,
    description: React.ReactNode,
    time: string,
    unread?: boolean,
    thumbnail?: string
}) {
    return (
        <div className={`group relative flex items-start gap-4 px-4 py-4 border-b border-gray-100 dark:border-white/5 ${unread ? 'bg-white dark:bg-[#1f1e16]' : ''} hover:bg-gray-50 dark:hover:bg-[#2a281f] transition-colors`}>
            {/* Unread Indicator */}
            {unread && (
                <div className="absolute left-0 top-6 h-2 w-1 rounded-r-full bg-primary shadow-glow"></div>
            )}

            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
                <span className="material-symbols-outlined text-2xl">{icon}</span>
            </div>

            <div className="flex flex-1 flex-col gap-1">
                <div className="flex justify-between items-start">
                    <p className="text-gray-900 dark:text-white text-sm font-black uppercase tracking-tight line-clamp-1">{title}</p>
                    <span className="text-[#bab59c] text-[10px] font-black uppercase tracking-widest whitespace-nowrap ml-2">{time}</span>
                </div>
                <p className="text-gray-600 dark:text-[#bab59c] text-xs leading-normal line-clamp-2 font-bold pr-12">
                    {description}
                </p>
            </div>

            {/* Product Thumbnail */}
            {thumbnail && (
                <div className="absolute right-4 top-4 h-12 w-12 rounded-xl bg-gray-800 overflow-hidden border border-white/10">
                    <div className="h-full w-full bg-cover bg-center opacity-80" style={{ backgroundImage: `url('${thumbnail}')` }}></div>
                </div>
            )}
        </div>
    );
}
