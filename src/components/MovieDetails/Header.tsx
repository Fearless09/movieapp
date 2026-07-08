import { useMovie } from "@/context/MovieProvider";
import { useTheme } from "@/hooks/useTheme";
import { Movie } from "@/lib/type";
import { globalStyles } from "@/styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ComponentProps, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemeText, ThemeView } from "../ui/Theme";

export type Tab = {
  name: string;
  id: "about" | "reviews" | "cast";
};

const tabs: Tab[] = [
  { name: "About", id: "about" },
  { name: "Reviews", id: "reviews" },
  { name: "Cast", id: "cast" },
];

type HeaderProp = {
  movie: Movie;
  activeTab: Tab["id"];
  onTabChange: (tabId: Tab["id"]) => void;
};

const Header = ({ movie, onTabChange, activeTab }: HeaderProp) => {
  const theme = useTheme();
  const router = useRouter();
  const { movieDispatch, bookMarkedMovies } = useMovie();

  const isBookmarked = useMemo(() => {
    if (!movie) return false;
    return bookMarkedMovies.some((m) => m.movie_id === movie.movie_id);
  }, [bookMarkedMovies, movie]);

  return (
    <ThemeView style={[globalStyles.container, style.headerWrapper]}>
      {/* Header */}
      <View style={style.header}>
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
      <ThemeView themeColor="secondaryBackground" style={style.bannerWrapper}>
        <Image
          source={{ uri: movie.backdrop_path }}
          style={style.bannerImg}
          contentPosition={"center"}
          contentFit="cover"
        />

        <ThemeView themeColor="background" style={style.bannerTagWrapper}>
          <Ionicons name="star" size={12} color={theme.accent} />
          <ThemeText themeColor="accent" type="tag" style={style.bannerTagText}>
            {movie.vote_average.toFixed(1)}
          </ThemeText>
        </ThemeView>
      </ThemeView>

      {/* Title and Poster */}
      <View style={style.detailsWrapper}>
        <View style={style.posterWrapper}>
          <Image
            source={{ uri: movie.poster_path }}
            style={[
              style.posterImg,
              { backgroundColor: theme.secondaryBackground },
            ]}
          />
        </View>

        <ThemeText type="h1" themeColor="text">
          {movie.original_title}
        </ThemeText>
      </View>

      {/* Tags */}
      <View style={style.tagRow}>
        <TagComponent
          title={movie.release_date.slice(-4)}
          icon="calendar-outline"
        />
        <ThemeView themeColor="secondaryBackground" style={style.tagDivider} />
        <TagComponent
          title={movie.original_language.toUpperCase()}
          icon="language"
        />
      </View>

      {/* Tabs */}
      <View style={style.tabRow}>
        {tabs.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={style.tabWrapper}
            onPress={() => onTabChange(t.id)}
          >
            <ThemeText type="h2" themeColor="text">
              {t.name}
            </ThemeText>

            <ThemeView
              style={[
                style.tabIndicator,
                { opacity: activeTab === t.id ? 1 : 0 },
              ]}
              themeColor="secondaryBackground"
            />
          </TouchableOpacity>
        ))}
      </View>
    </ThemeView>
  );
};

export default Header;

type TagProps = {
  title: string;
  icon: ComponentProps<typeof Ionicons>["name"];
};
const TagComponent = ({ title, icon }: TagProps) => {
  const theme = useTheme();

  return (
    <View style={style.tagWrapper}>
      <Ionicons name={icon} size={16} color={theme.secondaryText} />
      <ThemeText themeColor="secondaryText" type="tag">
        {title}
      </ThemeText>
    </View>
  );
};

const style = StyleSheet.create({
  headerWrapper: {
    paddingHorizontal: 0,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: 20,
  },
  bannerWrapper: {
    marginTop: 28,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    aspectRatio: 16 / 9,
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },
  bannerImg: {
    width: "100%",
    height: "100%",
  },
  bannerTagWrapper: {
    position: "absolute",
    right: 10,
    bottom: 10,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bannerTagText: {
    fontWeight: 700,
  },
  detailsWrapper: {
    marginTop: 12,
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
  },
  posterWrapper: {
    position: "relative",
    width: 95,
  },
  posterImg: {
    width: "100%",
    position: "absolute",
    bottom: -10,
    left: 0,
    borderRadius: 16,
    height: 140,
    objectFit: "cover",
  },
  tagRow: {
    marginTop: 24,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  tagWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tagDivider: {
    width: 2,
    height: 16,
    borderRadius: 999,
  },
  tabRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 24,
    paddingInline: 20,
  },
  tabWrapper: {
    flex: 1,
    gap: 4,
    alignItems: "center",
  },
  tabIndicator: {
    borderRadius: 999,
    height: 4,
    maxWidth: 55,
    width: "100%",
  },
});
