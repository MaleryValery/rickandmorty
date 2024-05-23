/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

  darkMode: 'selector',
  theme: {
    theme: {
      extend: {},
      screens: {
        'sm': '650px',
  
        'lg': '1254px',
  
        '2xl': '1880px',
      }
    },
  },
  plugins: [],
  
}