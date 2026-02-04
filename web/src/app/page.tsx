// src/app/page.tsx
'use client';

import Header from '@/components/shared/Header';
import SubNav from '@/components/shared/SubNav';
import MatchesRail from '@/components/home/MatchesRail';
import StoriesRail from '@/components/home/StoriesRail';
import HeroSection from '@/components/home/HeroSection';
import HeadlinesList from '@/components/home/HeadlinesList';
import BottomNav from '@/components/BottomNav';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-ucl-midnight text-slate-900 dark:text-white font-display antialiased">
            <Header />
            <SubNav />

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
