"use client";

import { useState, useEffect } from "react";

const ThemeToggle: React.FC = () => {
  // Type theme explicitly
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="mt-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;

// next: 
// I can also show a version that saves the theme in localStorage 
// while keeping it fully typed—this is very common in real projects