 /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        navbar: "rgb(45 47 113)",
        yellowFont: "rgb(255 255 0)",
        openingCheck: "#E9FFE9",
        closingCheck: "#E8E8E8",
        clickFill: "#FDD8DB",
        green: "#00FF04",
        grey: "#F2F2F2",
        greenSwitch : "#13ae77",
        pdfGray : "#E9EDF6",
        pdfGreen : "#81B532"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}