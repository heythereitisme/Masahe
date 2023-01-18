/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // screens: {
    //   sm: "480px",
    //   md: "768px",
    //   lg: "976px",
    //   xl: "1440px",
    // },
    // // colors: {
    // //   blue: "#hsl(237, 69%, 26%)",
    // //   pink: "#hsl(340, 93%, 44%)",
    // //   orange: "hsl(26, 100%, 50%)",
    // //   yellow: "hsl(47, 64%, 52%)",
    // //   gray: "hsl(0, 0%, 19%)",
    // //   white: "hsl(0, 0%, 100%)",
    // //   black: "hsl(0, 0%, 0%)",
    // },
    // fontFamily: {
    //   sans: ["Century Gothic", "Montserrat", "Roboto"],
    // },
    // extend: {
    //   spacing: {
    //     128: "32rem",
    //     144: "36rem",
    //   },
    //   borderRadius: {
    //     "4xl": "2rem",
    //   },
    // },
    plugins: [require("daisyui")],
  },
};
