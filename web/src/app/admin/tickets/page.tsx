'use client';

import React from 'react';

const ticketLogs = [
    { id: '1', ticket: '#TKT-99824', match: 'Raja vs Wydad', user: 'Mohammed Rakibi', door: 'Gate 4A', time: '18:42:15', status: 'valid' },
    { id: '2', ticket: '#TKT-99825', match: 'Raja vs Wydad', user: 'Yassine Belhaj', door: 'Gate 4A', time: '18:42:50', status: 'valid' },
    { id: '3', ticket: '#TKT-99810', match: 'Raja vs Wydad', user: 'Anissa Fathi', door: 'Gate 2B', time: '18:43:10', status: 'invalid', reason: 'Déjà Scanné' },
    { id: '4', ticket: '#TKT-99826', match: 'Raja vs Wydad', user: 'Karim Amrani', door: 'Gate 4A', time: '18:43:22', status: 'valid' },
    { id: '5', ticket: '#TKT-88741', match: 'FAR vs FUS', user: 'Sofia Laroui', door: 'Main Entrance', time: '18:44:05', status: 'expired' },
];

export default function TicketManagementPage() {
    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                        Validation <span className="text-primary italic">Billetterie</span>
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-60 mt-2">
                        Suivi en temps réel des entrées et validations
                    </p>
                </div>

                <div className="flex gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-primary text-2xl font-black italic tracking-tighter">84%</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#bab59c] opacity-40">Taux de Remplissage</span>
                    </div>
                    <div className="w-[1px] h-10 bg-white/10 mx-2"></div>
                    <div className="flex flex-col items-end">
                        <span className="text-white text-2xl font-black italic tracking-tighter">1,245</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#bab59c] opacity-40">Entrées Totales</span>
                    </div>
                </div>
            </div>

            {/* Live Logs Table */}
            <div className="rounded-3xl bg-[#121214] border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                        Flux de Validation en Direct
                    </h3>
                    <div className="flex gap-2">
                        <button className="h-8 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-[9px] font-black uppercase tracking-widest transition-all">Pause</button>
                        <button className="h-8 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-[9px] font-black uppercase tracking-widest transition-all">Nettoyer</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[9px] font-black uppercase tracking-[0.3em] text-[#bab59c] border-b border-white/5">
                                <th className="px-8 py-4">Heure</th>
                                <th className="px-8 py-4">Billet</th>
                                <th className="px-8 py-4">Match</th>
                                <th className="px-8 py-4">Utilisateur</th>
                                <th className="px-8 py-4">Accès</th>
                                <th className="px-8 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {ticketLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-white/[0.01] transition-colors group">
                                    <td className="px-8 py-5 text-[10px] font-bold font-mono opacity-50 tracking-tighter">{log.time}</td>
                                    <td className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-primary">{log.ticket}</td>
                                    <td className="px-8 py-5 text-xs font-bold italic uppercase tracking-tight">{log.match}</td>
                                    <td className="px-8 py-5 text-[10px] font-black uppercase tracking-widest opacity-80">{log.user}</td>
                                    <td className="px-8 py-5 text-[10px] font-black uppercase tracking-widest opacity-50">{log.door}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${log.status === 'valid' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                                                    log.status === 'invalid' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                                        'bg-orange-500/10 border-orange-500/20 text-orange-500'
                                                }`}>
                                                {log.status === 'valid' ? 'Validé' : log.status === 'invalid' ? 'Refusé' : 'Expiré'}
                                            </div>
                                            {log.reason && <span className="text-[9px] font-bold text-red-400 opacity-60 uppercase tracking-tight italic">{log.reason}</span>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#bab59c] opacity-40">Validation la plus active</span>
                    <span className="text-xl font-black uppercase tracking-tighter">Porte 4 - Tribune Sud</span>
                </div>
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#bab59c] opacity-40">Pic d&apos;affluence</span>
                    <span className="text-xl font-black uppercase tracking-tighter">18:30 - 18:45</span>
                </div>
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#bab59c] opacity-40">Erreurs de scan (24h)</span>
                    <span className="text-xl font-black uppercase tracking-tighter text-red-500">14 Refus</span>
                </div>
            </div>
        </div>
    );
}
