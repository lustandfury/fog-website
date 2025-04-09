/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#44FFEE',
        'primary-hover': '#33EED9', // Slightly darker shade for hover states
      },
    },
  },
  plugins: [],
};