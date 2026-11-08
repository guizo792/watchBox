/** @type {import('tailwindcss').Config} */

// Colors read CSS variables (see src/index.css) so every utility such as
// `bg-surface` or `text-ink` flips automatically between light and dark.
const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand (same in both themes)
        main: "rgb(236 53 84)",
        brand: {
          DEFAULT: token("brand"),
          dark: token("brand-dark"),
          soft: token("brand-soft"),
        },
        // Theme-aware neutrals
        ink: token("ink"),
        muted: token("muted"),
        line: token("line"),
        surface: {
          DEFAULT: token("surface"),
          sunken: token("sunken"),
          raised: token("raised"),
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
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
      },
    },
  },
  plugins: [],
};
