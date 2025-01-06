/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Extension des couleurs pour notre thème sombre violet/bleu
        primary: {
          DEFAULT: '#6366f1', // Indigo-500
          dark: '#4f46e5',    // Indigo-600
        },
        secondary: {
          DEFAULT: '#818cf8', // Indigo-400
          dark: '#6366f1',    // Indigo-500
        },
        background: {
          DEFAULT: '#1e1b4b', // Indigo-950
          light: '#312e81',   // Indigo-900
        }
      },
    },
  },
  plugins: [],
}