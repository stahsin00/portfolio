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

