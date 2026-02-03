
import { NextResponse } from 'next/server';

export async function GET() {
    const API_KEY = process.env.NEWS_API_KEY;

    if (!API_KEY) {
        // Données de démonstration si pas de clé
        return NextResponse.json({
            articles: [
                {
                    source: { name: "Démo: L'Équipe" },
                    title: "Exemple : Ajoutez votre clé API pour voir les news",
                    description: "Ceci est un exemple car la clé NEWS_API_KEY est manquante dans .env.local",
                    url: "#",
                    urlToImage: "https://images.unsplash.com/photo-1579952363873-27f3bade8f55?w=800",
                    publishedAt: new Date().toISOString()
                }
            ]
        });
    }

    try {
        const res = await fetch(`https://newsapi.org/v2/everything?q=football&language=fr&sortBy=publishedAt&pageSize=6&apiKey=${API_KEY}`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch news' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
