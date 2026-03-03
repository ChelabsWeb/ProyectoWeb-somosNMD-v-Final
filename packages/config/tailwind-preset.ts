import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const palette = {
  background: "225 50% 8%", // #0A0F1E (Midnight Blue)
  foreground: "0 0% 100%", // #FFFFFF
  surface900: "225 40% 11%",
  surface800: "225 40% 15%",
  surface700: "225 40% 20%",
  muted: "225 20% 65%",
  primary: "20 100% 50%", // #FF4D00 (Tron Orange)
  secondary: "225 30% 25%",
  accent: "20 100% 50%", // #FF4D00 (Tron Orange)
  ring: "20 100% 50%", // #FF4D00
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
  content: [], // Preset doesn't need content, consuming projects will define it
} satisfies Config;

export default preset;

export type CinematicPalette = typeof palette;
