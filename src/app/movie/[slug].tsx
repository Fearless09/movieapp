import Header, { Tab } from "@/components/MovieDetails/Header";
import Review from "@/components/MovieDetails/Review";
import MovieCast from "@/components/shared/MovieCast";
import { ThemeText, ThemeView } from "@/components/ui/Theme";
import { useMovie } from "@/context/MovieProvider";
import { globalStyles } from "@/styles/styles";
import { RoutePath, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const MovieBySlug = () => {
  const { slug } = useLocalSearchParams<RoutePath>();
  const { movies } = useMovie();

  const [activeTab, setActiveTab] = useState<Tab["id"]>("about");

  const movie = useMemo(() => {
    return movies.find((m) => m.movie_id.toString() === slug);
  }, [movies, slug]);

  if (!movie) {
    return (
      <ThemeView style={globalStyles.container}>
        <ThemeText type="h1">Movie not found</ThemeText>
      </ThemeView>
    );
  }

  return (
    <ThemeView style={style.wrapper}>
      <FlatList
        data={activeTab === "cast" ? movie.casts : []}
        keyExtractor={(cast) => cast.id}
        ListHeaderComponent={
          <Header
            activeTab={activeTab}
            movie={movie}
            onTabChange={(tabId) => setActiveTab(tabId)}
          />
        }
        stickyHeaderIndices={[0]}
        initialNumToRender={6}
        contentContainerStyle={style.contentContainer}
        renderItem={({ item, index }) => (
          <MovieCast cast={item} index={index} />
        )}
        ListEmptyComponent={
          <View style={style.emptyWrapper}>
            {activeTab === "about" ? (
              <View>
                <ThemeText style={{ lineHeight: 17 }}>
                  {movie.overview}
                </ThemeText>
              </View>
            ) : activeTab === "reviews" ? (
              <Review movie={movie} />
            ) : (
              <ThemeText>No cast found</ThemeText>
            )}
          </View>
        }
      />
    </ThemeView>
  );
};

export default MovieBySlug;

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  emptyWrapper: {
    paddingHorizontal: 20,
  },
});
