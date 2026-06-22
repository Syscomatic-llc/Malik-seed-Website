/**
 * Theme — re-exports from design-tokens for backward compatibility.
 *
 * New code should import from `@/lib/design-tokens` directly.
 * This file is kept so existing imports continue to work.
 */
export { colors, typography, spacing, borderRadius, components, images, designTokens as default } from "./design-tokens";

/**
 * @deprecated Use `import { colors, typography } from "@/lib/design-tokens"` instead.
 */
export const theme = {
  colors: {
    brandPrimary: "#1b4d32",
    brandPrimaryHover: "#153b26",
    brandSecondary: "#96d76e",
    brandSecondaryHover: "#83c35b",
    brandTextDark: "#0d2a17",
    brandAccent: "#75bc43",
    brandActive: "#195236",
    brandActiveDark: "#429c5b",
    brandHoverDark: "#0d1a14",
    brandLightGreen: "#a9e179",
    brandBg: "#f2f7f1",
    brandDark: "#0d1a14",
    brandBorder: "#e4e7ec",
    brandBorderLight: "#f2f4f7",
    brandNeutralLight: "#f9fafb",
    brandPartnersBorder: "#ced2da",
    brandHeroDark: "#050d07",
  },
  typography: {
    fonts: {
      sans: "var(--font-inter-tight)",
      mono: "var(--font-geist-mono)",
      heading: "var(--font-inter-tight)",
      body: "var(--font-inter)",
      accent: "var(--font-anton)",
    },
    sizes: {
      display: {
        mobile: "2.75rem" /* 44px */,
        tablet: "3.375rem" /* 54px */,
        desktop: "4rem" /* 64px */,
      },
      h2: {
        mobile: "1.75rem" /* 28px */,
        tablet: "2.5rem" /* 40px */,
        desktop: "3rem" /* 48px */,
      },
      h3: {
        mobile: "1.25rem" /* 20px */,
        tablet: "1.5rem" /* 24px */,
      },
      bodyIntro: {
        mobile: "1.375rem" /* 22px */,
        tablet: "1.75rem" /* 28px */,
        desktop: "2rem" /* 32px */,
      },
    },
  },
} as const;
