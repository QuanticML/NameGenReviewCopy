module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: "1080px",
      },
      colors: {
        coral: "#ff4d63",
        coraldark: "#a52e3b",
        eggplant: "#35092c",
        bonegray: "#faf6f0",
      },

      fontFamily: {
        sans: ["Proxima Nova Soft", "sans-serif"],
      },
    },
  },
  plugins: [],
};
