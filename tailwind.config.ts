import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "rich-black": "#0d1821",
        "flash-white": "#eff1f3",
        "hooker-green": "#4e6e5d",
        "lion-brown": "#ad8a64",
        "chestnut-red": "#a44a3f",
      },
    },
  },
  plugins: [],
};
export default config;
