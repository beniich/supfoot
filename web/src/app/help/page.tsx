'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

export default function HelpCenterPage() {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(1);

    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-black min-h-screen">
            <div className="relative flex flex-col max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark min-h-screen pb-32">

                {/* Top App Bar */}
                <header className="sticky top-0 z-50 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 px-4 py-3 backdrop-blur-md border-b border-black/5 dark:border-white/5">
                    <Link href="/" className="flex size-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="flex-1 text-center text-lg font-black leading-tight uppercase italic tracking-tighter">Help Center</h1>
                    <Link href="/notifications" className="flex size-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                    </Link>
                </header>

                <main className="flex-1">
                    {/* Search Bar */}
                    <section className="px-4 py-6">
                        <div className="relative w-full">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                <span className="material-symbols-outlined text-gray-400">search</span>
                            </div>
                            <input
                                className="block w-full rounded-2xl border-none bg-white dark:bg-surface-dark py-4 pl-12 pr-4 text-base text-slate-900 dark:text-white placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                                placeholder="How can we help you?"
                                type="text"
                            />
                        </div>
                    </section>

                    {/* Quick Help Grid */}
                    <section className="px-4 pb-6">
                        <h2 className="mb-4 text-lg font-black leading-tight uppercase italic tracking-tight text-slate-900 dark:text-white">Quick Help</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <QuickHelpCard icon="package_2" label="My Orders" />
                            <QuickHelpCard icon="qr_code_scanner" label="Tickets & QR" />
                            <QuickHelpCard icon="verified" label="Membership" />
                            <QuickHelpCard icon="lock_person" label="Account Access" />
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="mt-6 px-4 pb-6">
                        <h2 className="mb-4 text-lg font-black leading-tight uppercase italic tracking-tight text-slate-900 dark:text-white">Frequently Asked Questions</h2>
                        <div className="flex flex-col space-y-3">
                            <FAQItem
                                question="How do I transfer a ticket?"
                                answer=""
                                expanded={expandedFaq === 0}
                                onToggle={() => setExpandedFaq(expandedFaq === 0 ? null : 0)}
                            />
                            <FAQItem
                                question="Why is my payment pending?"
                                answer="Payments may be pending due to bank verification processes. Usually, this clears within 2-4 hours. If it persists, please contact your bank or reach out to our support team."
                                expanded={expandedFaq === 1}
                                onToggle={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
                            />
                            <FAQItem
                                question="How do I upgrade to VIP?"
                                answer=""
                                expanded={expandedFaq === 2}
                                onToggle={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
                            />
                            <FAQItem
                                question="Can I get a refund for a match pass?"
                                answer=""
                                expanded={expandedFaq === 3}
                                onToggle={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
                            />
                        </div>
                    </section>

                    {/* Sticky Chat Button */}
                    <div className="px-4 pb-6">
                        <Link href="/support/chat">
                            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary hover:bg-yellow-400 text-black py-4 font-black text-base shadow-glow transition-all active:scale-95 uppercase tracking-tight">
                                <span className="material-symbols-outlined">chat_bubble</span>
                                <span>Chat with Support</span>
                            </button>
                        </Link>
                    </div>
                </main>

                <BottomNav activeTab="profile" />
            </div>
        </div>
    );
}

function QuickHelpCard({ icon, label }: { icon: string, label: string }) {
    return (
        <button className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-surface-dark p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md active:scale-95">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors border border-primary/10">
                <span className="material-symbols-outlined text-[28px]">{icon}</span>
            </div>
            <span className="font-black text-xs uppercase tracking-tight text-center">{label}</span>
        </button>
    );
}

function FAQItem({ question, answer, expanded, onToggle }: { question: string, answer: string, expanded: boolean, onToggle: () => void }) {
    return (
        <div className={`overflow-hidden rounded-2xl border ${expanded ? 'border-primary/30 shadow-glow-sm' : 'border-black/5 dark:border-white/5'} bg-white dark:bg-surface-dark shadow-sm transition-all`}>
            <button
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                onClick={onToggle}
            >
                <span className={`font-bold text-sm uppercase tracking-tight ${expanded ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{question}</span>
                <span className={`material-symbols-outlined ${expanded ? 'text-primary' : 'text-gray-400'}`}>
                    {expanded ? 'expand_less' : 'expand_more'}
                </span>
            </button>
            {expanded && answer && (
                <div className="px-5 pb-5 pt-0">
                    <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300 font-bold">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
}
