/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        plex: ["'IBM Plex Sans'", "sans-serif"],
        "space-grotesk": ["'Space Grotesk'", "sans-serif"],
        "source-serif": ["'Source Serif 4'", "serif"],
        "roboto-mono": ["Roboto Mono", "monospace"],
      },
      boxShadow: {
        "xl-top": '0 -20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 10px -6px rgb(0 0 0 / 0.1)'
      }
    },
  },
  plugins: [],
};
