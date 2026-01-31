'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SupportChatPage() {
    const [message, setMessage] = useState('');

    return (
        <div className="bg-background-light dark:bg-background-dark font-sans h-screen flex flex-col overflow-hidden text-gray-900 dark:text-white selection:bg-primary selection:text-black">
            <div className="relative flex flex-col max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark h-screen">

                {/* Top Header */}
                <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-background-dark border-b dark:border-white/10 shadow-sm dark:shadow-none z-20">
                    <Link href="/help" className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-gray-800 dark:text-white text-2xl">arrow_back_ios_new</span>
                    </Link>
                    <div className="flex flex-col items-center">
                        <h1 className="text-base font-black uppercase italic tracking-tight text-gray-900 dark:text-white">HubBot Support</h1>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-glow-sm"></div>
                            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Online</span>
                        </div>
                    </div>
                    <button className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-gray-800 dark:text-white text-2xl">more_horiz</span>
                    </button>
                </header>

                {/* Chat Area */}
                <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-40 scroll-smooth">
                    {/* Timestamp */}
                    <div className="flex justify-center">
                        <span className="text-[10px] font-black text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-xl uppercase tracking-widest">Today, 9:41 AM</span>
                    </div>

                    {/* Bot Message 1 */}
                    <div className="flex items-end gap-3 w-full max-w-lg">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-900/30 flex items-center justify-center border border-primary/30">
                            <span className="material-symbols-outlined text-primary text-lg">smart_toy</span>
                        </div>
                        <div className="flex flex-col gap-1 items-start">
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 ml-1 font-black uppercase tracking-widest">HubBot</span>
                            <div className="bg-gray-100 dark:bg-[#2C2C2E] p-3.5 rounded-2xl rounded-bl-sm shadow-sm border border-white/5">
                                <p className="text-sm leading-relaxed font-bold text-gray-800 dark:text-gray-100">
                                    Welcome back, Alex! I&apos;m HubBot. How can I assist you with your <span className="font-black text-primary">FootballHub+</span> membership today?
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions (Chips) */}
                    <div className="flex flex-wrap gap-2 pl-11 animate-fade-in-up">
                        <button className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all active:scale-95">
                            <span className="material-symbols-outlined text-primary text-lg">checkroom</span>
                            <span className="text-xs font-black text-gray-700 dark:text-gray-200 uppercase tracking-tight">Where is my Jersey?</span>
                        </button>
                        <button className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all active:scale-95">
                            <span className="material-symbols-outlined text-primary text-lg">confirmation_number</span>
                            <span className="text-xs font-black text-gray-700 dark:text-gray-200 uppercase tracking-tight">Ticket Access</span>
                        </button>
                        <button className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all active:scale-95">
                            <span className="material-symbols-outlined text-primary text-lg">cancel</span>
                            <span className="text-xs font-black text-gray-700 dark:text-gray-200 uppercase tracking-tight">Cancel Subscription</span>
                        </button>
                    </div>

                    {/* User Message */}
                    <div className="flex items-end gap-3 w-full justify-end">
                        <div className="flex flex-col gap-1 items-end max-w-[85%]">
                            <div className="bg-primary p-3.5 rounded-2xl rounded-br-sm shadow-glow">
                                <p className="text-sm leading-relaxed font-bold text-black">
                                    I ordered the new Away Kit 3 days ago but haven&apos;t received a tracking number.
                                </p>
                            </div>
                            <span className="text-[10px] text-gray-400 mr-1 flex items-center gap-1 font-black uppercase tracking-widest">
                                Read
                                <span className="material-symbols-outlined text-primary text-sm">done_all</span>
                            </span>
                        </div>
                    </div>

                    {/* Bot Response */}
                    <div className="flex items-end gap-3 w-full max-w-lg">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-900/30 flex items-center justify-center border border-primary/30">
                            <span className="material-symbols-outlined text-primary text-lg">smart_toy</span>
                        </div>
                        <div className="flex flex-col gap-1 items-start">
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 ml-1 font-black uppercase tracking-widest">HubBot</span>
                            <div className="bg-gray-100 dark:bg-[#2C2C2E] p-3.5 rounded-2xl rounded-bl-sm shadow-sm border border-white/5">
                                <p className="text-sm leading-relaxed font-bold text-gray-800 dark:text-gray-100">
                                    Let me check that for you. Order <span className="font-mono bg-black/10 dark:bg-black/30 px-1 rounded text-xs">#FH-9920</span> is currently being processed at our warehouse. You should receive an email within 24 hours.
                                </p>
                            </div>
                            {/* Interactive element within bot chat */}
                            <div className="mt-1 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-2xl p-3 w-full max-w-xs shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522770179533-24471fcdba45')" }}></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-black text-gray-900 dark:text-white truncate uppercase tracking-tight">23/24 Away Kit</p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">Status: Processing</p>
                                    </div>
                                </div>
                                <button className="w-full py-2 text-[10px] font-black uppercase tracking-[0.15em] text-center text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors">
                                    View Order Details
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Bottom Fixed Area (Input + Nav) */}
                <div className="fixed bottom-0 w-full max-w-md z-30 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl border-t dark:border-white/5">
                    {/* Input Field */}
                    <div className="px-4 py-3 flex items-end gap-3">
                        <button className="flex-shrink-0 mb-1 w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-primary hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined transform rotate-45 text-2xl">attach_file</span>
                        </button>
                        <div className="flex-1 bg-gray-100 dark:bg-surface-dark rounded-2xl min-h-[44px] flex items-center px-4 border border-transparent focus-within:border-primary/50 transition-colors">
                            <input
                                className="bg-transparent border-none w-full text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:ring-0 p-0"
                                placeholder="Type a message..."
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <button className="flex-shrink-0 mb-[2px] w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-black shadow-glow hover:scale-105 active:scale-95 transition-all">
                            <span className="material-symbols-outlined text-xl">send</span>
                        </button>
                    </div>

                    {/* Navigation Bar */}
                    <nav className="flex justify-between items-center px-6 pt-2 pb-6 md:pb-4 border-t border-gray-100 dark:border-white/5">
                        <Link href="/" className="flex flex-col items-center gap-1 w-12 group">
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors text-[26px]">home</span>
                            <span className="text-[10px] font-bold text-gray-500 group-hover:text-primary transition-colors uppercase tracking-wide">Home</span>
                        </Link>
                        <Link href="/matches" className="flex flex-col items-center gap-1 w-12 group">
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors text-[26px]">sports_soccer</span>
                            <span className="text-[10px] font-bold text-gray-500 group-hover:text-primary transition-colors uppercase tracking-wide">Matches</span>
                        </Link>
                        <Link href="/store" className="flex flex-col items-center gap-1 w-12 group">
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors text-[26px]">shopping_bag</span>
                            <span className="text-[10px] font-bold text-gray-500 group-hover:text-primary transition-colors uppercase tracking-wide">Shop</span>
                        </Link>
                        <div className="flex flex-col items-center gap-1 w-12">
                            <div className="relative">
                                <span className="material-symbols-outlined text-primary filled text-[26px]">support_agent</span>
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                            </div>
                            <span className="text-[10px] font-bold text-primary uppercase tracking-wide">Support</span>
                        </div>
                        <Link href="/profile" className="flex flex-col items-center gap-1 w-12 group">
                            <div className="w-[26px] h-[26px] rounded-full bg-gray-300 dark:bg-white/20 overflow-hidden border border-transparent group-hover:border-primary transition-colors">
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2')" }}></div>
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 group-hover:text-primary transition-colors uppercase tracking-wide">Profile</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
