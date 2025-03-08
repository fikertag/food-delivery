/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
      },
      colors: {
        primary: "#38d072",
        secondary: "#8eecb2",
        accent: {
          DEFAULT: "#050c08",
          hover: "#00e187",
        },
      },
    },
  },
  plugins: [],
};
