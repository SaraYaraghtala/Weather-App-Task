import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-background-image": "url('/bg.svg')",
      },

      colors: {
        "athens-gray": {
          "50": "#f6f6f8",
          "100": "#eaeaef",
          "200": "#dbdbe2",
          "300": "#c1c2cf",
          "400": "#a3a3b7",
          "500": "#8e8da4",
          "600": "#7f7c94",
          "700": "#736f86",
          "800": "#605d70",
          "900": "#4f4d5b",
          "950": "#343239",
        },
        iron: {
          "50": "#f7f7f7",
          "100": "#ececed",
          "200": "#d6d7da",
          "300": "#c5c7cb",
          "400": "#a9abb1",
          "500": "#94959d",
          "600": "#83848d",
          "700": "#76767f",
          "800": "#63636a",
          "900": "#515257",
          "950": "#343437",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
