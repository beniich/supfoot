// src/app/page.tsx
'use client';

import React from 'react';
import HomeHeader from '@/components/home/HomeHeader';
import MatchesRail from '@/components/home/MatchesRail';
import StoriesRail from '@/components/home/StoriesRail';
import HeroSection from '@/components/home/HeroSection';
import HeadlinesList from '@/components/home/HeadlinesList';
import BottomNav from '@/components/BottomNav'; // Assuming this exists or I should use the one from the design

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-ucl-midnight text-slate-900 dark:text-white font-display antialiased">
            <HomeHeader />

            <main className="flex flex-col w-full">
                <MatchesRail />
                <StoriesRail />
                <HeroSection />
                <HeadlinesList />
            </main>

            <BottomNav />
        </div>
    );
}
