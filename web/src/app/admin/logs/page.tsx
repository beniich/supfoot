'use client';

import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, AlertCircle, Info, CheckCircle, XCircle, Terminal, Calendar } from 'lucide-react';
import { apiClient } from '@/services/api';

interface LogEntry {
    _id: string;
    level: 'info' | 'warn' | 'error';
    message: string;
    timestamp: string;
    meta?: any;
}

export default function LogsPage() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchLogs();

        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchLogs, 30000);
        return () => clearInterval(interval);
    }, [filter]);

    const fetchLogs = async () => {
        try {
            const response = await apiClient.get('/admin/logs', {
                params: {
                    level: filter === 'all' ? undefined : filter,
                    limit: 100,
                },
            });
            if (response.data.success) {
                setLogs(response.data.logs);
            }
        } catch (error) {
            console.error('Error fetching logs:', error);
        } finally {
            setLoading(false);
        }
    };

    const getLogIcon = (level: string) => {
        switch (level) {
            case 'error':
                return <XCircle size={16} className="text-red-500" />;
            case 'warn':
                return <AlertCircle size={16} className="text-yellow-500" />;
            case 'info':
                return <Info size={16} className="text-blue-500" />;
            default:
                return <CheckCircle size={16} className="text-green-500" />;
        }
    };

    const getLogColor = (level: string) => {
        switch (level) {
            case 'error':
                return 'border-red-500/20 bg-red-500/5';
            case 'warn':
                return 'border-yellow-500/20 bg-yellow-500/5';
            case 'info':
                return 'border-blue-500/20 bg-blue-500/5';
            default:
                return 'border-white/5 bg-white/5';
        }
    };

    const filteredLogs = logs.filter((log) =>
        log.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic flex items-center gap-3">
                        <Terminal size={32} className="text-primary" />
                        Logs <span className="text-primary italic">Système</span>
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#bab59c] opacity-60 mt-2">
                        Monitoring en temps réel • {logs.length} entrées récentes
                    </p>
                </div>

                <button
                    onClick={fetchLogs}
                    className="h-11 px-6 rounded-xl bg-primary text-background-dark shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest italic"
                >
                    <RefreshCw size={16} className={loading ? 'animate-spin' : ''} strokeWidth={3} />
                    <span>Actualiser</span>
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-[#121214] border border-white/5 rounded-3xl p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#bab59c] group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Rechercher une erreur, une action, un utilisateur..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-white text-xs font-bold focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all placeholder:text-[#bab59c]/30 uppercase tracking-widest font-mono"
                        />
                    </div>

                    <div className="relative">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="appearance-none pl-4 pr-10 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#bab59c] focus:outline-none focus:border-primary/30 transition-all cursor-pointer hover:bg-white/10 italic w-full lg:w-48"
                        >
                            <option value="all">Tous les niveaux</option>
                            <option value="info">Information</option>
                            <option value="warn">Avertissement</option>
                            <option value="error">Erreur Critique</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <AlertCircle size={12} className="text-primary" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Logs List Container */}
            <div className="bg-[#121214] border border-white/5 rounded-3xl p-2 relative overflow-hidden">
                {/* Terminal Effect Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(242,204,13,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>

                <div className="max-h-[600px] overflow-y-auto space-y-px p-4 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
                    {filteredLogs.map((log) => (
                        <div
                            key={log._id}
                            className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.01] hover:z-10 group ${getLogColor(log.level)}`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="mt-1">{getLogIcon(log.level)}</div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[9px] font-black text-primary/50 uppercase font-mono tracking-tighter">
                                                [{new Date(log.timestamp).toLocaleTimeString('fr-FR')}]
                                            </span>
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest italic ${log.level === 'error' ? 'text-red-500' :
                                                    log.level === 'warn' ? 'text-yellow-500' :
                                                        'text-blue-500'
                                                }`}>
                                                {log.level}
                                            </span>
                                        </div>
                                        <span className="text-[8px] font-black text-[#bab59c]/30 uppercase tracking-widest">
                                            {new Date(log.timestamp).toLocaleDateString('fr-FR')}
                                        </span>
                                    </div>

                                    <p className="text-xs text-white/90 font-mono leading-relaxed break-words">
                                        {log.message}
                                    </p>

                                    {log.meta && Object.keys(log.meta).length > 0 && (
                                        <details className="mt-3 group/meta">
                                            <summary className="text-[9px] font-black text-primary uppercase cursor-pointer hover:opacity-70 transition-opacity list-none flex items-center gap-1 italic tracking-widest">
                                                <span className="material-symbols-outlined text-[10px]">data_object</span>
                                                Payload Metadata
                                            </summary>
                                            <pre className="mt-2 p-4 bg-black/40 rounded-xl text-[10px] text-primary/70 font-mono overflow-x-auto border border-white/5 shadow-inner">
                                                {JSON.stringify(log.meta, null, 2)}
                                            </pre>
                                        </details>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredLogs.length === 0 && !loading && (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <span className="material-symbols-outlined text-4xl text-white/5">search_off</span>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 italic">
                                Aucun log ne correspond à votre recherche
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
