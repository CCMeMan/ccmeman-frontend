module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
          // Color Picker: https://imagecolorpicker.com/color-code/36d7b7
          // https://tailwindcss.com/docs/customizing-colors
          // "indigo": {
          //   500: "#36d7b7",
          //   600: "#2bac92",
          //   700: "#20816e",
          // },
        },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
