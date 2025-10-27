import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const palette = {
  background: "233 47% 4%",
  foreground: "230 43% 97%",
  surface900: "236 28% 11%",
  surface800: "235 27% 8%",
  surface700: "237 20% 19%",
  muted: "230 25% 65%",
  primary: "337 83% 55%",
  secondary: "218 94% 55%",
  accent: "44 89% 63%",
  ring: "337 83% 60%",
};

const preset = {
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        border: `hsla(${palette.surface700} / 0.85)`,
        input: `hsla(${palette.surface700} / 0.85)`,
        ring: `hsl(${palette.ring})`,
        background: `hsl(${palette.background})`,
        foreground: `hsl(${palette.foreground})`,
        muted: {
          DEFAULT: `hsla(${palette.muted} / 0.35)`,
          foreground: `hsla(${palette.muted} / 0.85)`,
        },
        primary: {
          DEFAULT: `hsl(${palette.primary})`,
          foreground: `hsl(${palette.background})`,
        },
        secondary: {
          DEFAULT: `hsl(${palette.secondary})`,
          foreground: `hsl(${palette.foreground})`,
        },
        accent: {
          DEFAULT: `hsl(${palette.accent})`,
          foreground: `hsl(${palette.background})`,
        },
        card: {
          DEFAULT: `hsla(${palette.surface900} / 0.85)`,
          foreground: `hsl(${palette.foreground})`,
        },
        popover: {
          DEFAULT: `hsla(${palette.surface800} / 0.95)`,
          foreground: `hsl(${palette.foreground})`,
        },
      },
      borderRadius: {
        lg: "1.5rem",
        md: "calc(1.5rem - 0.25rem)",
        sm: "calc(1.5rem - 0.5rem)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
        display: ["var(--font-geist-sans)", "Space Grotesk", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 25px rgba(235, 44, 117, 0.45)",
        "panel-glow": "0 30px 120px rgba(5, 6, 14, 0.6)",
      },
      backgroundImage: {
        "radial-cinematic":
          "radial-gradient(circle at top, rgba(30, 109, 248, 0.22), transparent 50%), radial-gradient(circle at 20% 60%, rgba(235,44,117,0.28), transparent 60%)",
      },
    },
  },
  plugins: [animate],
} satisfies Config;

export default preset;

export type CinematicPalette = typeof palette;
