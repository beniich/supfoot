
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
            // Google News RSS titles often end with " - Source Name"
            // We can cleaner this up if we want, or keep it.
            return {
                title: item.title,
                url: item.link, // Changé de 'link' à 'url' pour matcher NewsSection
                publishedAt: item.isoDate || item.pubDate, // Matcher le nom de champ attendu
                source: { name: item.creator || "Google News" },
                description: item.contentSnippet,
                urlToImage: `https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800`
            };
        });

        return NextResponse.json({ articles: articles.slice(0, 10) });
    } catch (error) {
        console.error("Erreur RSS Google News:", error);
        return NextResponse.json({ articles: [], error: 'Failed to fetch RSS news' });
    }
}
