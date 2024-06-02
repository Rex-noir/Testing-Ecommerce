import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        "main-layout": " auto auto 50px",
      },
    },
    keyframes: {
      rotate: {
        "0%": { transform: "translateX(50%)" },
        "100%": { transform: "translateX(-100%)" },
      },
      spinner: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
    animation: {
      rotate: "rotate 10s linear infinite",
      spinner: "spinner 900ms linear infinite",
      none: "none",
    },
  },
  plugins: [],
};
