"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  defaultThemeId,
  themeIds,
  themes,
  type ThemeId,
} from "@/lib/themes";

const STORAGE_KEY = "ffc-theme";

type ThemeContextValue = {
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(themeId: ThemeId) {
  const theme = themes[themeId];
  const root = document.documentElement;
  root.setAttribute("data-theme", themeId);
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value);
  }
}

function readStoredTheme(): ThemeId {
  if (typeof window === "undefined") return defaultThemeId;
  const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
  return stored && themeIds.includes(stored) ? stored : defaultThemeId;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>(defaultThemeId);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = readStoredTheme();
    applyTheme(initial);
    queueMicrotask(() => {
      setThemeIdState(initial);
      setMounted(true);
    });
  }, []);

  const setThemeId = useCallback((id: ThemeId) => {
    setThemeIdState(id);
    localStorage.setItem(STORAGE_KEY, id);
    applyTheme(id);
  }, []);

  const value = useMemo(
    () => ({ themeId: mounted ? themeId : defaultThemeId, setThemeId }),
    [themeId, setThemeId, mounted],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
