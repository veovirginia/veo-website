/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      fontFamily: {
         sans: ["Inter, sans-serif"],
         display: ["Satoshi", "sans-serif"],
      },
      extend: {
         colors: {
            background: "#121212",
            primary: "#537FE7",
            "light-teal": "#19A7CE",
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
            "black-pearl": {
               50: "#eef5ff",
               100: "#c5daff",
               200: "#8ab1ff",
               300: "#4885ff",
               400: "#1356ee",
               500: "#003ed2",
               600: "#002fa9",
               700: "#002286",
               800: "#051d6a",
               900: "#010309",
            },
            tango: {
               50: "#fff8ed",
               100: "#feefd6",
               200: "#fcdaac",
               300: "#f9bf78",
               400: "#f69941",
               500: "#f37c1b",
               600: "#e46212",
               700: "#bd4a11",
               800: "#963b16",
               900: "#793215",
            },
            vesuvius: {
               50: "#fffbeb",
               100: "#fef3c7",
               200: "#fde58a",
               300: "#fbd24e",
               400: "#fabe25",
               500: "#f49d0c",
               600: "#d87607",
               700: "#bc560a",
               800: "#923f0e",
               900: "#78340f",
            },
            "blue-ribbon": {
               50: "#edfaff",
               100: "#d6f1ff",
               200: "#b5e9ff",
               300: "#83ddff",
               400: "#48c7ff",
               500: "#1ea8ff",
               600: "#068aff",
               700: "#0070f3",
               800: "#085ac5",
               900: "#0d4e9b",
            },
         },
      },
   },
   plugins: [],
}
