import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-1": "#7082AC",
        "theme-2": "#7C8DB1",
        "theme-3": "#92A6CC",
        "theme-gray-1": "#EAECEB",
      },
      boxShadow: {
        "theme-shadow-1": "0 0 10px 2px rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        scrollHorizontally: "scrollHorizontally 30s infinite linear",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/container-queries"),
  ],
};
export default config;
