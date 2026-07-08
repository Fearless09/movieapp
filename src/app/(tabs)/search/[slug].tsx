import MovieCard from "@/components/shared/MovieCard";
import { SearchBar } from "@/components/shared/Search";
import EmptyState from "@/components/ui/EmptyState";
import { ThemeView } from "@/components/ui/Theme";
import { useMovie } from "@/context/MovieProvider";
import { RoutePath, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const Search = () => {
  const { slug } = useLocalSearchParams<RoutePath>();
  const { movies } = useMovie();

  const transFormedSlug = useMemo(() => {
    if (!slug) return "";
    return typeof slug === "string" ? slug : slug.join(" ");
  }, [slug]);

  const [search, setSearch] = useState<string>("");
  const searchResults = useMemo(() => {
    if (!search.trim()) return movies;

    return movies.filter((movie) =>
      movie.original_title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, movies]);

  useFocusEffect(
    useCallback(() => {
      if (transFormedSlug) setSearch(transFormedSlug);

      return () => setSearch("");
    }, [transFormedSlug]),
  );

  return (
    <ThemeView style={style.wrapper}>
      <FlatList
        data={searchResults}
        ListHeaderComponent={
          <SearchBar
            placeholder={transFormedSlug || "Search..."}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        }
        keyboardDismissMode="on-drag"
        contentContainerStyle={style.contentContainer}
        columnWrapperStyle={style.columnWrapper}
        stickyHeaderIndices={[0]}
        numColumns={2}
        keyExtractor={(movie) => `${movie.movie_id}`}
        renderItem={({ item }) => <MovieCard movie={item} width={"47.77%"} />}
        ListEmptyComponent={
          <View style={style.listEmptyWrapper}>
            <EmptyState
              btnAction={() => setSearch("")}
              btnText="Clear Search"
              icon="search-outline"
              subtitle="Try searching for a different title, actor, or genre"
              title={`No results for "${search}"`}
              btnIcon="trash-outline"
            />
          </View>
        }
      />
    </ThemeView>
  );
};

export default Search;

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  contentContainer: {
    paddingInline: 20,
    paddingBottom: 90,
  },
  columnWrapper: {
    gap: 16,
    flex: 1,
    flexWrap: "wrap",
    marginTop: 20,
  },
  listEmptyWrapper: {
    marginTop: 20,
  },
});
