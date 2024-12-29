/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        main: "'MonaSans'",
        code: "'MonaspaceNeon'",
      },
      colors: {
        brand: "rgb(115 100 255)",
        borders: "rgb(61, 68, 77)",
        "not-quite-dark-blue": "rgb(13, 17, 23)",
        "quite-lighter-dark-blue": "rgb(22, 27, 34)",
        "tender-surrender": "rgba(252,194,156,255)",
        leet: "rgb(101, 108, 118)",
      },
    },
  },
  plugins: [],
};
