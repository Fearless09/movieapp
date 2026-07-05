import { useTheme } from "@/hooks/useTheme";
import { Movie } from "@/lib/type";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  DimensionValue,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeText } from "../ui/Theme";

type MovieCardProps = {
  movie: Movie;
  width?: "47.77%" | "30.35%" | DimensionValue;
};
const MovieCard = ({ movie, width = "30.35%" }: MovieCardProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/movie/${movie.movie_id}`)}
      style={[
        style.card,
        { width, backgroundColor: theme.secondaryBackground },
      ]}
    >
      <Image
        source={{ uri: movie.poster_path }}
        style={style.poster}
        contentFit="cover"
        contentPosition={"center"}
        transition={300}
      />

      {/* Info */}
      <View style={style.infoWrapper}>
        <ThemeText numberOfLines={1} type="tag">
          {movie.original_title}
        </ThemeText>
        {!!movie.release_date && (
          <ThemeText themeColor="secondaryText">
            {movie.release_date.slice(-4)}
          </ThemeText>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const style = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
  },
  infoWrapper: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    gap: 2,
  },
});
