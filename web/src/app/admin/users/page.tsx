'use client';

import React, { useState, useEffect } from 'react';
import {
    Search, Filter, Plus, Edit, Trash2, Mail, Phone,
    User as UserIcon, Shield, ChevronRight
} from 'lucide-react';
import { DataTable } from '@/components/admin/DataTable';
import { ExportButton } from '@/components/admin/ExportButton';
import { apiClient } from '@/services/api';

export default function MembersManagement() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        role: 'all',
        tier: 'all',
        status: 'all',
    });

    useEffect(() => {
        fetchMembers();
    }, [filters, searchTerm]);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/admin/users', {
                params: {
                    search: searchTerm,
                    ...filters,
                },
            });
            if (response.data.success) {
                setMembers(response.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching members:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) return;

        try {
            await apiClient.delete(`/admin/users/${id}`);
            fetchMembers();
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    };

    const columns = [
        {
            header: 'Membre',
            accessor: 'name',
            cell: (row: any) => (
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center relative group overflow-hidden">
                        <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="text-primary font-black text-xs relative z-10 italic">
                            {row.firstName?.[0]}{row.lastName?.[0]}
                        </span>
                    </div>
                    <div>
                        <p className="font-black text-xs text-white uppercase italic tracking-tight">
                            {row.firstName} {row.lastName}
                        </p>
                        <p className="text-[9px] text-[#bab59c] opacity-60 uppercase tracking-widest">
                            ID: {row._id?.substring(0, 8)}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            header: 'Contact',
            accessor: 'email',
            cell: (row: any) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] text-[#bab59c] hover:text-white transition-colors">
                        <Mail size={12} className="text-primary" />
                        <span className="font-medium">{row.email}</span>
                    </div>
                    {row.phone && (
                        <div className="flex items-center gap-2 text-[10px] text-[#bab59c]">
                            <Phone size={12} className="text-primary" />
                            <span className="font-medium">{row.phone}</span>
                        </div>
                    )}
                </div>
            ),
        },
        {
            header: 'Rôle',
            accessor: 'role',
            cell: (row: any) => (
                <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest italic ${row.role === 'admin' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                            row.role === 'staff' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                                'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                        }`}>
                        {row.role}
                    </span>
                    {row.role === 'admin' && <Shield size={12} className="text-red-500" />}
                </div>
            ),
        },
        {
            header: 'Statut',
            accessor: 'isActive',
            cell: (row: any) => (
                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest italic ${row.isActive !== false ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                        'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                    {row.isActive !== false ? 'Actif' : 'Bloqué'}
                </span>
            ),
        },
        {
            header: 'Actions',
            accessor: 'actions',
            cell: (row: any) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => window.location.href = `/admin/users/${row._id}/edit`}
                        className="p-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-all group"
                    >
                        <Edit size={14} className="text-[#bab59c] group-hover:text-primary transition-colors" />
                    </button>
                    <button
                        onClick={() => handleDelete(row._id)}
                        className="p-2 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 rounded-lg transition-all group"
                    >
                        <Trash2 size={14} className="text-red-500/50 group-hover:text-red-500 transition-colors" />
                    </button>
                    <button className="p-2 bg-white/5 hover:bg-primary hover:text-background-dark rounded-lg transition-all group">
                        <ChevronRight size={14} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                        Gestion <span className="text-primary italic">Membres</span>
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-60 mt-2">
                        Base de données utilisateur • {members.length} enregistrements
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <ExportButton
                        endpoint="/admin/users/export"
                        filename={`members-export-${new Date().toISOString().split('T')[0]}`}
                    />
                    <button
                        onClick={() => window.location.href = '/admin/users/new'}
                        className="h-11 px-6 rounded-xl bg-primary text-background-dark shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest italic"
                    >
                        <Plus size={16} strokeWidth={3} />
                        <span>Nouveau Membre</span>
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-[#121214] border border-white/5 rounded-3xl p-6">
                <div className="flex flex-col lg:row-row gap-4">
                    <div className="flex-1 relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#bab59c] group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Rechercher par nom, email, ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-white text-xs font-bold focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all placeholder:text-[#bab59c]/30 uppercase tracking-widest"
                        />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="relative">
                            <select
                                value={filters.role}
                                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                                className="appearance-none pl-4 pr-10 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#bab59c] focus:outline-none focus:border-primary/30 transition-all cursor-pointer hover:bg-white/10 italic"
                            >
                                <option value="all">Tous les rôles</option>
                                <option value="admin">Administrateur</option>
                                <option value="staff">Staff</option>
                                <option value="user">Utilisateur</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Filter size={12} className="text-primary" />
                            </div>
                        </div>

                        <div className="relative">
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                className="appearance-none pl-4 pr-10 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#bab59c] focus:outline-none focus:border-primary/30 transition-all cursor-pointer hover:bg-white/10 italic"
                            >
                                <option value="all">Tous les Statuts</option>
                                <option value="active">Actif</option>
                                <option value="inactive">Bloqué</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Activity size={12} className="text-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <DataTable
                columns={columns}
                data={members}
                loading={loading}
            />
        </div>
    );
}
