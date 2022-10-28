/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      fontFamily: {
         sans: ["Inter, sans-serif"],
      },
      extend: {
         colors: {
            background: "#121212",
            "light-background": "#1c1c1c",
            "light-background-border": "#373637",
            "label-text": "#CCCCCC",
            "input-text": "#9B9B9B",
         },
      },
   },
   plugins: [],
}
