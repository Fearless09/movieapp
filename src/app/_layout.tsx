import { ThemeView } from "@/components/ui/Theme";
import MovieProvider from "@/context/MovieProvider";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <MovieProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ThemeView
          style={{
            height: 50,
            width: "100%",
            top: 0,
            left: 0,
          }}
        />
        <ThemeView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="movie/[slug]" />
          </Stack>
        </ThemeView>
      </ThemeProvider>
    </MovieProvider>
  );
}
