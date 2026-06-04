/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],

  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        primaryDark: '#4338ca',
      },

      borderRadius: {
        card: '1rem',
      },

      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.08)',
      },
    },
  },

  plugins: [],
};
