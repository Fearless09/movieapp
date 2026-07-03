import { Colors } from "@/styles/styles";
import { useColorScheme } from "react-native";

export const useTheme = () => {
  const scheme = useColorScheme();
  const theme = scheme === "unspecified" ? "light" : scheme;

  return Colors[theme];
};
