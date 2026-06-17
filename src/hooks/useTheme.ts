import { useState, useEffect } from "react";

type Theme = "dark" | "light";

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

export function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("study-tracker-theme") as Theme | null;
    return saved || "dark";
  });

  const isDark = theme === "dark";

  useEffect(() => {
    localStorage.setItem("study-tracker-theme", theme);
    if (theme === "light") {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme, isDark };
}
