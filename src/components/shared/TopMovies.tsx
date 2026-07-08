import { useMovie } from "@/context/MovieProvider";
import { useTheme } from "@/hooks/useTheme";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EmptyState from "../ui/EmptyState";
import Skeleton from "../ui/Skeleton";

const TopMovies = () => {
  const theme = useTheme();
  const { topMovies, loading, fetchMore } = useMovie();

  return (
    <FlatList
      data={topMovies}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={style.contentContainer}
      keyExtractor={(movie) => `${movie.movie_id}`}
      renderItem={({ item: movie, index }) => (
        <TouchableOpacity
          onPress={() => router.push(`/movie/${movie.movie_id}`)}
          style={[style.card, { backgroundColor: theme.secondaryBackground }]}
        >
          <Image
            source={{ uri: movie.poster_path }}
            style={style.poster}
            contentFit="cover"
            contentPosition={"center"}
          />

          <Text
            style={[
              style.rank,
              {
                textShadowColor: theme.primary,
                color: theme.secondaryBackground,
              },
            ]}
          >
            {index + 1}
          </Text>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={<View style={style.itemSeparator} />}
      ListEmptyComponent={
        <View style={style.listEmptyContainer}>
          {loading ? (
            <View style={style.skeletonContainer}>
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton style={style.skeleton} key={`skeleton-${index}`} />
              ))}
            </View>
          ) : (
            <EmptyState
              btnAction={() => fetchMore(true)}
              btnText="Refresh"
              icon="film-outline"
              subtitle="We couldn't find any movies at the moment. Check back later."
              title="No Top Movies Available"
              btnIcon="refresh-outline"
            />
          )}
        </View>
      }
    />
  );
};

export default TopMovies;

const style = StyleSheet.create({
  contentContainer: {
    marginTop: 20,
  },
  itemSeparator: {
    width: 20,
  },
  card: {
    position: "relative",
    width: 150,
    aspectRatio: 2 / 3,
    flexShrink: 0,
    borderRadius: 16,
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  rank: {
    position: "absolute",
    bottom: -16,
    left: 0,
    fontSize: 96,
    fontWeight: "600",
    zIndex: 1,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 1,
  },
  listEmptyContainer: {
    marginTop: 10,
  },
  skeletonContainer: {
    flexDirection: "row",
    gap: 20,
    flexWrap: "nowrap",
    flex: 1,
  },
  skeleton: {
    width: 150,
    height: 210,
  },
});
