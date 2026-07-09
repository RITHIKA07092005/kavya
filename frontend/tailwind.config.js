/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0a0a12",
        surface: "#12121e",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #06b6d4 100%)",
      },
    },
  },
  plugins: [],
};
