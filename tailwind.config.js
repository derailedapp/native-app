/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        fontFamily: {
            main: "'MonaSans'",
            code: "'MonaspaceNeon'"
        },
        colors: {
            brand: "rgb(115 100 255)",
            borders: "rgb(118, 171, 174)",
            "not-quite-dark-blue": "rgb(13, 17, 23)",
            "quite-lighter-dark-blue": "rgb(21, 27, 35)"
        },
      },
    },
    plugins: [],
}