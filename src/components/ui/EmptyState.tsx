import { useTheme } from "@/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentProps } from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemeText, ThemeView } from "./Theme";

type EmptyStateProps = {
  title: string;
  subtitle: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  btnText: string;
  btnAction: () => void;
  btnIcon?: ComponentProps<typeof Ionicons>["name"];
};

const EmptyState = ({
  btnAction,
  btnText,
  icon,
  subtitle,
  title,
  btnIcon,
}: EmptyStateProps) => {
  const theme = useTheme();

  return (
    <ThemeView
      themeColor="secondaryBackground"
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingBlock: 32,
        paddingInline: 20,
        gap: 8,
        borderRadius: 20,
      }}
    >
      <View
        style={{
          width: 72,
          aspectRatio: 1,
          borderRadius: 999,
          backgroundColor: "rgba(2, 150, 229, 0.1)",
          borderWidth: 0.5,
          borderColor: "rgba(2, 150, 229, 0.25)",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
        }}
      >
        <Ionicons name={icon} size={32} color={theme.primary} />
      </View>

      <ThemeText type="title" style={{ textAlign: "center" }}>
        {title}
      </ThemeText>
      <ThemeText
        themeColor="secondaryText"
        style={{ textAlign: "center", marginBottom: 12 }}
      >
        {subtitle}
      </ThemeText>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          backgroundColor: theme.primary,
          paddingHorizontal: 28,
          paddingVertical: 12,
          borderRadius: 12,
        }}
        onPress={btnAction}
      >
        {!!btnIcon && <Ionicons name={btnIcon} size={18} color={theme.text} />}
        <ThemeText type="h2">{btnText}</ThemeText>
      </TouchableOpacity>
    </ThemeView>
  );
};

export default EmptyState;
