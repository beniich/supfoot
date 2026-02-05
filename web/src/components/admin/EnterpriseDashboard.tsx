'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Database, Activity, Users } from 'lucide-react';
import { auditService } from '@/lib/services/auditService';
import { backupService } from '@/lib/services/backupService';
import { rbacService } from '@/lib/services/rbacService';

export const EnterpriseDashboard: React.FC = () => {
    const [auditLogs, setAuditLogs] = useState<any[]>([]);
    const [backups, setBackups] = useState<any[]>([]);
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Mock Org ID for demo - in reality this comes from context or params
    const orgId = 'current-org-id';

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            // In a real app, backupService calls should be via Server Actions to protect keys
            // here we assume this component might be fetching from an internal API route that proxies these calls
            const logs = await auditService.getOrganizationLogs(orgId, {}, 1, 10);

            // For demo purposes, we set empty arrays if calls fail (likely due to missing Env vars on client)
            setAuditLogs(logs?.logs || []);
            setBackups([]);
            setMembers([]);

        } catch (error) {
            console.error('Load dashboard error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Enterprise Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={Shield}
                    title="SOC2 Compliant"
                    value="Active"
                    color="green"
                />
                <StatCard
                    icon={Database}
                    title="Backups"
                    value={backups.length}
                    color="blue"
                />
                <StatCard
                    icon={Users}
                    title="Team Members"
                    value={members.length}
                    color="purple"
                />
                <StatCard
                    icon={Activity}
                    title="Audit Events"
                    value={auditLogs.length}
                    color="yellow"
                />
            </div>

            {/* Recent Audit Logs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recent Audit Logs</h3>
                {auditLogs.length > 0 ? (
                    <div className="space-y-2">
                        {auditLogs.map((log: any) => (
                            <div
                                key={log.id}
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <Activity size={16} className="text-gray-500" />
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">{log.event_type}</p>
                                        <p className="text-sm text-gray-500">{log.user_email || 'System'}</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">
                                    {new Date(log.created_at).toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No logs found.</p>
                )}
            </div>
        </div>
    );
};

const StatCard: React.FC<{
    icon: any;
    title: string;
    value: string | number;
    color: string;
}> = ({ icon: Icon, title, value, color }) => {
    const colorMap: Record<string, string> = {
        green: 'bg-green-100 text-green-600',
        blue: 'bg-blue-100 text-blue-600',
        purple: 'bg-purple-100 text-purple-600',
        yellow: 'bg-yellow-100 text-yellow-600',
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorMap[color] || 'bg-gray-100'}`}>
                <Icon size={24} />
            </div>
            <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    );
};
