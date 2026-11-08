import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const STORAGE_KEY = "theme";

const readTheme = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch (e) {
    // storage unavailable (private mode etc.) - fall through to system
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Toggles the `dark` class on <html>. The initial class is applied by an
// inline script in public/index.html so there is no flash on load.
const ThemeToggle = ({ className = "" }) => {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={className}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      title={theme === "dark" ? "Light theme" : "Dark theme"}
    >
      {theme === "dark" ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
    </button>
  );
};

export default ThemeToggle;
