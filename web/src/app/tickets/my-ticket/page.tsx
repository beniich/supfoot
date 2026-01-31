'use client';

import React from 'react';
import Link from 'next/link';

export default function DigitalTicketPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-sans text-white">
            <div className="relative flex min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto">
                {/* TopAppBar */}
                <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between shrink-0">
                    <Link href="/matches" className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-colors">
                        <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
                    </Link>
                    <h2 className="text-slate-900 dark:text-white text-lg font-black leading-tight tracking-tighter flex-1 text-center uppercase italic">My Digital Ticket</h2>
                    <div className="flex w-10 items-center justify-end">
                        <button className="flex size-10 items-center justify-center rounded-xl bg-transparent text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined text-2xl">share</span>
                        </button>
                    </div>
                </header>

                {/* Main Ticket Content Scroll Area */}
                <main className="flex-1 overflow-y-auto px-6 pt-4 pb-24 no-scrollbar">
                    {/* Ticket Card Container */}
                    <div className="bg-white rounded-[2rem] shadow-2xl relative flex flex-col overflow-hidden" style={{ maskImage: 'radial-gradient(circle at 0 65%, transparent 15px, black 16px), radial-gradient(circle at 100% 65%, transparent 15px, black 16px)' }}>
                        {/* Match Details Header */}
                        <div className="pt-8 pb-6 px-6 text-center">
                            <div className="inline-block bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-lg mb-3">
                                FootballHub+ Premium
                            </div>
                            <h2 className="text-[#181611] text-2xl font-black leading-tight uppercase tracking-tighter italic">Raja CA vs Wydad AC</h2>
                            <p className="text-gray-500 text-xs font-bold mt-1 uppercase tracking-wide">Sunday, Oct 24 • 20:00</p>
                        </div>

                        {/* Perforation Line */}
                        <div className="relative h-px w-full border-t-2 border-dashed border-gray-200"></div>

                        {/* QR Code Section */}
                        <div className="flex flex-col items-center justify-center p-8 bg-white">
                            <div className="bg-white p-4 rounded-3xl border-2 border-gray-100 shadow-sm">
                                <div className="w-56 h-56 bg-white flex items-center justify-center">
                                    {/* Placeholder for QR code */}
                                    <div
                                        className="w-full h-full bg-center bg-no-repeat bg-contain"
                                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC9J4qyHLorfW6GP2sUyNFTazsPV9c4xUQzhiy73NYqci2reMZqP4gD5LVx2ukjvyrRQpi9A4qFO8nmVmevB6GaQ4dWxwOBMAuzn8eniuzRSCe-LVOg8FnNQiJo6mae832L_TQFOIXn_wro_V0Pc1mq3HFDz7SIq0A8ByoaCgeko-yjFa54IWAwIg2QAgC9jYhZsjI_cNbCSByBsbskOjnvJM3TKMYcfwimtQm2It7DcperaLGl9CoNahDLfArXDCKUgzYI-OAONHM")' }}
                                    >
                                    </div>
                                </div>
                            </div>
                            {/* Refreshing status */}
                            <div className="flex items-center gap-2 mt-6">
                                <span className="material-symbols-outlined text-gray-400 text-sm animate-spin">refresh</span>
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Refreshing in 24s</p>
                            </div>
                        </div>

                        {/* Seating Grid */}
                        <div className="bg-gray-50 p-6 grid grid-cols-4 gap-2 border-t border-gray-100">
                            <TicketInfoBox label="Gate" value="4" />
                            <TicketInfoBox label="Section" value="B" bordered />
                            <TicketInfoBox label="Row" value="12" bordered />
                            <TicketInfoBox label="Seat" value="42" bordered isPrimary />
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 flex flex-col gap-4">
                        <p className="text-gray-500 dark:text-white/60 text-[10px] font-medium text-center px-8 leading-relaxed">
                            Please have your screen brightness at maximum when approaching the gate for faster validation.
                        </p>
                        {/* Actions */}
                        <button className="bg-black hover:bg-gray-900 text-white w-full h-14 rounded-2xl font-black text-sm uppercase tracking-wide flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg">
                            <span className="material-symbols-outlined">add_to_home_screen</span>
                            Add to Apple Wallet
                        </button>
                        <button className="bg-white/5 hover:bg-white/10 text-slate-900 dark:text-white w-full h-14 rounded-2xl font-black text-sm uppercase tracking-wide flex items-center justify-center gap-3 border border-black/10 dark:border-white/10 transition-all active:scale-[0.98]">
                            <span className="material-symbols-outlined">map</span>
                            View Stadium Map
                        </button>
                    </div>

                    {/* SaaS Badge */}
                    <div className="flex justify-center items-center gap-2 mt-8 opacity-40 pb-8">
                        <span className="material-symbols-outlined text-sm text-slate-900 dark:text-white">verified</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">FootballHub+ Verified</span>
                    </div>
                </main>

                {/* Bottom Navigation */}
                <nav className="fixed bottom-0 left-0 w-full z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-black/5 dark:border-white/5 pb-safe">
                    <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
                        <NavButton icon="home" label="Home" href="/" />
                        <NavButton icon="confirmation_number" label="Tickets" active href="/tickets/my-ticket" />
                        <NavButton icon="newspaper" label="News" href="/news" />
                        <NavButton icon="person" label="Profile" href="/profile" />
                    </div>
                </nav>
            </div>
        </div>
    );
}

function TicketInfoBox({ label, value, bordered, isPrimary }: { label: string, value: string, bordered?: boolean, isPrimary?: boolean }) {
    return (
        <div className={`flex flex-col items-center ${bordered ? 'border-l border-gray-200' : ''}`}>
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">{label}</span>
            <span className={`text-xl font-black ${isPrimary ? 'text-primary' : 'text-gray-900'}`}>{value}</span>
        </div>
    );
}

function NavButton({ icon, label, href, active }: { icon: string; label: string; href: string; active?: boolean }) {
    return (
        <Link href={href} className="flex flex-col items-center gap-1 group w-full">
            <span className={`material-symbols-outlined text-2xl ${active ? 'text-primary filled' : 'text-gray-400 group-hover:text-primary transition-colors'}`}>{icon}</span>
            <span className={`text-[10px] font-medium ${active ? 'text-primary font-bold' : 'text-gray-400 group-hover:text-primary transition-colors'}`}>{label}</span>
        </Link>
    );
}
