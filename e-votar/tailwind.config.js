/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8f45ff",
        primaryDark: "#7232d1",
        primaryLight: "#ad75ff",
        secondary: "#3d3e40",
      },
    },
  },
  plugins: [],
};
