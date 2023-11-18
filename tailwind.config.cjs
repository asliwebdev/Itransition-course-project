/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        br: "rgb(244 246 248)",
        cardBg: "rgba(12, 20, 28, 0.75)",
        tableDarkBr: "hsl(240 3.7% 15.9%)",
        tableLightBr: "hsl(240 5.9% 90%)",
        tableLightHover: "hsl(240 4.8% 95.9%)",
        tableDarkHover: "hsl(240 3.7% 15.9%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        myDark: {
          primary: "#FF7000",
          secondary: "rgb(15, 17, 23)",
          neutral: "#151821", // 300
          "neutral-content": "#94a3b8",
          "base-100": "#000000",
          "base-200": "",
          "base-300": "#212734",
          "base-content": "#ffffff",
        },
      },
      {
        myLight: {
          primary: "#FF7000",
          secondary: "rgb(255, 255, 255)",
          neutral: "#DCE3F1", // 700
          "neutral-content": "#64748b", // 400
          "base-100": "#ffffff", // 900
          "base-200": "#FDFDFD", // 850
          "base-300": "#F4F6F8", //800
          "base-content": "#000000",
        },
      },
    ],
  },
};
