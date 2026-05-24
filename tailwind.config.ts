import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
colors: {
  brand: {
    primary: "#111827",
    foreground: "#ffffff",
    muted: "#6b7280",
  },
  surface: {
    default: "#ffffff",
    muted: "#f9fafb",
    subtle: "#f3f4f6",
  },
  text: {
    primary: "#111827",
    secondary: "#374151",
    muted: "#6b7280",
    inverse: "#ffffff",
  },
  border: {
    DEFAULT: "#e5e7eb",
    default: "#e5e7eb",
    muted: "#f3f4f6",
  },
  input: {
    DEFAULT: "#e5e7eb",
  },
  ring: {
    DEFAULT: "#111827",
  },
  outline: {
    ring: "#111827",
  },
  background: "#ffffff",
  foreground: "#111827",
  primary: {
    DEFAULT: "#111827",
    foreground: "#ffffff",
  },
  secondary: {
    DEFAULT: "#f3f4f6",
    foreground: "#111827",
  },
  muted: {
    DEFAULT: "#f9fafb",
    foreground: "#6b7280",
  },
  accent: {
    DEFAULT: "#f3f4f6",
    foreground: "#111827",
  },
  destructive: {
    DEFAULT: "#dc2626",
    foreground: "#ffffff",
  },
  card: {
    DEFAULT: "#ffffff",
    foreground: "#111827",
  },
  popover: {
    DEFAULT: "#ffffff",
    foreground: "#111827",
  },
},
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04)",
        elevated:
          "0 18px 45px rgba(15, 23, 42, 0.12), 0 8px 20px rgba(15, 23, 42, 0.08)",
        overlay:
          "0 24px 80px rgba(15, 23, 42, 0.22), 0 12px 32px rgba(15, 23, 42, 0.14)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;