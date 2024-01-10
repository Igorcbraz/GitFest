/* eslint-disable */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f1e6f0",
          100: "#ddc1dc",
          200: "#c79ac5",
          300: "#b074ad",
          400: "#9f5a9c",
          500: "#8e458c",
          600: "#834085",
          700: "#73387c",
          800: "#653371",
          900: "#4b2a5d"
        },
        secondary: {
          50: "#f2e6e4",
          100: "#eac4b6",
          200: "#dd9f87",
          300: "#d37b57",
          400: "#ce6030",
          500: "#c84702",
          600: "#bf4200",
          700: "#b33c00",
          800: "#a53500",
          900: "#8e2800"
        }
      },
      fontFamily: {
        sans: ['Inter' ,'sans-serif'],
      },
      backgroundImage: {
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    }
  },
  plugins: [
  ]
}
