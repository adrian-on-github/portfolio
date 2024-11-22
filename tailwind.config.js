/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#E8E8E8",
        },
        base: "#30313",
      },
    },
  },
  plugins: [],
};
