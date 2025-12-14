import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.15)",
        softLight: "0 8px 30px rgba(255,255,255,0.3)",
      },
      borderRadius: {
        card: "22px",
      },
    },
  },
  plugins: [],
};

export default config;
