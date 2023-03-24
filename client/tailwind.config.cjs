/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        outline: "0 0 0 2px rgba(66,153,225,0.5)",
      },
      colors: {
        primary: "#357CED",
        secondary: "#FFD425",
      },
      fontSize: {
        xl: "1.25rem",
      },
      backgroundColor: ['important'],
      textColor: ['important'],
      borderColor: ['important'],
      borderWidth: ['important'],
      boxShadow: ['important'],
    },
  },
  variants: {},
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-apply'),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'apply-rule': true
      }
    })
  ],
};
