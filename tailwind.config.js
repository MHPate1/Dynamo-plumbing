/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        yellow: {
          DEFAULT: "#F5C135",
          100: "#fef9e7",
          200: "#fde68a",
        },
        dark:     "#1a1a1a",
        charcoal: "#2d2d2d",
        offwhite: "#f5f5f5",
        muted:    "#6b7280",
        green: {
          DEFAULT: "#25D366",
          500: "#22c55e",
        },
      },
      fontFamily: {
        heading: ["'Barlow Condensed'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [],
}
