import { ThemeText, ThemeView } from "@/components/ui/Theme";
import { useMovie } from "@/context/MovieProvider";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles, ThemeColor } from "@/styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { ComponentProps } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";

const WatchList = () => {
  const theme = useTheme();
  const { bookMarkedMovies } = useMovie();

  return (
    <ThemeView style={{ flex: 1 }}>
      <FlatList
        data={bookMarkedMovies}
        keyExtractor={(movie) => movie.movie_id.toString()}
        ListHeaderComponent={
          <ThemeView
            style={[
              globalStyles.container,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 4,
                marginBottom: 34,
                paddingBottom: 6,
                paddingInline: 0,
              },
            ]}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={20} color={theme.text} />
            </TouchableOpacity>

            <ThemeText type="h1">Watch List</ThemeText>

            <View style={{ width: 20, aspectRatio: 1 }} />
          </ThemeView>
        }
        stickyHeaderIndices={[0]}
        initialNumToRender={6}
        contentContainerStyle={{ paddingInline: 20, paddingBottom: 90 }}
        renderItem={({ item: movie, index }) => (
          <View
            key={movie.movie_id}
            style={{
              flexDirection: "row",
              gap: 12,
              marginTop: index === 0 ? 0 : 24,
            }}
          >
            {/* Image */}
            <TouchableOpacity
              onPress={() => router.push(`/movie/${movie.movie_id}`)}
            >
              <ThemeView
                themeColor="secondaryBackground"
                style={{
                  width: 95,
                  aspectRatio: 95 / 120,
                  overflow: "hidden",
                  borderRadius: 16,
                }}
              >
                <Image
                  source={{ uri: movie.poster_path }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </ThemeView>
            </TouchableOpacity>

            {/* Details */}
            <View
              style={{
                flex: 1,
                paddingBlock: 6,
                gap: 6,
              }}
            >
              <TouchableOpacity
                onPress={() => router.push(`/movie/${movie.movie_id}`)}
              >
                <ThemeText type="title" numberOfLines={1}>
                  {movie.original_title}
                </ThemeText>
              </TouchableOpacity>

              <TagComponent
                color="accent"
                icon="star-outline"
                title={movie.vote_average.toFixed(1)}
                top={"auto"}
              />
              <TagComponent
                icon="people-outline"
                title={
                  movie.vote_count < 1000
                    ? movie.vote_count.toString()
                    : `${(movie.vote_count / 1000).toFixed(1)}K`
                }
              />
              <TagComponent
                icon="calendar-outline"
                title={movie.release_date.slice(-4)}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
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
              <Ionicons name="film-outline" size={32} color={theme.primary} />
            </View>
            <ThemeText type="title" style={{ textAlign: "center" }}>
              Your watchlist is empty
            </ThemeText>
            <ThemeText
              themeColor="secondaryText"
              style={{ textAlign: "center", marginBottom: 12 }}
            >
              Movies you save will appear here. Start adding films you want to
              watch.
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
              onPress={() => router.push("/search/a")}
            >
              <Ionicons name="add" size={18} color={theme.text} />
              <ThemeText type="h2">Browse Movies</ThemeText>
            </TouchableOpacity>
          </ThemeView>
        }
      />
    </ThemeView>
  );
};

export default WatchList;

type TapProps = {
  title: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  top?: "auto" | 0;
  color?: ThemeColor;
};
const TagComponent = ({ icon, title, top = 0, color = "text" }: TapProps) => {
  const theme = useTheme();
  return (
    <View style={{ marginTop: top, flexDirection: "row", gap: 4 }}>
      <Ionicons name={icon} size={16} color={theme[color]} />
      <ThemeText themeColor={color}>{title}</ThemeText>
    </View>
  );
};
