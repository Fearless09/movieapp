import { useTheme } from "@/hooks/useTheme";
import { Movie } from "@/lib/type";
import { router } from "expo-router";
import { DimensionValue, Image, TouchableOpacity } from "react-native";
import { ThemeText, ThemeView } from "../ui/Theme";

type MovieCardProps = {
  movie: Movie;
  width?: "47.77%" | "30.35%" | DimensionValue;
};
const MovieCard = ({ movie, width = "30.35%" }: MovieCardProps) => {
  const theme = useTheme();

  return (
    <ThemeView
      themeColor="secondaryBackground"
      style={{ width, borderRadius: 12, overflow: "hidden" }}
    >
      <TouchableOpacity
        onPress={() => router.push(`/movie/${movie.movie_id}`)}
        key={movie.movie_id}
        style={{
          backgroundColor: theme.secondaryBackground,
          //   borderRadius: 16,
          width: "100%",
          minHeight: 145,
          aspectRatio: 100 / 150,
          flexShrink: 0,
        }}
      >
        <Image
          source={{ uri: movie.poster_path }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </TouchableOpacity>
      <ThemeText
        themeColor="secondaryText"
        numberOfLines={1}
        style={{ paddingBlock: 4, paddingInline: 8 }}
      >
        {movie.original_title}
      </ThemeText>
    </ThemeView>
  );
};

export default MovieCard;
