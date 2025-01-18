/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        main: ["Satoshi", "SatoshiItalic", "AppleColorEmoji"],
        code: ["MonaspaceNeon", "AppleColorEmoji"],
      },
      colors: {
        brand: "rgb(59, 134, 255)",
        "brand-dark": "rgb(25, 106, 189)",
        borders: "rgb(61, 68, 77)",
        primary: "rgb(16, 16, 16)",
        secondary: "rgb(24, 24, 24)",
        bobo: "rgb(45, 45, 45)",
        tertiary: "rgb(10, 10, 10)",
        "tender-surrender": "rgba(252,194,156,255)",
        leet: "rgb(101, 108, 118)",
        graaaay: "rgb(142, 142, 147)",
        "dark-graaaay": "rgb(99, 99, 102)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
