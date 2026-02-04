'use client';

import React, { useState, useEffect } from 'react';
import {
    TrendingUp, Search
} from 'lucide-react';
import { apiClient } from '@/services/api';
import { NewsCard } from '@/components/news/NewsCard';
import { NewsFeatured } from '@/components/news/NewsFeatured';
import { NewsCategories } from '@/components/news/NewsCategories';

interface NewsArticle {
    _id: string;
    title: string;
    excerpt: string;
    image: string;
    author: string;
    publishedAt: string;
    category: string;
    views: number;
    league?: {
        name: string;
        logo: string;
    };
    teams?: Array<{
        name: string;
        logo: string;
    }>;
}

export default function NewsPage() {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [featuredNews, setFeaturedNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchFeaturedNews();
    }, []);

    useEffect(() => {
        fetchNews();
    }, [category, searchTerm, page]);

    const fetchFeaturedNews = async () => {
        try {
            const response = await apiClient.get('/news/featured');
            setFeaturedNews(response.data.news);
        } catch (error) {
            console.error('Failed to fetch featured news:', error);
        }
    };

    const fetchNews = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/news', {
                params: {
                    page,
                    limit: 12,
                    category: category !== 'all' ? category : undefined,
                    search: searchTerm || undefined,
                },
            });

            setNews(response.data.news);
            setTotalPages(response.data.pagination.pages);
        } catch (error) {
            console.error('Failed to fetch news:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-ucl-midnight">
            {/* Header */}
            <div className="bg-gradient-to-r from-ucl-blue via-ucl-midnight to-ucl-blue py-12 px-6 border-b border-ucl-accent/20">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        ⚽ Football News
                    </h1>
                    <p className="text-white/80 text-lg">
                        Les dernières actualités du monde du football
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Featured News */}
                {featuredNews.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <TrendingUp className="text-ucl-accent" size={28} />
                                À la Une
                            </h2>
                        </div>
                        <NewsFeatured news={featuredNews} />
                    </div>
                )}

                {/* Search & Filters */}
                <div className="mb-8 space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher une actualité..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-ucl-accent text-gray-900 dark:text-white"
                        />
                    </div>

                    {/* Categories */}
                    <NewsCategories
                        activeCategory={category}
                        onCategoryChange={setCategory}
                    />
                </div>

                {/* News Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 dark:bg-gray-800 h-48 rounded-t-xl" />
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-b-xl">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : news.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {news.map((article) => (
                                <NewsCard key={article._id} article={article} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex items-center justify-center gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-white"
                                >
                                    Précédent
                                </button>

                                <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
                                    Page {page} sur {totalPages}
                                </span>

                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-white"
                                >
                                    Suivant
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            Aucune actualité trouvée
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
