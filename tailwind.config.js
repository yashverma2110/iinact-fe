/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.5rem',
      },
      height: {
        slim: '1px',
      },
      maxWidth: {
        link: '100px',
      },
    },
  },
  plugins: [],
};
