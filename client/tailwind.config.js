/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f0f13',
          card: '#15151b',
          surface: '#1b1c24',
          hover: '#22232e',
          border: '#262734',
          muted: '#8b8e9f',
        },
        brand: {
          purple: '#8b5cf6',
          purpleLight: '#a78bfa',
          purpleDark: '#7c3aed',
          flame: '#ef4444',
          orange: '#f97316'
        }
      }
    },
  },
  plugins: [],
}
