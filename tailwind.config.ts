import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#dc2626',
          dark: '#b91c1c',
          light: '#ef4444',
        },
        orange: {
          DEFAULT: '#ff9900',
          600: '#f57c00',
          700: '#ef6c00',
        },
      },
      boxShadow: {
        '3d': '0 10px 30px rgba(220, 38, 38, 0.3), 0 1px 8px rgba(0, 0, 0, 0.2)',
        '3d-hover': '0 20px 40px rgba(220, 38, 38, 0.4), 0 5px 15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
export default config;
