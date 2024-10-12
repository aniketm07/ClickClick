const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html", flowbite.content()],
  theme: {
    extend: {
      colors: {
        'darkPrimary': '#0b2545',
        'primaryColor':'#134074', 
        'secondaryColor': '#fca311', 
        'backgroundColor': '#FEFFFF', 
        'darkBackground':'#F5F5F5', 
        'whiteColor':'#FEFFFF'
      },
    },
  },
  plugins: [flowbite.plugin(),],
}

