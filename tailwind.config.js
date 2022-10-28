/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter, sans-serif']
    },
    extend: {
      colors: {
        'background': "#121212",
        'light-background': "#262626",
      }
    },
  },
  plugins: [],
}
