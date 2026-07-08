import MovieCard from "@/components/shared/MovieCard";
import { SearchBar, SearchResult } from "@/components/shared/Search";
import TopMovies from "@/components/shared/TopMovies";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { ThemeText, ThemeView } from "@/components/ui/Theme";
import { useMovie } from "@/context/MovieProvider";
import { globalStyles } from "@/styles/styles";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
  const { movies, loading, fetchMore, loadingMore } = useMovie();

  const [search, setSearch] = useState("");
  const searchResults = useMemo(() => {
    if (!search.trim()) return [];

    return movies.filter((movie) =>
      movie.original_title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, movies]);

  useFocusEffect(
    useCallback(() => {
      return () => setSearch("");
    }, []),
  );

  return (
    <ThemeView style={style.wrapper}>
      <FlatList
        columnWrapperStyle={style.columnWrapper}
        ListHeaderComponent={
          <View style={[globalStyles.container, style.headerWrapper]}>
            <ThemeText type="h1" style={style.h1}>
              What do you want to watch?
            </ThemeText>

            <View style={style.searchWrapper}>
              <SearchBar
                value={search}
                onChangeText={(text) => setSearch(text)}
              />
              <SearchResult movies={searchResults} />
            </View>

            <TopMovies />
            <ThemeText type="h1" style={style.movieTitle}>
              Movies
            </ThemeText>
          </View>
        }
        numColumns={3}
        initialNumToRender={6}
        data={movies}
        keyboardDismissMode="on-drag"
        contentContainerStyle={style.contentContainer}
        keyExtractor={(movie) => `${movie.movie_id}`}
        renderItem={({ item: movie }) => <MovieCard movie={movie} />}
        ListEmptyComponent={
          <View style={style.emptyWrapper}>
            {loading ? (
              <View style={style.skeletonWrapper}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton type="card" style={style.skeleton} key={index} />
                ))}
              </View>
            ) : (
              <EmptyState
                btnAction={() => fetchMore(true)}
                btnText="Refresh"
                icon="film-outline"
                subtitle="We couldn't find any movies at the moment. Check back later."
                title="No Movies Found"
                btnIcon="refresh-outline"
              />
            )}
          </View>
        }
        onEndReached={() => fetchMore()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          <View style={style.emptyWrapper}>
            {loadingMore && (
              <View style={style.skeletonWrapper}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton type="card" style={style.skeleton} key={index} />
                ))}
              </View>
            )}
          </View>
        }
      />
    </ThemeView>
  );
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headerWrapper: {
    paddingHorizontal: 0,
  },
  columnWrapper: {
    marginTop: 10,
    gap: 16,
    flex: 1,
    flexWrap: "wrap",
  },
  contentContainer: {
    paddingBottom: 90,
    paddingHorizontal: 20,
  },
  h1: {
    marginBottom: 10,
  },
  searchWrapper: {
    position: "relative",
  },
  movieTitle: {
    marginTop: 50,
  },
  emptyWrapper: {
    marginTop: 10,
  },
  skeletonWrapper: {
    flexDirection: "row",
    rowGap: 18,
    columnGap: 16,
    flexWrap: "wrap",
    flex: 1,
  },
  skeleton: {
    width: "30.35%",
    height: 145,
    aspectRatio: 2 / 3,
  },
});
