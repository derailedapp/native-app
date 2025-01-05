/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        main: ["MonaSans", "AppleColorEmoji"],
        code: ["MonaspaceNeon", "AppleColorEmoji"],
      },
      colors: {
        brand: "rgb(59, 134, 255)",
        "brand-dark": "rgb(25, 106, 189)",
        borders: "rgb(61, 68, 77)",
        "not-quite-dark-blue": "rgb(13, 17, 23)",
        "quite-lighter-dark-blue": "rgb(22, 27, 34)",
        "quite-lightier-lighter-dark-blue": "rgb(41, 46, 53)",
        "tender-surrender": "rgba(252,194,156,255)",
        leet: "rgb(101, 108, 118)",
      },
    },
  },
  plugins: [],
};
