
'use client';

import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';

export default function NewsSection() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNews() {
            try {
                const res = await fetch('/api/news');
                const data = await res.json();
                if (data.articles) {
                    setArticles(data.articles);
                }
            } catch (error) {
                console.error("Failed to load news", error);
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, []);

    if (loading) {
        return <div className="p-4 text-center text-gray-400">Chargement des actus...</div>;
    }

    return (
        <section className="mt-6 mb-8">
            <div className="px-4 mb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Actualités Football</h3>
                <span className="text-[10px] text-gray-400">Flux Google News</span>
            </div>

            <div className="flex flex-col gap-4 px-4">
                {articles.slice(0, 5).map((article: any, index: number) => (
                    <a key={`${article.url}-${index}`} href={article.url} target="_blank" rel="noopener noreferrer" className="block">
                        <NewsCard
                            title={article.title}
                            image={article.urlToImage || 'https://images.unsplash.com/photo-1579952363873-27f3bade8f55?auto=format&fit=crop&q=80&w=800'}
                            time={article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Récemment'}
                            badge={article.source.name || "Actu"}
                            badgeVariant={index % 2 === 0 ? 'primary' : 'secondary'}
                            description={article.description}
                        />
                    </a>
                ))}
            </div>

            {articles.length === 0 && (
                <div className="text-center text-gray-400 py-4 px-4 bg-white/5 rounded-xl mx-4">
                    <p>Aucune actualité disponible.</p>
                </div>
            )}
        </section>
    );
}
