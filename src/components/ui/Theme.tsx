import { useTheme } from "@/hooks/useTheme";
import { textStyles, ThemeColor } from "@/styles/styles";
import {
  ScrollView,
  ScrollViewProps,
  Text,
  TextProps,
  View,
} from "react-native";

export type ThemeTextProps = TextProps & {
  themeColor?: ThemeColor;
  type?: "p" | "h1" | "h2" | "tag" | "title" | "input";
};

export const ThemeText = ({
  themeColor = "text",
  type = "p",
  style,
  ...props
}: ThemeTextProps) => {
  const theme = useTheme();

  return (
    <Text
      style={[{ color: theme[themeColor] }, textStyles[type], style]}
      {...props}
    />
  );
};

export type ThemeViewProps = ScrollViewProps & {
  themeColor?: ThemeColor;
  scrollable?: boolean;
};

export const ThemeView = ({
  themeColor = "background",
  scrollable = false,
  style,
  ...props
}: ThemeViewProps) => {
  const theme = useTheme();

  if (scrollable) {
    return (
      <ScrollView
        style={[{ backgroundColor: theme[themeColor] }, style]}
        {...props}
      />
    );
  }

  return (
    <View style={[{ backgroundColor: theme[themeColor] }, style]} {...props} />
  );
};
