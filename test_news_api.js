
const API_KEY = '5a7a9e3e070d440989f368420606997d'; // Note: Cette clé semble invalide ou a expiré. 

// Je vais utiliser une URL "mock" (imitation) pour simuler une réponse 
// et vous montrer la structure des données que vous recevrez avec une vraie clé.
// En production, remplacez simplement fetch(mockUrl) par fetch(realUrl).

async function fetchFootballNews() {
    console.log("Tentative de connexion à l'API de news...");

    // Simulation de données (car sans clé valide, le test échoue avec 401)
    const mockData = {
        status: "ok",
        totalResults: 3,
        articles: [
            {
                source: { id: "le-equipe", name: "L'Équipe" },
                author: "Rédaction",
                title: "Mercato : Mbappé annonce sa décision finale",
                description: "L'attaquant français a enfin révélé où il jouera la saison prochaine...",
                url: "https://www.lequipe.fr/Football/...",
                urlToImage: "https://medias.lequipe.fr/img-photo-jpg/...",
                publishedAt: "2024-02-03T20:30:00Z",
                content: "C'est la fin du feuilleton..."
            },
            {
                source: { id: null, name: "Foot Mercato" },
                author: "Alexis Pereira",
                title: "PSG : Luis Enrique prépare un coup tactique",
                description: "Pour le match de Ligue des Champions, l'entraîneur espagnol...",
                url: "https://www.footmercato.net/...",
                urlToImage: "https://assets.footmercato.net/...",
                publishedAt: "2024-02-03T19:15:00Z",
                content: "Le Paris Saint-Germain affronte..."
            },
            {
                source: { id: "eurosport", name: "Eurosport" },
                author: "Eurosport",
                title: "CAN 2024 : La Côte d'Ivoire en finale !",
                description: "Au terme d'un match épique, les Éléphants se qualifient...",
                url: "https://www.eurosport.fr/...",
                urlToImage: "https://i.eurosport.com/...",
                publishedAt: "2024-02-03T18:45:00Z",
                content: "Quelle histoire incroyable..."
            }
        ]
    };

    // Affichage des résultats
    console.log("\n=== ACTUALITÉS FOOTBALL (Simulation) ===");
    console.log(`Statut: ${mockData.status}`);
    console.log(`Nombre de résultats trouvés: ${mockData.totalResults}`);
    console.log("------------------------------------------------");

    mockData.articles.forEach((article, index) => {
        console.log(`\n[Article #${index + 1}]`);
        console.log(`TITRE   : ${article.title}`);
        console.log(`SOURCE  : ${article.source.name}`);
        console.log(`DATE    : ${article.publishedAt}`);
        console.log(`LIEN    : ${article.url}`);
    });

    console.log("\n------------------------------------------------");
    console.log("NOTE : Pour que cela fonctionne réellement, il faut s'inscrire sur");
    console.log("https://newsapi.org/register pour obtenir une API Key gratuite.");
}

fetchFootballNews();
