'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
    requireStaff?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requireAdmin = false,
    requireStaff = false,
}) => {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
    }, [loading, isAuthenticated, router, pathname]);

    useEffect(() => {
        if (!loading && isAuthenticated && user) {
            if (requireAdmin && user.role !== 'admin') {
                router.push('/unauthorized');
            }
            if (requireStaff && !['admin', 'staff'].includes(user.role || '')) {
                router.push('/unauthorized');
            }
        }
    }, [loading, isAuthenticated, user, requireAdmin, requireStaff, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-transparent">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f2cc0d]" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect
    }

    if (requireAdmin && user?.role !== 'admin') {
        return null; // Will redirect
    }

    if (requireStaff && !['admin', 'staff'].includes(user?.role || '')) {
        return null;
    }

    return <>{children}</>;
};
