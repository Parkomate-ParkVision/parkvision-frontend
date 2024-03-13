/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors:{
        mistyrose: "#ffe2e5",
        papayawhip: "#fff4de",
        "colors-green-100": "#dcfce7",
        "colors-purple-100": "#f3e8ff",
      }
    },
  },
  plugins: [],
}

