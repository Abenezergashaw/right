/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "screen-safe": "calc(var(--vh, 1vh) * 100)",
      },
      fontFamily: {
        sans: ['"Roboto Condensed"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
