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
import { FlatList, View } from "react-native";

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
    <ThemeView style={{ flex: 1 }}>
      <FlatList
        columnWrapperStyle={{
          marginTop: 10,
          gap: 16,
          flex: 1,
          flexWrap: "wrap",
        }}
        ListHeaderComponent={
          <View style={[globalStyles.container, { paddingInline: 0 }]}>
            <ThemeText type="h1" style={{ marginBottom: 10 }}>
              What do you want to watch?
            </ThemeText>

            <View style={{ position: "relative" }}>
              <SearchBar
                value={search}
                onChangeText={(text) => setSearch(text)}
              />
              <SearchResult movies={searchResults} />
            </View>

            <TopMovies />
            <ThemeText type="h1" style={{ marginTop: 64 }}>
              Movies
            </ThemeText>
          </View>
        }
        numColumns={3}
        initialNumToRender={6}
        data={movies}
        contentContainerStyle={{ paddingBottom: 90, paddingInline: 20 }}
        keyExtractor={(movie) => `${movie.movie_id}-${movie.id}`}
        renderItem={({ item: movie }) => (
          <MovieCard key={`${movie.movie_id}-${movie.id}`} movie={movie} />
        )}
        ListEmptyComponent={
          <>
            {loading ? (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  rowGap: 18,
                  columnGap: 16,
                  flexWrap: "wrap",
                  flex: 1,
                }}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    type="card"
                    style={{
                      width: "30.35%",
                      height: 145,
                      aspectRatio: 100 / 145,
                    }}
                    key={index}
                  />
                ))}
              </View>
            ) : (
              <View style={{ marginTop: 10 }}>
                <EmptyState
                  btnAction={fetchMore}
                  btnText="Refresh"
                  icon="film-outline"
                  subtitle="We couldn't find any movies at the moment. Check back later."
                  title="No Movies Found"
                  btnIcon="refresh-outline"
                />
              </View>
            )}
          </>
        }
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          <>
            {loadingMore && (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  rowGap: 18,
                  columnGap: 16,
                  flexWrap: "wrap",
                  flex: 1,
                }}
              >
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    type="card"
                    style={{
                      width: "30.35%",
                      height: 145,
                      aspectRatio: 100 / 150,
                    }}
                    key={index}
                  />
                ))}
              </View>
            )}
          </>
        }
      />
    </ThemeView>
  );
}
