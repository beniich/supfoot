'use client';

import React, { useState } from 'react';

const usersData = [
    { id: '1', name: 'Ahmed El Mansouri', email: 'ahmed@example.com', role: 'admin', status: 'active', joined: 'Jan 12, 2024' },
    { id: '2', name: 'Youssef Alami', email: 'youssef@example.com', role: 'user', status: 'active', joined: 'Jan 15, 2024' },
    { id: '3', name: 'Sara Bennani', email: 'sara@example.com', role: 'staff', status: 'active', joined: 'Jan 20, 2024' },
    { id: '4', name: 'Karim Tazi', email: 'karim@example.com', role: 'user', status: 'inactive', joined: 'Feb 01, 2024' },
    { id: '5', name: 'Fatima Zahra', email: 'fatima@example.com', role: 'user', status: 'active', joined: 'Feb 05, 2024' },
];

export default function UsersManagementPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                        Gestion <span className="text-primary italic">Utilisateurs</span>
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-60 mt-2">
                        Gérez les accès et les rôles de la plateforme
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <input
                            type="text"
                            placeholder="RECHERCHER UN MEMBRE..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-11 bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 text-xs font-bold tracking-widest uppercase focus:border-primary outline-none transition-all"
                        />
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#bab59c] text-sm">search</span>
                    </div>
                    <button className="h-11 px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest">
                        <span className="material-symbols-outlined text-sm">filter_list</span>
                        Filtres
                    </button>
                    <button className="h-11 px-6 rounded-xl bg-primary text-background-dark shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest italic">
                        <span className="material-symbols-outlined text-sm filled">person_add</span>
                        Inviter
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-3xl bg-[#121214] border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/[0.02]">
                            <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-[#bab59c] border-b border-white/5">
                                <th className="px-8 py-5">Utilisateur</th>
                                <th className="px-8 py-5">Rôle</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5">Inscrit le</th>
                                <th className="px-8 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {usersData.map((user) => (
                                <tr key={user.id} className="hover:bg-white/[0.01] transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10 group-hover:border-primary/30 transition-all">
                                                <span className="text-[10px] font-black text-primary uppercase">{user.name.split(' ').map(n => n[0]).join('')}</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm tracking-tight">{user.name}</p>
                                                <p className="text-[10px] text-[#bab59c] opacity-60 uppercase font-black">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${user.role === 'admin' ? 'bg-primary/10 border-primary/20 text-primary' :
                                                user.role === 'staff' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                                    'bg-white/5 border-white/10 text-[#bab59c]'
                                            }`}>
                                            {user.role}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-1.5 w-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`}></div>
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-[10px] font-bold text-[#bab59c] tracking-widest">{user.joined}</td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button className="h-9 w-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
                                                <span className="material-symbols-outlined text-sm">edit</span>
                                            </button>
                                            <button className="h-9 w-9 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all">
                                                <span className="material-symbols-outlined text-sm">block</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="p-6 bg-white/[0.01] flex items-center justify-between border-t border-white/5">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#bab59c] opacity-40">Affichage de 5 sur 1,284 utilisateurs</p>
                    <div className="flex gap-2">
                        <button className="h-8 w-8 rounded-lg border border-white/5 flex items-center justify-center opacity-50"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                        <button className="h-8 w-8 rounded-lg border border-white/5 bg-primary text-background-dark flex items-center justify-center font-bold text-[10px]">1</button>
                        <button className="h-8 w-8 rounded-lg border border-white/5 flex items-center justify-center font-bold text-[10px]">2</button>
                        <button className="h-8 w-8 rounded-lg border border-white/5 flex items-center justify-center font-bold text-[10px]">3</button>
                        <button className="h-8 w-8 rounded-lg border border-white/5 flex items-center justify-center"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
