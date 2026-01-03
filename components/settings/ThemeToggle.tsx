"use client";

import { useThemeContext } from "@/context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className="
        w-full flex justify-center items-center
        p-2 rounded-lg bg-(--secondary) text-(--foreground)
        hover:brightness-110 hover:scale-105 transition-all duration-200
      "
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;
