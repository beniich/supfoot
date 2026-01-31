'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Import MobileQRScanner dynamically to avoid SSR issues with Capacitor
const MobileQRScanner = dynamic(
    () => import('../../components/mobile/MobileQRScanner').then((mod) => mod.MobileQRScanner),
    { ssr: false }
);

export default function StadiumScannerPage() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="min-h-screen bg-[#1A1915]"></div>;
    }

    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-white overflow-hidden h-screen flex flex-col">
            <MobileQRScanner
                onClose={() => window.history.back()}
                onScanComplete={(result) => console.log('Scan complete:', result)}
            />
        </div>
    );
}

