'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ActionButtonProps, RelatedVideoItemProps } from '@/types/components';

export default function VideoPlayerPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased overflow-hidden min-h-screen">
            <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto">
                {/* Video Player Section (Sticky Top) */}
                <div className="w-full bg-black sticky top-0 z-20 shadow-2xl">
                    <div className="relative aspect-video w-full bg-slate-900 group">
                        {/* Video Image */}
                        {/* Video Image */}
                        <div className="absolute inset-0 w-full h-full opacity-80 overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop"
                                alt="Video Thumbnail"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>

                        {/* Header Actions */}
                        <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-center z-30">
                            <Link href="/news" className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/20 backdrop-blur-md text-white border border-white/10 hover:bg-black/40 transition">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </Link>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/20 backdrop-blur-md text-white border border-white/10 hover:bg-black/40 transition">
                                <span className="material-symbols-outlined">more_vert</span>
                            </button>
                        </div>

                        {/* Center Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <button className="flex shrink-0 items-center justify-center rounded-full size-18 bg-primary text-background-dark shadow-glow transition transform active:scale-95 hover:scale-105">
                                <span className="material-symbols-outlined !text-[36px] ml-1 filled">play_arrow</span>
                            </button>
                        </div>

                        {/* Bottom Controls */}
                        <div className="absolute inset-x-0 bottom-0 px-4 py-4 z-30">
                            {/* Progress Bar */}
                            <div className="group/progress relative flex h-6 items-center cursor-pointer mb-2">
                                <div className="h-1 flex-1 rounded-full bg-white/20 backdrop-blur-sm overflow-hidden">
                                    <div className="h-full w-[35%] bg-primary rounded-full relative shadow-glow-sm"></div>
                                </div>
                                <div className="absolute left-[35%] -ml-1.5 size-3.5 rounded-full bg-primary shadow-glow scale-100 group-hover/progress:scale-125 transition-transform"></div>
                            </div>
                            {/* Time & Actions */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <p className="text-white text-[11px] font-bold tracking-widest">12:34 <span className="text-white/40">/ 45:00</span></p>
                                </div>
                                <div className="flex items-center gap-5 text-white/80">
                                    <button className="hover:text-primary transition"><span className="material-symbols-outlined !text-[22px]">closed_caption</span></button>
                                    <button className="hover:text-primary transition"><span className="material-symbols-outlined !text-[22px]">settings</span></button>
                                    <button className="hover:text-primary transition"><span className="material-symbols-outlined !text-[22px]">fullscreen</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                    {/* Video Metadata */}
                    <div className="px-5 py-6 border-b border-black/5 dark:border-white/5">
                        <div className="flex items-start justify-between gap-4">
                            <h1 className="text-slate-900 dark:text-white text-xl font-black leading-tight flex-1 uppercase tracking-tight">
                                Raja vs Wydad | Match Highlights | Botola Pro Exclusive
                            </h1>
                            <button className="shrink-0 text-slate-400 dark:text-slate-500 hover:text-primary transition">
                                <span className="material-symbols-outlined">expand_more</span>
                            </button>
                        </div>
                        <div className="mt-2 flex items-center gap-3 text-slate-500 dark:text-[#bab59c] text-[10px] font-bold uppercase tracking-widest">
                            <span>1.2M Views</span>
                            <span className="size-1 rounded-full bg-slate-300 dark:bg-white/10"></span>
                            <span>2 hours ago</span>
                        </div>
                        {/* Chips */}
                        <div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar">
                            {['#Derby', '#Casablanca', '#Goals', '#Highlights'].map(tag => (
                                <span key={tag} className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-surface-dark text-slate-700 dark:text-gray-300 text-[10px] font-black uppercase tracking-widest border border-white/5 shadow-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        {/* Action Bar */}
                        <div className="mt-8 flex items-center justify-between">
                            <ActionButton icon="thumb_up" label="45K" />
                            <ActionButton icon="share" label="Share" />
                            <ActionButton icon="bookmark" label="Save" />
                            <ActionButton icon="flag" label="Report" />
                        </div>
                    </div>

                    {/* Live Chat Teaser */}
                    <div className="px-5 py-6">
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-surface-dark/40 border border-slate-200 dark:border-white/5 cursor-pointer hover:bg-slate-200 dark:hover:bg-surface-dark transition-all shadow-sm">
                            <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-background-dark font-black text-sm shadow-glow-sm">
                                FH
                            </div>
                            <div className="flex-1">
                                <p className="text-slate-800 dark:text-gray-200 text-sm font-black uppercase tracking-tight">Join the live chat</p>
                                <p className="text-slate-500 dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">124 fans are discussing right now</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 dark:text-gray-500">expand_less</span>
                        </div>
                    </div>

                    {/* Related Videos */}
                    <div className="pt-2">
                        <div className="px-5 pb-4 flex items-center justify-between">
                            <h3 className="text-slate-900 dark:text-white font-black text-lg uppercase tracking-tight">Up Next</h3>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Autoplay</span>
                                <div className="w-9 h-5 bg-primary/20 rounded-full relative cursor-pointer border border-primary/20">
                                    <div className="absolute right-1 top-1 w-3 h-3 bg-primary rounded-full shadow-glow-sm"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <RelatedVideoItem
                                title="Post-match Interview: Coach on victory"
                                author="FootballHub+"
                                time="3h ago"
                                duration="4:21"
                                image="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=300"
                            />
                            <RelatedVideoItem
                                title="Top 5 Goals of the Week | Botola Pro"
                                author="Official TV"
                                time="1d ago"
                                duration="8:05"
                                image="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=300"
                            />
                        </div>
                    </div>
                </div>

                {/* Live Chat Sticky Toggle */}
                <div className="fixed bottom-10 left-0 right-0 z-30 flex justify-center pointer-events-none">
                    <button className="bg-primary shadow-glow text-background-dark font-black text-xs px-6 py-3 rounded-full flex items-center gap-2 pointer-events-auto cursor-pointer transform hover:scale-110 active:scale-95 transition-all uppercase tracking-widest">
                        <span className="material-symbols-outlined !text-[18px] filled">chat_bubble</span>
                        Live Chat
                    </button>
                </div>
            </div>
        </div>
    );
}

function ActionButton({ icon, label }: ActionButtonProps) {
    return (
        <button className="flex flex-col items-center gap-2 group">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-surface-dark border border-black/5 dark:border-white/5 active:bg-primary/20 group-hover:border-primary/50 transition-all shadow-sm">
                <span className="material-symbols-outlined text-slate-700 dark:text-white group-hover:text-primary transition-all !text-[20px]">{icon}</span>
            </div>
            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 group-hover:text-primary transition-all uppercase tracking-widest">{label}</span>
        </button>
    );
}

function RelatedVideoItem({ title, author, time, duration, image }: RelatedVideoItemProps) {
    return (
        <div className="group flex gap-4 p-4 px-5 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all active:scale-[0.98]">
            <div className="relative w-36 aspect-video shrink-0 rounded-xl overflow-hidden bg-slate-800 border border-white/5 shadow-md">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 bg-black/80 backdrop-blur-sm rounded-lg text-[9px] font-black text-white border border-white/10 tracking-widest">
                    {duration}
                </div>
            </div>
            <div className="flex flex-col gap-1 min-w-0">
                <h4 className="text-slate-900 dark:text-gray-100 text-sm font-black leading-tight line-clamp-2 group-hover:text-primary transition-colors uppercase tracking-tight">{title}</h4>
                <p className="text-slate-500 dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">{author} • {time}</p>
            </div>
            <button className="ml-auto flex items-start pt-1">
                <span className="material-symbols-outlined text-slate-400 dark:text-gray-600 !text-[20px] hover:text-white transition-colors">more_vert</span>
            </button>
        </div>
    );
}
