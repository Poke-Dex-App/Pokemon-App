import { useEffect, useState } from "react";
import "./ThemeToggle.css";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Detectar tema inicial
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved) {
      setIsDark(saved === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
    }
  }, []);

  // 🔥 TU FUNCIONALIDAD ORIGINAL
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="toggle">
      <input
        className="toggle-input"
        type="checkbox"
        checked={isDark}
        onChange={(e) => setIsDark(e.target.checked)}
      />
      <div className="toggle-bg"></div>
      <div className="toggle-switch">
        <div className="toggle-switch-figure"></div>
        <div className="toggle-switch-figureAlt"></div>
      </div>
    </div>
  );
}

export default ThemeToggle;