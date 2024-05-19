"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ThemeProvider {
  theme: string;
  setTheme: (theme: string) => void;
}
const ThemeContext = createContext<ThemeProvider | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("");

  const handleThemeChange = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    handleThemeChange();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
