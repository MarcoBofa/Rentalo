/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-85": "#242424",
        "gray-95": "#141414",
        "gray-96": "#131313",
        nav: "#21253a",
        settings: "#f2f3f8",
        textSettings: "#636c9b",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        "128": "32rem",
      },
      opacity: {
        85: ".85",
      },
    },
  },
  plugins: [],
};
