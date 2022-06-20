module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "inner-lg": "inset 0px 0px 13px 0px rgba(0,0,0,0.75)",
      },
      zIndex: {
        "s-max": 999,
        max: 1000,
      },
    },
  },
  plugins: [],
};
