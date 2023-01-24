module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("daisyui")],
  theme: {},
  daisyui: {
    themes: [
      {
        light: {
          primary: "#14186F",
          secondary: "#D7084E",
          accent: "#D3B037",
          neutral: "#FF6E00",
          "base-100": "#ffff",
          info: "#ffff",
          success: "#16a34a",
          warning: "#F8DA63",
          error: "#E23D32",
        },
      },
      {
        dark: {
          primary: "#14186F",
          secondary: "#D7084E",
          accent: "#D3B037",
          neutral: "#FF6E00",
          "base-100": "#192e5b",
          info: "#313131",
          success: "#16a34a",
          warning: "#F8DA63",
          error: "#E23D32",
        },
      },
    ],
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  },
};
