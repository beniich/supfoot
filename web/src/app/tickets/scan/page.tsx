'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function TicketScannerPage() {
    const [scanResult, setScanResult] = useState<null | 'success' | 'invalid'>(null);

    return (
        <div className="bg-background-light dark:bg-black font-display overflow-hidden h-screen w-screen selection:bg-primary selection:text-black relative">
            {/* Camera Feed Background (Simulated) */}
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
                style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop')",
                    filter: "brightness(0.6) blur(2px)"
                }}
            >
                {/* Dark Overlay for Readability */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Main Interface Layer */}
            <div className="relative z-10 flex flex-col h-full justify-between pb-[80px]">
                {/* Top Actions Bar */}
                <div className="pt-14 px-6 flex justify-center w-full">
                    <div className="flex items-center gap-8 rounded-full bg-black/60 backdrop-blur-md px-8 py-3 border border-white/10 shadow-lg">
                        {/* Flash Toggle */}
                        <button className="group flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                            <div className="rounded-full bg-white/10 p-2 group-hover:bg-primary group-hover:text-black transition-colors">
                                <span className="material-symbols-outlined text-[20px]">flash_on</span>
                            </div>
                            <span className="text-[10px] font-medium text-white uppercase tracking-wider">Flash</span>
                        </button>
                        <div className="h-8 w-px bg-white/20"></div>
                        {/* Switch Camera */}
                        <button className="group flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                            <div className="rounded-full bg-white/10 p-2 group-hover:bg-primary group-hover:text-black transition-colors">
                                <span className="material-symbols-outlined text-[20px]">flip_camera_ios</span>
                            </div>
                            <span className="text-[10px] font-medium text-white uppercase tracking-wider">Flip</span>
                        </button>
                    </div>
                </div>

                {/* Central Scanning Area */}
                <div className="flex-1 flex flex-col items-center justify-center -mt-10">
                    {/* Scanning Reticle */}
                    <div className="relative w-64 h-64 sm:w-72 sm:h-72 cursor-pointer" onClick={() => setScanResult('success')}>
                        {/* Corners */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-l-[6px] border-t-[6px] border-primary rounded-tl-xl shadow-[0_0_15px_rgba(242,204,13,0.5)]"></div>
                        <div className="absolute top-0 right-0 w-12 h-12 border-r-[6px] border-t-[6px] border-primary rounded-tr-xl shadow-[0_0_15px_rgba(242,204,13,0.5)]"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-l-[6px] border-b-[6px] border-primary rounded-bl-xl shadow-[0_0_15px_rgba(242,204,13,0.5)]"></div>
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-[6px] border-b-[6px] border-primary rounded-br-xl shadow-[0_0_15px_rgba(242,204,13,0.5)]"></div>
                        {/* Scan Line Animation */}
                        <div className="absolute left-4 right-4 h-0.5 bg-primary/80 shadow-[0_0_10px_rgba(242,204,13,0.8)] scan-line rounded-full"></div>
                    </div>
                    {/* Instruction Text */}
                    <div className="mt-8">
                        <p className="text-white/90 text-sm font-medium tracking-wide bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/5 shadow-sm text-center">
                            Align QR code within frame
                        </p>
                    </div>
                </div>

                {/* Bottom Area: Status & Result Overlay */}
                <div className="px-4 pb-6 flex flex-col gap-4 items-center w-full max-w-md mx-auto">
                    {scanResult === 'success' && (
                        <div className="w-full transform transition-all duration-300 animate-scale-in">
                            <div className="relative overflow-hidden rounded-xl bg-surface-dark border-l-4 border-primary shadow-2xl">
                                {/* Success Glow Background */}
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-green-500/20 rounded-full blur-2xl"></div>
                                <div className="p-4 flex gap-4 items-center">
                                    {/* Icon Indicator */}
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                                            <span className="material-symbols-outlined text-green-400 text-[28px] filled">check_circle</span>
                                        </div>
                                    </div>
                                    {/* Text Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <h3 className="text-white text-lg font-bold leading-tight tracking-tight">VALID TICKET</h3>
                                            <span className="text-[10px] font-bold text-black bg-primary px-2 py-0.5 rounded uppercase">VIP</span>
                                        </div>
                                        <p className="text-white/60 text-sm font-normal truncate">Gate 4 • Access Granted</p>
                                        <p className="text-white/40 text-xs font-normal mt-0.5">Scanned: Just now</p>
                                    </div>
                                </div>
                                {/* User Detail */}
                                <div className="bg-black/20 px-4 py-2 flex items-center justify-between border-t border-white/5">
                                    <span className="text-xs text-white/50 font-medium">Ticket #8392-AX</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-600 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop')" }}></div>
                                        <span className="text-xs text-white/80">John Doe</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <button 
                        onClick={() => setScanResult(null)}
                        className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-lg h-12 px-6 transition-all"
                    >
                        <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
                        <span className="text-sm font-bold tracking-wide">Scan Next Ticket</span>
                    </button>
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 w-full z-30 bg-background-dark/95 backdrop-blur-xl border-t border-white/5">
                <div className="flex justify-around items-center px-2 py-3 h-[80px]">
                    {/* Scan Item: Active */}
                    <Link className="flex flex-1 flex-col items-center justify-center gap-1 group" href="/tickets/scan">
                        <div className="relative">
                            <span className="material-symbols-outlined text-primary text-[28px] group-hover:scale-110 transition-transform">qr_code_scanner</span>
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-primary text-[10px] font-bold tracking-wider uppercase mt-1">Scan</span>
                    </Link>
                    {/* History Item */}
                    <button className="flex flex-1 flex-col items-center justify-center gap-1 group">
                        <span className="material-symbols-outlined text-white/40 text-[28px] group-hover:text-white transition-colors">history</span>
                        <span className="text-white/40 group-hover:text-white text-[10px] font-medium tracking-wider uppercase mt-1 transition-colors">History</span>
                    </button>
                    {/* Settings Item */}
                    <button className="flex flex-1 flex-col items-center justify-center gap-1 group">
                        <span className="material-symbols-outlined text-white/40 text-[28px] group-hover:text-white transition-colors">settings</span>
                        <span className="text-white/40 group-hover:text-white text-[10px] font-medium tracking-wider uppercase mt-1 transition-colors">Settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
