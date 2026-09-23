/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#1e5975",
        backgroundLight: "#3d7a9a",
        text: "#eef2f6",
        text1: "#678fa2",
        background1: "#f5f8fb",
        text3: "#404a54",
      },
      fontFamily: {
        header: ["Manrope_700Bold"],
        headerMedium: ["Manrope_600SemiBold"],
        body: ["Inter_400Regular"],
        bodyMedium: ["Inter_500Medium"],
        button: ["Manrope_700Bold"],
      },
    },
  },
  plugins: [],
};