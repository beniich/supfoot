/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#f2cc0d',
                'background-light': '#f8f8f5',
                'background-dark': '#221f10',
                'surface-dark': '#2d2a1d',
                'surface-highlight': '#2a2718',
            },
            fontFamily: {
                display: ['Space Grotesk', 'sans-serif'],
                body: ['Lexend', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '0.375rem',
                lg: '0.5rem',
                xl: '0.75rem',
                '2xl': '1rem',
                full: '9999px',
            },
        },
    },
    plugins: [],
}
