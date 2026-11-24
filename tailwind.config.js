/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#09090B',
        surface: '#121215',
        elevated: '#18181C',
        core: {
          DEFAULT: '#FF4D24', // Exact CORE brand orange from somoscore.fit
          hover: '#E53E17',
          glow: 'rgba(255, 77, 36, 0.25)',
        },
        emerald: {
          DEFAULT: '#10B981',
          bg: 'rgba(16, 185, 129, 0.08)',
          border: 'rgba(16, 185, 129, 0.3)',
        },
        textPrimary: '#FFFFFF',
        textSecondary: '#A1A1AA',
        textMuted: '#52525B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        'brand': '0.16em',
      },
      boxShadow: {
        'phone': '0 25px 70px -10px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.07)',
        'glow-core': '0 0 20px rgba(255, 77, 36, 0.35)',
      }
    },
  },
  plugins: [],
}
