"use client";

import { themes, themeIds } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

export function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const { themeId, setThemeId } = useTheme();

  return (
    <div className={compact ? "" : "rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm"}>
      {!compact && (
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
          Color theme
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {themeIds.map((id) => {
          const theme = themes[id];
          const active = themeId === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setThemeId(id)}
              title={theme.description}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                active
                  ? "bg-[var(--color-primary)] text-white shadow-md"
                  : "bg-[var(--color-bg-alt)] text-[var(--color-text)] hover:bg-[var(--color-secondary)]"
              }`}
            >
              {theme.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
