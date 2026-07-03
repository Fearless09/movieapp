import MovieCard from "@/components/shared/MovieCard";
import { SearchBar } from "@/components/shared/Search";
import { ThemeView } from "@/components/ui/Theme";
import { useMovie } from "@/context/MovieProvider";
import { RoutePath, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList } from "react-native";

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
    }, [transFormedSlug]),
  );

  return (
    <ThemeView style={{ flex: 1 }}>
      <FlatList
        data={searchResults}
        ListHeaderComponent={
          <SearchBar
            placeholder={transFormedSlug || "Search..."}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        }
        contentContainerStyle={{ paddingInline: 20 }}
        columnWrapperStyle={{
          marginTop: 20,
          gap: 16,
          flex: 1,
          flexWrap: "wrap",
        }}
        stickyHeaderIndices={[0]}
        numColumns={2}
        keyExtractor={(movie) => movie.movie_id.toString()}
        renderItem={({ item }) => (
          <MovieCard key={item.movie_id} movie={item} width={"47.77%"} />
        )}
      />
    </ThemeView>
  );
};

export default Search;
