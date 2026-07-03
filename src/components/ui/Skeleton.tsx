import { useTheme } from "@/hooks/useTheme";
import { ThemeColor } from "@/styles/styles";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, ViewProps } from "react-native";

type SkeletenViewProps = ViewProps & {
  themeColor?: ThemeColor;
  type?: "card" | "h1";
};
const Skeleton = ({
  style,
  themeColor = "secondaryBackground",
  type = "card",
  ...props
}: SkeletenViewProps) => {
  const theme = useTheme();
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.8],
  });

  return (
    <Animated.View
      style={[
        { backgroundColor: theme[themeColor], opacity },
        skeletonStyle[type],
        style,
      ]}
      {...props}
    />
  );
};

export default Skeleton;

const skeletonStyle = StyleSheet.create({
  card: {
    borderRadius: 16,
    flexShrink: 0,
  },
  h1: {},
});
