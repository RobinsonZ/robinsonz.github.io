/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "lato": ["Lato", "sans-serif"],
        "source-serif": ["'Source Serif 4'", "serif"],
        "cascadia-mono": ["Cascadia Mono", "monospace"],
      },
      boxShadow: {
        "xl-top": '0 -20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 10px -6px rgb(0 0 0 / 0.1)'
      }
    },
  },
  plugins: [],
};
