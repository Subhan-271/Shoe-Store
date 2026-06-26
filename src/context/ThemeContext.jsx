import { createContext, useContext, useState, useEffect } from "react";

const DARK = {
  bg: "#0d1117", bg2: "#161b22", card: "#1c2128",
  text: "#e6edf3", textMuted: "#8b949e", border: "#30363d",
  subtle: "#21262d", inputBg: "#161b22",
};
const LIGHT = {
  bg: "#ffffff", bg2: "#f9fafb", card: "#ffffff",
  text: "#111111", textMuted: "#6b7280", border: "#e5e7eb",
  subtle: "#f3f4f6", inputBg: "#ffffff",
};

const ThemeCtx = createContext({ isDark: false, toggle: () => {}, ...LIGHT });
export const useTheme = () => useContext(ThemeCtx);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem("sole-theme") === "dark"; }
    catch { return false; }
  });

  useEffect(() => {
    const tokens = isDark ? DARK : LIGHT;
    const root = document.documentElement;
    Object.entries(tokens).forEach(([k, v]) => root.style.setProperty(`--${k}`, v));
    root.setAttribute("data-theme", isDark ? "dark" : "light");
    try { localStorage.setItem("sole-theme", isDark ? "dark" : "light"); } catch {}
  }, [isDark]);

  return (
    <ThemeCtx.Provider value={{ isDark, toggle: () => setIsDark(d => !d), ...(isDark ? DARK : LIGHT) }}>
      {children}
    </ThemeCtx.Provider>
  );
}
