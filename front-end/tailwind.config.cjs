/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",

      extend: {},
    },
    colors: {
      primary: " hsl(237, 69%, 26%)",
      secondary: "hsl(340, 93%, 44%)",
      accent: "hsl(47, 64%, 52%)",
      base: " hsl(26, 100%, 50%)",
    },
  },
  plugins: [require("daisyui")],
};
