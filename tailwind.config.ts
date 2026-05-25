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
    primary: "rgb(var(--brand-primary) / <alpha-value>)",
    secondary: "rgb(var(--brand-secondary) / <alpha-value>)",
    accent: "rgb(var(--brand-accent) / <alpha-value>)",
    foreground: "rgb(var(--brand-foreground) / <alpha-value>)",
    muted: "rgb(var(--brand-muted) / <alpha-value>)",
  },
  surface: {
    default: "rgb(var(--surface-default) / <alpha-value>)",
    muted: "rgb(var(--surface-muted) / <alpha-value>)",
    subtle: "rgb(var(--surface-subtle) / <alpha-value>)",
    elevated: "rgb(var(--surface-elevated) / <alpha-value>)",
  },
  text: {
    primary: "rgb(var(--text-primary) / <alpha-value>)",
    secondary: "rgb(var(--text-secondary) / <alpha-value>)",
    muted: "rgb(var(--text-muted) / <alpha-value>)",
    inverse: "rgb(var(--text-inverse) / <alpha-value>)",
  },
  border: {
    DEFAULT: "rgb(var(--border-default) / <alpha-value>)",
    default: "rgb(var(--border-default) / <alpha-value>)",
    muted: "rgb(var(--border-muted) / <alpha-value>)",
  },
  input: {
    DEFAULT: "rgb(var(--border-default) / <alpha-value>)",
  },
  ring: {
    DEFAULT: "rgb(var(--brand-primary) / <alpha-value>)",
  },
  outline: {
    ring: "rgb(var(--brand-primary) / <alpha-value>)",
  },
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  secondary: {
    DEFAULT: "hsl(var(--secondary))",
    foreground: "hsl(var(--secondary-foreground))",
  },
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
  },
  accent: {
    DEFAULT: "hsl(var(--accent))",
    foreground: "hsl(var(--accent-foreground))",
  },
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))",
  },
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))",
  },
  popover: {
    DEFAULT: "hsl(var(--popover))",
    foreground: "hsl(var(--popover-foreground))",
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
  sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
  heading: [
    "var(--font-heading)",
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "sans-serif",
  ],
},
    },
  },
  plugins: [],
};

export default config;