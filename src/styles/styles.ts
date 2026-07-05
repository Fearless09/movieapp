import "@/global.css";
import { Platform, StyleSheet } from "react-native";

export const Colors = {
  dark: {
    background: "#242A32",
    secondaryBackground: "#3A3F47",
    text: "#FFFFFF",
    secondaryText: "#92929D",
    muted: "#67686D",
    primary: "#0296E5",
    accent: "#FF8700",
  },
  light: {
    background: "#F4F6F9",
    secondaryBackground: "#e1e7ee",
    text: "#1A1E24",
    secondaryText: "#6B6C74",
    muted: "#9E9FA4",
    primary: "#0296E5",
    accent: "#FF8700",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 20,
  },
} as const);

export const textStyles = StyleSheet.create({
  h1: {
    fontWeight: "600",
    fontSize: 18,
    fontFamily: Fonts.serif,
  },
  h2: {
    fontWeight: "500",
    fontSize: 14,
    fontFamily: Fonts.rounded,
  },
  p: {
    fontWeight: "400",
    fontSize: 12,
    fontFamily: Fonts.sans,
  },
  input: {
    fontWeight: "400",
    fontSize: 14,
    fontFamily: Fonts.mono,
  },
  tag: {
    fontWeight: "500",
    fontSize: 12,
    fontFamily: Fonts.mono,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    fontFamily: Fonts.rounded,
  },
});
