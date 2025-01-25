/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '120': '30rem',
      },
      height: {
        '120': '27rem',
      },
      keyframes: {
        scanline: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 4px' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' }
        }
      },
      animation: {
        scanline: 'scanline 0.8s linear infinite', 
      },
    },
    fontFamily: {
      'sans': ['Roboto', 'sans-serif'],
      'serif': ['Roboto', 'serif'],
      'mono': ['Roboto', 'monospace'],
      'arial': ['Arial', 'sans-serif'],
      'vt323': ['VT323', 'monospace'],
    },
  },
  plugins: [
    tailwindScrollbar,
  ],
}

