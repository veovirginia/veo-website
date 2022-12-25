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
            "light-background": "#1F1F1F",
            "light-background-border": "#373637",
            "label-text": "#CCCCCC",
            "input-text": "#757575",
            noir: {
               50: "#f7f7f7",
               100: "#e3e3e3",
               200: "#c8c8c8",
               300: "#a4a4a4",
               400: "#818181",
               500: "#666666",
               600: "#515151",
               700: "#434343",
               800: "#383838",
               900: "#030303",
            },
            "neo-gray": {
               50: "#f9faf9",
               100: "#f0f1f1",
               200: "#dddfe1",
               300: "#b7bdbe",
               400: "#889493",
               500: "#69726d",
               600: "#545750",
               700: "#40413c",
               800: "#2b2b2a",
               900: "#0b0b0b",
            },
         },
      },
   },
   plugins: [],
}
