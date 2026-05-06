"use client";
import { useCallback, useEffect, useState } from "react";

export type Theme = "system" | "light" | "dark";
export const THEME_STORAGE_KEY = "twc:theme:v1";
const SYNC_EVENT = "twc:theme-change";

function readInitial(): Theme {
  if (typeof document === "undefined") return "system";
  // Inline init script sets data-theme-mode="system" when stored value is "system" or missing.
  // Otherwise, fall back to localStorage value.
  const mode = document.documentElement.getAttribute("data-theme-mode");
  if (mode === "system") return "system";
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    /* ignore */
  }
  return "system";
}

function applyTheme(t: Theme) {
  const root = document.documentElement;
  const dark =
    t === "dark" ||
    (t === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.setAttribute("data-theme", dark ? "dark" : "light");
  if (t === "system") root.setAttribute("data-theme-mode", "system");
  else root.removeAttribute("data-theme-mode");
  const color = dark ? "#10131c" : "#FFF8E7";
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((el) => el.setAttribute("content", color));
}

export function useTheme() {
  // Defer reading until after mount so server + first client paint match (then hydrate to correct value via effect).
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    setThemeState(readInitial());
    const onSync = (e: Event) => {
      const custom = e as CustomEvent<Theme>;
      if (custom.detail) setThemeState(custom.detail);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY && e.newValue) {
        setThemeState(e.newValue as Theme);
        applyTheme(e.newValue as Theme);
      }
    };
    window.addEventListener(SYNC_EVENT, onSync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(SYNC_EVENT, onSync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const setTheme = useCallback((t: Theme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
    applyTheme(t);
    setThemeState(t);
    window.dispatchEvent(new CustomEvent<Theme>(SYNC_EVENT, { detail: t }));
  }, []);

  return [theme, setTheme] as const;
}
