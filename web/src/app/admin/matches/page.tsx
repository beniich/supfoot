'use client';

import React from 'react';

const matchesData = [
    {
        id: '1',
        homeTeam: 'Raja Casablanca',
        awayTeam: 'Wydad Casablanca',
        homeLogo: 'https://upload.wikimedia.org/wikipedia/fr/5/5e/Logo_Raja_Club_Athletic.png',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/fr/b/b2/Logo_Wydad_Casablanca.png',
        time: '20:00',
        date: '15 Fév, 2024',
        stadium: 'Stade Mohammed V',
        status: 'upcoming',
        ticketsSold: '18,500/22,000'
    },
    {
        id: '2',
        homeTeam: 'FAR Rabat',
        awayTeam: 'FUS Rabat',
        homeLogo: 'https://upload.wikimedia.org/wikipedia/fr/9/9f/Logo_AS_FAR.png',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/fr/6/60/Logo_FUS_Rabat.png',
        time: '18:00',
        date: '12 Fév, 2024',
        stadium: 'Stade Moulay Abdellah',
        status: 'live',
        score: '1 - 0',
        ticketsSold: '12,000/15,000'
    },
    {
        id: '3',
        homeTeam: 'MAS Fes',
        awayTeam: 'RS Berkane',
        homeLogo: 'https://upload.wikimedia.org/wikipedia/fr/4/41/Maghreb_Association_Sportive_de_F%C3%A8s.png',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/fr/3/3d/Logo_RS_Berkane.png',
        time: '20:45',
        date: '18 Fév, 2024',
        stadium: 'Grand Stade de Fès',
        status: 'upcoming',
        ticketsSold: '2,500/10,000'
    },
];

export default function MatchManagementPage() {
    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                        Gestion des <span className="text-primary italic">Matchs</span>
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-60 mt-2">
                        Planifiez et gérez les événements en temps réel
                    </p>
                </div>

                <button className="h-14 px-8 rounded-2xl bg-primary text-background-dark shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-sm font-black uppercase tracking-tighter italic">
                    <span className="material-symbols-outlined text-xl filled">add_circle</span>
                    Programmer un Match
                </button>
            </div>

            {/* Match List */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {matchesData.map((match) => (
                    <div key={match.id} className="relative overflow-hidden rounded-3xl bg-[#121214] border border-white/5 p-8 group hover:border-primary/20 transition-all duration-500">
                        {/* Background Deco */}
                        <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-all"></div>

                        <div className="relative z-10">
                            {/* Status & Date */}
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-80">{match.date} • {match.time}</span>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${match.status === 'live' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-white/5 border-white/10 text-[#bab59c]'
                                    }`}>
                                    {match.status}
                                </div>
                            </div>

                            {/* Teams Display */}
                            <div className="flex items-center justify-between gap-4 mb-8">
                                <div className="flex flex-col items-center gap-4 flex-1">
                                    <div className="h-20 w-20 rounded-2xl bg-white/5 p-3 group-hover:scale-110 transition-transform duration-500">
                                        <img src={match.homeLogo} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <span className="text-sm font-black tracking-tight text-center uppercase italic">{match.homeTeam}</span>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    {match.status === 'live' ? (
                                        <div className="text-4xl font-black italic tracking-tighter text-white">
                                            {match.score}
                                        </div>
                                    ) : (
                                        <div className="text-2xl font-black text-white/20 uppercase tracking-[0.3em]">VS</div>
                                    )}
                                    <span className="text-[9px] font-black uppercase tracking-widest text-[#bab59c] opacity-40">Direct</span>
                                </div>

                                <div className="flex flex-col items-center gap-4 flex-1">
                                    <div className="h-20 w-20 rounded-2xl bg-white/5 p-3 group-hover:scale-110 transition-transform duration-500">
                                        <img src={match.awayLogo} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <span className="text-sm font-black tracking-tight text-center uppercase italic">{match.awayTeam}</span>
                                </div>
                            </div>

                            {/* Info Footer */}
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-black text-[#bab59c] opacity-40 uppercase tracking-widest">Stade</span>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                                        <span className="text-[10px] font-bold uppercase tracking-tight">{match.stadium}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-black text-[#bab59c] opacity-40 uppercase tracking-widest">Billetterie</span>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm text-primary">confirmation_number</span>
                                        <span className="text-[10px] font-bold uppercase tracking-tight">{match.ticketsSold}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-8 flex gap-3">
                                <button className="flex-1 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all">Gérer l&apos;Événement</button>
                                <button className="h-12 w-12 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
                                    <span className="material-symbols-outlined text-sm">settings</span>
                                </button>
                                <button className="h-12 w-12 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-all">
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
