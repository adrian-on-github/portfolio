/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#E8E8E8",
        },
        system_gray: {
          100: "#E5E5E5",
          200: "#D3D3D3",
        },
        base: "#30313",
      },
    },
  },
  plugins: [],
};
