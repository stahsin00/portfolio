/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '120': '30rem', // Adjust 30rem to your desired width
      }
    },
    fontFamily: {
      'sans': ['Roboto', 'sans-serif'],
      'serif': ['Roboto', 'serif'],
      'mono': ['Roboto', 'monospace'],
      'arial': ['Arial', 'sans-serif'],
    },
  },
  plugins: [],
}

