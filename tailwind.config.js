// tailwind.config.js
module.exports = {
  future: {},
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EB5757",
        secondary: "#E6F1FA",
        myGray: "#3F3F3F",
        myDarkGray: "#828282",
        myLightGray: "#BDBDBD",
        optionGray: "#808080",
        optionBlue: "#0000FF",
        optionGreen: "#008000",
        optionBlack: "#000000",
        optionPink: "#FFC0CB",
        optionYellow: "#FFFF00",
        optionLightGray: "#D3D3D3",
        optionKhaki: "#F0E68C",
        optionRed: "#FF0000",
        optionPumpkinSpice: "#FF7F50",
        optionEvergreen: "#228B22",
      },
      screens: {
        mob: "200px",
      },
    },
  },
  variants: {},
  plugins: [],
};
