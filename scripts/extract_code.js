const fs = require('fs');
const path = require('path');

const markdownFile = process.argv[2];
const baseDir = process.argv[3] || 'backend';

if (!markdownFile) {
    console.error('Please provide a markdown file path.');
    process.exit(1);
}

const content = fs.readFileSync(markdownFile, 'utf8');
const codeBlockRegex = /```(?:javascript|js|typescript|ts|jsx|tsx|env|html|css)\n([\s\S]*?)\n```/g;
let match;

while ((match = codeBlockRegex.exec(content)) !== null) {
    const code = match[1];

    // Try to find a line that looks like a file path comment at the very beginning of the code block
    let pathMatch = code.match(/^\/\/\s*([^\r\n]+)/);
    if (!pathMatch) {
        pathMatch = code.match(/^#\s*([^\r\n]+)/); // For .env or bash
    }

    if (pathMatch) {
        let relativePath = pathMatch[1].trim();

        // Normalize path: remove 'server/' or './'
        relativePath = relativePath.replace(/^(server\/|\.\/)/, '');

        // Only accept if it looks like a path (starts with src/ or a filename with extension)
        if (relativePath.startsWith('src/') || relativePath === 'package.json' || relativePath === '.env' || relativePath.includes('/')) {
            // Double check it's not a URL
            if (!relativePath.includes('://')) {
                const absolutePath = path.join(baseDir, relativePath);
                const dir = path.dirname(absolutePath);

                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }

                fs.writeFileSync(absolutePath, code);
                console.log(`Saved: ${absolutePath}`);
                continue;
            }
        }
    }
    console.log('Skipping non-file code block.');
}
