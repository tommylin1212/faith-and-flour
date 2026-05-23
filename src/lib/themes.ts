export type ThemeId = "pastel" | "blush" | "sage" | "lavender";

export type ThemeDefinition = {
  id: ThemeId;
  label: string;
  description: string;
  vars: Record<string, string>;
};

/**
 * Switch themes by changing `data-theme` on <html>.
 * Add or edit entries here — no component changes required.
 */
export const themes: Record<ThemeId, ThemeDefinition> = {
  pastel: {
    id: "pastel",
    label: "Sweet Pastel",
    description: "Soft pinks, creams, and butter yellow",
    vars: {
      "--color-bg": "#fff9f5",
      "--color-bg-alt": "#fff0eb",
      "--color-surface": "#ffffff",
      "--color-text": "#5c4a4a",
      "--color-text-muted": "#9a7f7f",
      "--color-primary": "#f4a4b8",
      "--color-primary-hover": "#e88aa3",
      "--color-secondary": "#c9e4de",
      "--color-accent": "#ffeaa7",
      "--color-border": "#f5ddd6",
      "--color-ring": "#f4a4b8",
      "--color-hero-from": "#ffeef5",
      "--color-hero-to": "#e8f6f3",
    },
  },
  blush: {
    id: "blush",
    label: "Blush Rose",
    description: "Warmer rose and peach tones",
    vars: {
      "--color-bg": "#fff5f3",
      "--color-bg-alt": "#ffe8e3",
      "--color-surface": "#ffffff",
      "--color-text": "#4a3f3f",
      "--color-text-muted": "#8f7575",
      "--color-primary": "#e88b9a",
      "--color-primary-hover": "#d67284",
      "--color-secondary": "#f9d5c3",
      "--color-accent": "#ffd4a8",
      "--color-border": "#f0cfc4",
      "--color-ring": "#e88b9a",
      "--color-hero-from": "#ffe8e8",
      "--color-hero-to": "#fff0e6",
    },
  },
  sage: {
    id: "sage",
    label: "Sage & Cream",
    description: "Calm greens with warm neutrals",
    vars: {
      "--color-bg": "#f7faf7",
      "--color-bg-alt": "#eef5ef",
      "--color-surface": "#ffffff",
      "--color-text": "#3d4a42",
      "--color-text-muted": "#6d7d72",
      "--color-primary": "#9cb8a0",
      "--color-primary-hover": "#85a389",
      "--color-secondary": "#e8ddd0",
      "--color-accent": "#f5e6c8",
      "--color-border": "#d8e5da",
      "--color-ring": "#9cb8a0",
      "--color-hero-from": "#eef5ef",
      "--color-hero-to": "#faf6f0",
    },
  },
  lavender: {
    id: "lavender",
    label: "Lavender Dream",
    description: "Soft purple with creamy highlights",
    vars: {
      "--color-bg": "#faf8ff",
      "--color-bg-alt": "#f3effa",
      "--color-surface": "#ffffff",
      "--color-text": "#4a4458",
      "--color-text-muted": "#857a96",
      "--color-primary": "#b8a9d4",
      "--color-primary-hover": "#a393c4",
      "--color-secondary": "#e8dff5",
      "--color-accent": "#ffe4c9",
      "--color-border": "#e5ddf0",
      "--color-ring": "#b8a9d4",
      "--color-hero-from": "#f3effa",
      "--color-hero-to": "#fff5f0",
    },
  },
};

export const defaultThemeId: ThemeId = "pastel";

export const themeIds = Object.keys(themes) as ThemeId[];
