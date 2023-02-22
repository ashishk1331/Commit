/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
        ],
    theme: {
        extend: {
            colors :{
                primary: {
                    100: '#6CCF61',
                    200: '#51A44C',
                    300: '#2E6A37'
                },
                secondary: {
                    100: '#3D4248',
                    200: '#181B22',
                    300: '#0D1015'
                },
                neutral: {
                    100: '#FFFFFF'
                }
            },
        },
    },
    plugins: [],
}