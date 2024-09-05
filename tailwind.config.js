/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dominant: "#28161c",
        accent: "#ed5e93",
        compliment: "#fff5f9",
      },
    },
  },
  plugins: [],
};
