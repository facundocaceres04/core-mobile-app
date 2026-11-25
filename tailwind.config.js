import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#09090B',
        surface: '#121215',
        elevated: '#18181C',
        core: {
          DEFAULT: '#FF4D24',
          hover: '#E53E17',
          glow: 'rgba(255, 77, 36, 0.25)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        'safe-t': 'env(safe-area-inset-top, 0px)',
        'safe-b': 'env(safe-area-inset-bottom, 0px)',
      },
      boxShadow: {
        'glow-core': '0 0 20px rgba(255, 77, 36, 0.35)',
      },
    },
  },
  plugins: [animate],
};
