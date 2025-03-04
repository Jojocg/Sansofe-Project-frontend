/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        forest: {
          ...require("daisyui/src/theming/themes")["forest"],
          "base-100": "#F5F5F5" //WhiteSmoke
        },
      },
    ],
  },
}

