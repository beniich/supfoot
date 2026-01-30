/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: '#f2cc0d',
                'background-dark': '#221f10',
                'surface-dark': '#2d2a1d',
            },
        },
    },
    plugins: [],
}
