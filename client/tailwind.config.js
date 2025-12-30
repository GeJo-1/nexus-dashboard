/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: "rgba(255, 255, 255, 0.1)",
        neon: "#00f3ff",
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}