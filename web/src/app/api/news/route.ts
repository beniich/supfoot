
import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET() {
    try {
        // Flux Google News pour le football français
        const GOOGLE_NEWS_RSS = 'https://news.google.com/rss/search?q=football&hl=fr&gl=FR&ceid=FR:fr';

        const feed = await parser.parseURL(GOOGLE_NEWS_RSS);

        // On transforme le format RSS en format compatible avec notre composant NewsCard
        const articles = feed.items.map(item => {
            // Google News RSS ne donne pas d'image directement de manière simple
            // On va essayer d'en mettre une par défaut ou laisser le composant gérer
            return {
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                source: { name: item.creator || feed.title },
                description: item.contentSnippet,
                // Pour l'image, on utilise une image de foot aléatoire de qualité
                urlToImage: `https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800`
            };
        });

        return NextResponse.json({ articles: articles.slice(0, 10) });
    } catch (error) {
        console.error("Erreur RSS Google News:", error);
        return NextResponse.json({ articles: [], error: 'Failed to fetch RSS news' });
    }
}
