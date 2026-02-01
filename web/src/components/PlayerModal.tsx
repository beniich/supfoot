'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlayerModalProps {
    player: {
        id: string;
        number: string;
        name: string;
        position: string;
        stats: {
            goals: number;
            assists: number;
            passes: string;
            distance: string;
        };
    } | null;
    onClose: () => void;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({ player, onClose }) => {
    if (!player) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" onClick={onClose}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="bg-surface-dark border border-white/10 rounded-[32px] w-full max-w-sm overflow-hidden shadow-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header with gradient */}
                    <div className="h-32 bg-gradient-to-br from-primary via-primary to-yellow-600 relative">
                        <button onClick={onClose} className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-1">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <div className="absolute -bottom-10 left-6">
                            <div className="size-24 rounded-2xl bg-black border-4 border-surface-dark overflow-hidden flex items-center justify-center">
                                <span className="material-symbols-outlined text-5xl text-gray-500">person</span>
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-6 text-black font-black italic text-4xl opacity-40">{player.number}</div>
                    </div>

                    <div className="p-6 pt-12">
                        <div className="mb-6">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">{player.name}</h3>
                            <p className="text-sm font-bold text-primary uppercase tracking-[0.2em]">{player.position}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <StatCard label="Goals" value={player.stats.goals.toString()} icon="sports_soccer" />
                            <StatCard label="Assists" value={player.stats.assists.toString()} icon="assistant" />
                            <StatCard label="Pass Acc." value={player.stats.passes} icon="sync_alt" />
                            <StatCard label="Distance" value={player.stats.distance} icon="distance" />
                        </div>

                        <button className="w-full mt-8 bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-2xl border border-white/5 uppercase tracking-widest text-xs transition-all">
                            Full Profile & Insights
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

function StatCard({ label, value, icon }: { label: string, value: string, icon: string }) {
    return (
        <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col gap-1">
            <div className="flex justify-between items-center text-gray-400 mb-1">
                <span className="material-symbols-outlined text-sm">{icon}</span>
                <span className="text-[10px] font-black uppercase">{label}</span>
            </div>
            <div className="text-xl font-black text-white">{value}</div>
        </div>
    );
}
