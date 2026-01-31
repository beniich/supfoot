// Script de correction automatique des erreurs ESLint
// Exécuter avec: node fix-eslint.js

const fs = require('fs');
const path = require('path');

// Fichiers et corrections à appliquer
const fixes = [
    {
        file: 'src/app/market/page.tsx',
        replacements: [
            { from: "Don't Miss:", to: "Don&apos;t Miss:" },
            { from: '"Live Odds"', to: '&quot;Live Odds&quot;' }
        ]
    },
    {
        file: 'src/app/match-center/page.tsx',
        replacements: [
            { from: "let's", to: "let&apos;s" }
        ]
    },
    {
        file: 'src/app/page.tsx',
        replacements: [
            { from: "Botola Pro • 78'", to: "Botola Pro • 78&apos;" },
            { from: "Premier League • 12'", to: "Premier League • 12&apos;" },
            { from: "Mbappé's", to: "Mbappé&apos;s" }
        ]
    },
    {
        file: 'src/app/shop/confirmation/page.tsx',
        replacements: [
            { from: "What's Next?", to: "What&apos;s Next?" }
        ]
    }
];

// Fonction pour appliquer les corrections
function applyFixes() {
    fixes.forEach(({ file, replacements }) => {
        const filePath = path.join(__dirname, file);

        try {
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            replacements.forEach(({ from, to }) => {
                if (content.includes(from)) {
                    content = content.replace(new RegExp(from, 'g'), to);
                    modified = true;
                    console.log(`✅ Fixed "${from}" in ${file}`);
                }
            });

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`📝 Updated ${file}`);
            }
        } catch (error) {
            console.error(`❌ Error processing ${file}:`, error.message);
        }
    });

    console.log('\n🎉 ESLint fixes applied!');
}

applyFixes();
