"use client";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion } from "motion/react";
import { useTheme, type Theme } from "@/hooks/use-theme";

const OPTIONS: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: "light", label: "Light", icon: <Sun size={14} strokeWidth={2.5} /> },
  { value: "system", label: "Auto", icon: <Monitor size={14} strokeWidth={2.5} /> },
  { value: "dark", label: "Dark", icon: <Moon size={14} strokeWidth={2.5} /> },
];

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useTheme();

  if (compact) {
    const next: Theme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    const icon =
      theme === "light" ? <Sun size={16} /> : theme === "dark" ? <Moon size={16} /> : <Monitor size={16} />;
    return (
      <button
        type="button"
        onClick={() => setTheme(next)}
        aria-label={`Theme: ${theme}. Click for ${next}`}
        className="btn"
        style={{ minHeight: 40, padding: "0.5rem 0.75rem" }}
      >
        {icon}
      </button>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-center gap-0.5 p-1 border-2 border-ink rounded-[12px]"
      style={{ background: "var(--card)", boxShadow: "2px 2px 0 var(--shadow-ink)" }}
    >
      {OPTIONS.map((opt) => {
        const active = opt.value === theme;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={opt.label}
            title={opt.label}
            onClick={() => setTheme(opt.value)}
            className="relative inline-flex items-center gap-1 justify-center px-2.5 py-1.5 rounded-[8px] text-xs font-bold transition-colors"
            style={{
              color: active ? "var(--paper)" : "var(--ink)",
              opacity: active ? 1 : 0.75,
              isolation: "isolate",
            }}
          >
            {active && (
              <motion.span
                layoutId="theme-pill"
                className="absolute inset-0 rounded-[8px]"
                style={{ background: "var(--ink)", zIndex: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {opt.icon}
            {active && <span className="hidden md:inline">{opt.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
