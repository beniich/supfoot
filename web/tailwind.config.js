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
                primary: '#003399', // Updated to UEFA Blue
                secondary: '#000B49', // Midnight Blue
                accent: '#00D1FF', // Electric Cyan

                'background-light': '#f8fafc',
                'background-dark': '#010a1a',

                // Theme specific
                'ucl-midnight': '#010a1a',
                'ucl-blue': '#003399',
                'ucl-accent': '#00f5ff',

                // Legacy mappings
                'surface-dark': '#1e293b',
                'surface-highlight': '#334155',
                'field-green': '#1a4731',
            },
            fontFamily: {
                display: ['Space Grotesk', 'sans-serif'],
                body: ['Noto Sans', 'sans-serif'],
            },
            boxShadow: {
                'glow': '0 0 15px rgba(242, 204, 13, 0.3)',
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
