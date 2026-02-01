'use client';

import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function AssociationAdminPage() {
    const [association, setAssociation] = useState<any>(null);
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [generatingBadge, setGeneratingBadge] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const assocRes = await api.get('/associations/me');
                setAssociation(assocRes.data.data);

                // Assuming members are filtered by associationId on the backend
                const membersRes = await api.get('/members');
                setMembers(membersRes.data.data.filter((m: any) => m.associationId === assocRes.data.data._id));
            } catch (err) {
                console.error('Error fetching admin data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleGenerateBadge = async (memberId: string, membershipNumber: string) => {
        setGeneratingBadge(memberId);
        try {
            const response = await api.get(`/associations/members/${memberId}/badge`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `badge-${membershipNumber}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            alert('Failed to generate badge');
        } finally {
            setGeneratingBadge(null);
        }
    };

    if (loading) return <div className="min-h-screen bg-background-dark flex items-center justify-center"><div className="animate-spin size-12 border-4 border-primary border-t-transparent rounded-full"></div></div>;

    if (!association) return <div className="min-h-screen bg-background-dark flex items-center justify-center text-white">No association found. <a href="/association/register" className="text-primary ml-2 underline">Register here</a></div>;

    return (
        <ProtectedRoute requireAdmin={true}>
            <div className="min-h-screen bg-background-light dark:bg-background-dark p-6">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Association Header */}
                    <div className="bg-white dark:bg-surface-dark rounded-[32px] p-8 border border-white/5 shadow-2xl flex flex-col md:flex-row items-center gap-8">
                        <div className="size-32 rounded-3xl bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20">
                            {association.logo ? (
                                <img src={association.logo} alt={association.name} className="size-full object-cover" />
                            ) : (
                                <span className="material-symbols-outlined text-6xl text-primary">handshake</span>
                            )}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white mb-2">{association.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">mail</span> {association.email}</span>
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">group</span> {members.length} Members</span>
                                <span className={`px-2 py-0.5 rounded-full ${association.subscription?.plan === 'premium' ? 'bg-primary text-background-dark' : 'bg-white/10 text-white'}`}>
                                    {association.subscription?.plan?.toUpperCase()} Plan
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs border border-white/10 transition-all">Settings</button>
                            <button className="bg-primary hover:scale-105 active:scale-95 text-background-dark px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-glow transition-all">Upgrade Plan</button>
                        </div>
                    </div>

                    {/* Members List */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Members & Badges</h2>
                            <button className="bg-white/5 hover:bg-white/10 text-white p-3 rounded-xl border border-white/10 transition-all">
                                <span className="material-symbols-outlined">add</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {members.map((member) => (
                                <div key={member._id} className="bg-white dark:bg-surface-dark border border-white/5 rounded-3xl p-6 hover:border-primary/30 transition-all group">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="size-16 rounded-2xl bg-white/5 flex items-center justify-center overflow-hidden border border-white/10">
                                            {member.photo ? (
                                                <img src={member.photo} alt={member.firstName} className="size-full object-cover" />
                                            ) : (
                                                <span className="material-symbols-outlined text-3xl text-gray-400">person</span>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-lg uppercase tracking-tight text-slate-900 dark:text-white">{member.firstName} {member.lastName}</h3>
                                            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{member.role} • {member.tier}</p>
                                        </div>
                                    </div>

                                    <div className="bg-black/20 rounded-2xl p-4 mb-6 flex justify-between items-center">
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                                            ID Number
                                            <div className="text-white text-base font-black mt-1">{member.membershipNumber}</div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${member.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {member.status}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleGenerateBadge(member._id, member.membershipNumber)}
                                        disabled={generatingBadge === member._id}
                                        className="w-full bg-white/5 hover:bg-primary hover:text-background-dark border border-white/10 hover:border-primary text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 group-hover:shadow-glow-sm"
                                    >
                                        {generatingBadge === member._id ? (
                                            <div className="animate-spin size-4 border-2 border-current border-t-transparent rounded-full"></div>
                                        ) : (
                                            <span className="material-symbols-outlined text-lg">badge</span>
                                        )}
                                        {generatingBadge === member._id ? 'Generating...' : 'Download Badge'}
                                    </button>
                                </div>
                            ))}
                        </div>

                        {members.length === 0 && (
                            <div className="bg-white/5 border-2 border-dashed border-white/10 rounded-[32px] p-20 text-center">
                                <span className="material-symbols-outlined text-6xl text-gray-600 mb-4">group_off</span>
                                <p className="text-gray-400 font-bold uppercase tracking-widest">No members found yet.</p>
                                <button className="mt-4 text-primary font-black uppercase tracking-widest text-xs hover:underline">Add your first member</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
