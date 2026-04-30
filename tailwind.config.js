/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8EE",
        sage: "#A8C5A0",
        sky: "#7EB3C9",
        coral: "#F4A57A",
        lavender: "#C4B5D6",
        sand: "#E8D5B0",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}

