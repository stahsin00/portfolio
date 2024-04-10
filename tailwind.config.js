/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '120': '30rem', // Adjust 30rem to your desired width
      }
    },
  },
  plugins: [],
}