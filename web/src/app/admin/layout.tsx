'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: 'dashboard' },
        { name: 'Utilisateurs', href: '/admin/users', icon: 'group' },
        { name: 'Analytics', href: '/admin/analytics', icon: 'analytics' },
        { name: 'Logs', href: '/admin/logs', icon: 'terminal' },
        { name: 'Matchs', href: '/admin/matches', icon: 'sports_soccer' },
        { name: 'Billets', href: '/admin/tickets', icon: 'confirmation_number' },
        { name: 'Paramètres', href: '/admin/settings', icon: 'settings' },
    ];

    return (
        <ProtectedRoute requireAdmin={true}>
            <div className="flex min-h-screen bg-[#0a0a0b] text-white">
                {/* Sidebar */}
                <aside className="w-64 bg-[#121214] border-r border-white/5 flex flex-col hidden md:flex">
                    <div className="p-6 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
                            <span className="material-symbols-outlined text-background-dark filled">shield_person</span>
                        </div>
                        <span className="text-xl font-bold tracking-tighter uppercase italic">
                            Admin <span className="text-primary">Hub</span>
                        </span>
                    </div>

                    <nav className="flex-1 px-4 py-4 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                        ? 'bg-primary text-background-dark font-bold'
                                        : 'hover:bg-white/5 text-[#bab59c]'
                                        }`}
                                >
                                    <span className={`material-symbols-outlined ${isActive ? 'filled' : 'opacity-60 group-hover:opacity-100'}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-xs uppercase tracking-widest font-black">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-6 mt-auto">
                        <Link
                            href="/"
                            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-all text-xs uppercase tracking-widest font-black"
                        >
                            <span className="material-symbols-outlined">logout</span>
                            Quitter Admin
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col max-h-screen overflow-y-auto">
                    {/* Header Mobile */}
                    <header className="md:hidden flex items-center justify-between p-4 bg-[#121214] border-b border-white/5 sticky top-0 z-50">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-background-dark text-sm filled">shield_person</span>
                            </div>
                            <span className="text-sm font-bold tracking-tighter uppercase italic">Admin</span>
                        </div>
                        <button className="h-10 w-10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </header>

                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
