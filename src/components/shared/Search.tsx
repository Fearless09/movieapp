import { ThemeText, ThemeView } from "@/components/ui/Theme";
import { useTheme } from "@/hooks/useTheme";
import { Movie } from "@/lib/type";
import { textStyles } from "@/styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router } from "expo-router";
import React from "react";
import {
  Image,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

type SearchBarProps = TextInputProps & {};
export const SearchBar = ({ style, ...props }: SearchBarProps) => {
  const theme = useTheme();

  return (
    <ThemeView
      style={{
        marginTop: 10,
        position: "relative",
        flexDirection: "row",
        borderRadius: 999,
        overflow: "hidden",
        paddingRight: 20,
        gap: 4,
        alignItems: "center",
      }}
      themeColor="secondaryBackground"
    >
      <TextInput
        inputMode="search"
        placeholder="Search"
        placeholderTextColor={theme.secondaryText}
        style={[
          textStyles.input,
          {
            flex: 1,
            height: 42,
            paddingLeft: 20,
            color: theme.text,
          },
          style,
        ]}
        returnKeyType="search"
        onSubmitEditing={(e) => {
          const text = e.nativeEvent.text;
          if (!text.trim()) return;
          router.push(`/search/${text}`);
        }}
        {...props}
      />

      <Link
        disabled={!(props.value || "").trim()}
        href={`/search/${props.value || ""}`}
      >
        <Ionicons name="search" size={20} color={theme.secondaryText} />
      </Link>
    </ThemeView>
  );
};

type SearchResultProps = {
  movies: Movie[];
};
export const SearchResult = ({ movies }: SearchResultProps) => {
  const theme = useTheme();

  if (!movies.length) return;

  return (
    <ThemeView
      scrollable
      themeColor="secondaryBackground"
      style={{
        padding: 10,
        borderRadius: 16,
        position: "absolute",
        width: "100%",
        left: 0,
        top: "100%",
        marginTop: 5,
        maxHeight: 200,
        zIndex: 10,
      }}
    >
      {movies.map((movie, idx) => (
        <React.Fragment key={movie.movie_id}>
          {idx > 0 && (
            <View
              style={{
                height: 1,
                width: "97%",
                alignSelf: "center",
                backgroundColor: theme.background,
                marginTop: idx === 0 ? 0 : 6,
              }}
            />
          )}

          <TouchableOpacity
            onPress={() => router.push(`/movie/${movie.movie_id}`)}
            style={{
              flexDirection: "row",
              gap: 12,
              alignItems: "center",
              marginTop: idx === 0 ? 0 : 6,
            }}
          >
            <ThemeView
              themeColor="secondaryBackground"
              style={{
                width: 44,
                aspectRatio: 1,
                overflow: "hidden",
                borderRadius: 8,
                flexShrink: 0,
              }}
            >
              <Image
                source={{ uri: movie.backdrop_path }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="center"
              />
            </ThemeView>

            <View style={{ flex: 1, gap: 4 }}>
              <ThemeText numberOfLines={1} type="h2">
                {movie.original_title}
              </ThemeText>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Ionicons name="star" size={10} color={theme.primary} />
                <ThemeText themeColor="secondaryText">
                  {movie.vote_average.toFixed(1)}
                </ThemeText>
              </View>
            </View>

            <ThemeView
              themeColor="background"
              style={{ borderRadius: 10, paddingBlock: 2.5, paddingInline: 7 }}
            >
              <ThemeText themeColor="secondaryText">
                {movie.release_date.slice(-4)}
              </ThemeText>
            </ThemeView>
          </TouchableOpacity>
        </React.Fragment>
      ))}
    </ThemeView>
  );
};
