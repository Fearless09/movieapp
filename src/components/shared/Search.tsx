import { ThemeText, ThemeView } from "@/components/ui/Theme";
import { useTheme } from "@/hooks/useTheme";
import { Movie } from "@/lib/type";
import { blurhash } from "@/lib/utils";
import { textStyles } from "@/styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

type SearchBarProps = TextInputProps & {};
export const SearchBar = ({ style, ...props }: SearchBarProps) => {
  const theme = useTheme();

  return (
    <ThemeView style={searchBarStyle.wrapper} themeColor="secondaryBackground">
      <TextInput
        inputMode="search"
        placeholder="Search"
        placeholderTextColor={theme.secondaryText}
        style={[
          textStyles.input,
          searchBarStyle.input,
          { color: theme.text },
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

const searchBarStyle = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    position: "relative",
    flexDirection: "row",
    borderRadius: 999,
    overflow: "hidden",
    paddingRight: 20,
    gap: 4,
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 42,
    paddingLeft: 20,
  },
});

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
      style={searchResultStyle.wrapper}
    >
      <FlatList
        data={movies}
        keyExtractor={(movie) => `${movie.movie_id}`}
        keyboardDismissMode="on-drag"
        renderItem={({ item: movie }) => (
          <TouchableOpacity
            onPress={() => router.push(`/movie/${movie.movie_id}`)}
            style={[searchResultStyle.card]}
          >
            {/* Image */}
            <ThemeView
              themeColor="secondaryBackground"
              style={searchResultStyle.imgWrapper}
            >
              <Image
                source={{ uri: movie.poster_path }}
                style={searchResultStyle.img}
                contentFit="cover"
                contentPosition={"center"}
                placeholder={{ blurhash }}
              />
            </ThemeView>

            {/* Info */}
            <View style={searchResultStyle.infoWrapper}>
              <ThemeText numberOfLines={1} type="h2">
                {movie.original_title}
              </ThemeText>

              {/* Rating */}
              <View style={searchResultStyle.ratingWrapper}>
                <Ionicons name="star" size={10} color={theme.primary} />
                <ThemeText themeColor="secondaryText">
                  {movie.vote_average.toFixed(1)}
                </ThemeText>
              </View>
            </View>

            {/* Year */}
            <ThemeView
              themeColor="background"
              style={searchResultStyle.yearWrapper}
            >
              <ThemeText themeColor="secondaryText">
                {movie.release_date.slice(-4)}
              </ThemeText>
            </ThemeView>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={
          <ThemeView
            themeColor="background"
            style={searchResultStyle.divider}
          />
        }
      />
    </ThemeView>
  );
};

const searchResultStyle = StyleSheet.create({
  wrapper: {
    padding: 10,
    borderRadius: 16,
    position: "absolute",
    width: "100%",
    left: 0,
    top: "100%",
    marginTop: 5,
    maxHeight: 200,
    zIndex: 10,
  },
  divider: {
    height: 1,
    width: "97%",
    alignSelf: "center",
    marginVertical: 6,
  },
  card: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  imgWrapper: {
    width: 44,
    aspectRatio: 1 / 1.1,
    overflow: "hidden",
    borderRadius: 8,
    flexShrink: 0,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  infoWrapper: {
    flex: 1,
    gap: 4,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  yearWrapper: {
    borderRadius: 10,
    paddingVertical: 2.5,
    paddingHorizontal: 7,
  },
});
