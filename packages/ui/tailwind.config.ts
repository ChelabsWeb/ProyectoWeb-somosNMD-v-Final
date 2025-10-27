import type { Config } from "tailwindcss";
import preset from "@nmd/config/tailwind-preset";

const config = {
  presets: [preset],
  content: ["./src/**/*.{ts,tsx}"],
} satisfies Config;

export default config;
