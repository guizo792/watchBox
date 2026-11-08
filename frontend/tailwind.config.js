/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand
        main: "rgb(236 53 84)",
        brand: {
          DEFAULT: "#ec3554",
          dark: "#c8213d",
          soft: "#fdecef",
        },
        // Neutrals used by the design system (see index.css for CSS variables)
        ink: "#111827",
        muted: "#6b7280",
        line: "#e5e7eb",
        surface: {
          DEFAULT: "#ffffff",
          sunken: "#f6f7f9",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(17,24,39,.06), 0 1px 3px rgba(17,24,39,.08)",
        "card-hover":
          "0 10px 24px -6px rgba(17,24,39,.18), 0 4px 8px -4px rgba(17,24,39,.1)",
      },
    },
  },
  plugins: [],
};
