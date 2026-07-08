import { ThemeView } from "@/components/ui/Theme";
import MovieProvider from "@/context/MovieProvider";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { top } = useSafeAreaInsets();

  return (
    <MovieProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ThemeView style={[styles.container, { paddingTop: top }]}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="movie/[slug]" />
          </Stack>
        </ThemeView>
      </ThemeProvider>
    </MovieProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
