// src/pages/NewsDetail.tsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Clock, Eye, User,
    ArrowLeft, Facebook, Twitter, Linkedin
} from 'lucide-react';
import { apiClient } from '@/services/api';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { NewsCard } from '@/components/news/NewsCard';

interface NewsArticle {
    _id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    publishedAt: string;
    category: string;
    views: number;
    league?: {
        _id: string;
        name: string;
        logo: string;
    };
}

export default function NewsDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);

    useEffect(() => {
        if (id) {
            fetchArticle();
        }
    }, [id]);

    const fetchArticle = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(`/api/news/${id}`);
            setArticle(response.data.news);

            // Fetch related news
            if (response.data.news.league) {
                try {
                    const relatedResponse = await apiClient.get('/api/news/league/' + response.data.news.league._id, {
                        params: { limit: 3 },
                    });
                    setRelatedNews(relatedResponse.data.news.filter((n: NewsArticle) => n._id !== id));
                } catch (e) {
                    console.warn("Could not fetch related news", e);
                }
            }
        } catch (error) {
            console.error('Failed to fetch article:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShare = (platform: string) => {
        if (!article) return;

        const url = window.location.href;
        const text = article.title;

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
            linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`,
        };

        window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Article non trouvé</p>
            </div>
        );
    }

    const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
        addSuffix: true,
        locale: fr,
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        to="/news"
                        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors mb-4"
                    >
                        <ArrowLeft size={20} />
                        <span>Retour aux actualités</span>
                    </Link>

                    {/* Category */}
                    <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold">
                            {article.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {article.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <User size={16} />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{timeAgo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye size={16} />
                            <span>{article.views.toLocaleString()} vues</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Featured Image */}
                {article.image && (
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-96 object-cover rounded-2xl mb-8"
                    />
                )}

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                    {/* Simple text rendering for now, could be improved with a markdown parser or rich text renderer if needed */}
                    {article.content.split('\n').map((paragraph: string, idx: number) => (
                        <p key={idx} className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{paragraph}</p>
                    ))}
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-4 py-6 border-y border-gray-200 dark:border-gray-700">
                    <span className="font-medium text-gray-900 dark:text-white">
                        Partager :
                    </span>
                    <button
                        onClick={() => handleShare('facebook')}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        <Facebook size={20} />
                    </button>
                    <button
                        onClick={() => handleShare('twitter')}
                        className="p-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
                    >
                        <Twitter size={20} />
                    </button>
                    <button
                        onClick={() => handleShare('linkedin')}
                        className="p-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
                    >
                        <Linkedin size={20} />
                    </button>
                </div>

                {/* Related News */}
                {relatedNews.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Articles similaires
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedNews.map((news: NewsArticle) => (
                                <NewsCard key={news._id} article={news} />
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
}
