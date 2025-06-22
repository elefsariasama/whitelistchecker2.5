// ==== File: tailwind.config.js ====

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        neon: '#00ffc3',
        dark: '#0f0f0f',
        pinkish: '#ff007a'
      },
    },
  },
  plugins: [],
};
