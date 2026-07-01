"use client";

import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window === "undefined") return "light";
    try {
      const stored = localStorage.getItem("founderai_theme");
      if (stored === "dark" || stored === "light") return stored;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  const toggle = () => {
    try {
      const next = theme === "dark" ? "light" : "dark";
      localStorage.setItem("founderai_theme", next);
      const root = document.querySelector('[data-theme]') || document.documentElement;
      root.setAttribute("data-theme", next);
      setTheme(next);
    } catch { /* ignore */ }
  };

  return (
    <button onClick={toggle} className={className} aria-label="Toggle theme">
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
