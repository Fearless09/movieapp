import { ThemeText, ThemeView } from "@/components/ui/Theme";
import { useMovie } from "@/context/MovieProvider";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RoutePath, router, useLocalSearchParams } from "expo-router";
import { ComponentProps, useMemo, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const MovieBySlug = () => {
  const theme = useTheme();
  const { slug } = useLocalSearchParams<RoutePath>();
  const { movies, bookMarkedMovies, movieDispatch } = useMovie();

  const [tab, setTab] = useState<Tab["id"]>("about");

  const movie = useMemo(() => {
    return movies.find((m) => m.movie_id.toString() === slug);
  }, [movies, slug]);

  const isBookmarked = useMemo(() => {
    if (!movie) return false;
    return bookMarkedMovies.some((m) => m.movie_id === movie.movie_id);
  }, [bookMarkedMovies, movie]);

  if (!movie) {
    return (
      <ThemeView style={globalStyles.container}>
        <ThemeText type="h1">Movie not found</ThemeText>
      </ThemeView>
    );
  }

  return (
    <ThemeView style={{ flex: 1 }}>
      <FlatList
        data={tab === "cast" ? movie.casts : []}
        keyExtractor={(cast) => cast.id}
        ListHeaderComponent={
          <ThemeView
            style={[
              globalStyles.container,
              { paddingInline: 0, marginBottom: 20 },
            ]}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                justifyContent: "space-between",
                paddingInline: 20,
              }}
            >
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={20} color={theme.text} />
              </TouchableOpacity>

              <ThemeText type="h1">Detail</ThemeText>

              <TouchableOpacity
                onPress={() =>
                  movieDispatch({
                    type: "toggleBookmark",
                    payload: { movieId: movie.movie_id },
                  })
                }
              >
                <Ionicons
                  name={isBookmarked ? "bookmark" : "bookmark-outline"}
                  size={20}
                  color={theme.text}
                />
              </TouchableOpacity>
            </View>

            {/* Banner */}
            <View
              style={{
                marginTop: 28,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                aspectRatio: 16 / 9,
                backgroundColor: theme.secondaryBackground,
                width: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: movie.backdrop_path }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              <ThemeView
                themeColor="background"
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: 10,
                  borderRadius: 8,
                  paddingInline: 8,
                  paddingBlock: 4,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Ionicons name="star" size={16} color={theme.accent} />
                <Text
                  style={{
                    color: theme.accent,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {movie.vote_average.toFixed(1)}
                </Text>
              </ThemeView>
            </View>

            {/* Title and Poster */}
            <View
              style={{
                marginTop: 12,
                flexDirection: "row",
                paddingInline: 20,
                gap: 12,
              }}
            >
              <View style={{ position: "relative", width: 95 }}>
                <Image
                  source={{ uri: movie.poster_path }}
                  style={{
                    width: "100%",
                    position: "absolute",
                    bottom: -10,
                    left: 0,
                    borderRadius: 16,
                    height: 140,
                    objectFit: "cover",
                    backgroundColor: theme.secondaryBackground,
                  }}
                />
              </View>

              <ThemeText type="h1" themeColor="text">
                {movie.original_title}
              </ThemeText>
            </View>

            {/* Tags */}
            <View
              style={{
                marginTop: 24,
                paddingInline: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <TagComponent
                title={movie.release_date.slice(-4)}
                icon="calendar-outline"
              />
              <View
                style={{
                  width: 2,
                  height: 16,
                  backgroundColor: theme.secondaryBackground,
                  borderRadius: 999,
                }}
              />
              <TagComponent
                title={movie.original_language.toUpperCase()}
                icon="language"
              />
            </View>

            {/* Tabs */}
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                marginTop: 24,
                paddingInline: 20,
              }}
            >
              {tabs.map((t) => (
                <TouchableOpacity
                  key={t.id}
                  style={{ flex: 1, gap: 4, alignItems: "center" }}
                  onPress={() => setTab(t.id)}
                >
                  <ThemeText type="h2" themeColor="text">
                    {t.name}
                  </ThemeText>

                  <ThemeView
                    style={{
                      borderRadius: 999,
                      opacity: tab === t.id ? 1 : 0,
                      height: 4,
                      maxWidth: 55,
                      width: "100%",
                    }}
                    themeColor="secondaryBackground"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ThemeView>
        }
        stickyHeaderIndices={[0]}
        initialNumToRender={6}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item: cast, index }) => (
          <View
            key={cast.id}
            style={{
              flexDirection: "row",
              gap: 12,
              marginTop: index === 0 ? 0 : 12,
              marginInline: 20,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 44,
                aspectRatio: 1,
                borderRadius: 14,
                position: "relative",
                overflow: "hidden",
                backgroundColor: theme.secondaryBackground,
              }}
            >
              <Image
                source={{ uri: cast.profile_path }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <ThemeText type="h2" themeColor="text">
                {cast.name}
              </ThemeText>
              <ThemeText type="tag" themeColor="secondaryText">
                {cast.character}
              </ThemeText>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <ThemeView
            themeColor="secondaryBackground"
            style={{
              paddingBlock: 20,
              paddingInline: 15,
              borderRadius: 20,
              marginInline: 20,
            }}
          >
            {tab === "about" ? (
              <>
                <ThemeText
                  type="h2"
                  style={{ marginBottom: 8, fontWeight: 600 }}
                >
                  Overview
                </ThemeText>
                <ThemeText style={{ lineHeight: 17 }}>
                  {movie.overview}
                </ThemeText>
              </>
            ) : tab === "reviews" ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                {/* Left — score + stars + vote count */}
                <View style={{ alignItems: "center", gap: 4 }}>
                  <ThemeText
                    type="h1"
                    style={{ fontSize: 28, fontWeight: "600" }}
                  >
                    {movie.vote_average.toFixed(1)}
                  </ThemeText>

                  <View style={{ flexDirection: "row", gap: 3 }}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Ionicons
                        key={i}
                        name="star"
                        size={12}
                        color={
                          i < Math.round(movie.vote_average / 2)
                            ? theme.primary
                            : theme.muted
                        }
                      />
                    ))}
                  </View>
                  <ThemeText themeColor="secondaryText">
                    {movie.vote_count < 1000
                      ? movie.vote_count
                      : (movie.vote_count / 1000).toFixed(1)}
                    K votes
                  </ThemeText>
                </View>

                {/* Right — progress bars */}
                <View style={{ flex: 1, gap: 6 }}>
                  {rateBars.map((bar) => (
                    <View
                      key={bar.label}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <ThemeText
                        themeColor="secondaryText"
                        style={{ width: 8 }}
                      >
                        {bar.label}
                      </ThemeText>
                      <ThemeView
                        themeColor="muted"
                        style={{
                          flex: 1,
                          height: 5,
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <ThemeView
                          themeColor="primary"
                          style={{
                            width: bar.width,
                            borderRadius: 2,
                            height: "100%",
                          }}
                        />
                      </ThemeView>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <ThemeText>No cast yet</ThemeText>
            )}
          </ThemeView>
        }
      />
    </ThemeView>
  );
};

export default MovieBySlug;

const rateBars = [
  { label: "5", width: "60%" as const },
  { label: "4", width: "84%" as const },
  { label: "3", width: "40%" as const },
  { label: "2", width: "20%" as const },
  { label: "1", width: "10%" as const },
];

type Tab = {
  name: string;
  id: "about" | "reviews" | "cast";
};
const tabs: Tab[] = [
  { name: "About", id: "about" },
  { name: "Reviews", id: "reviews" },
  { name: "Cast", id: "cast" },
];

const TagComponent = ({
  title,
  icon,
}: {
  title: string;
  icon: ComponentProps<typeof Ionicons>["name"];
}) => {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <Ionicons name={icon} size={16} color={theme.secondaryText} />
      <ThemeText themeColor="secondaryText" type="tag">
        {title}
      </ThemeText>
    </View>
  );
};
