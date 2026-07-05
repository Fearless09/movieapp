import { useTheme } from "@/hooks/useTheme";
import { Movie } from "@/lib/type";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";
import { ThemeText, ThemeView } from "../ui/Theme";

type ReviewProps = {
  movie: Movie;
};
const Review = ({ movie }: ReviewProps) => {
  const theme = useTheme();

  return (
    <ThemeView themeColor="secondaryBackground" style={style.wrapper}>
      {/* Left — score + stars + vote count */}
      <View style={style.leftWrapper}>
        <ThemeText type="h1" style={style.score}>
          {movie.vote_average.toFixed(1)}
        </ThemeText>

        <View style={style.starRow}>
          {Array.from({ length: 5 }, (_, i) => (
            <Ionicons
              key={`star-${i}`}
              name="star"
              size={12}
              color={
                i < Math.round(movie.vote_average / 2)
                  ? theme.primary
                  : theme.muted
              }
            />
          ))}
        </View>
        <ThemeText themeColor="secondaryText">
          {movie.vote_count < 1000
            ? movie.vote_count
            : (movie.vote_count / 1000).toFixed(1)}
          K votes
        </ThemeText>
      </View>

      {/* Right — progress bars */}
      <View style={style.rightWrapper}>
        {rateBars.map((bar) => (
          <View key={bar.label} style={style.barRow}>
            <ThemeText themeColor="secondaryText" style={style.barLabel}>
              {bar.label}
            </ThemeText>
            <ThemeView themeColor="muted" style={style.bar}>
              <ThemeView
                themeColor="primary"
                style={[style.barIndicator, { width: bar.width }]}
              />
            </ThemeView>
          </View>
        ))}
      </View>
    </ThemeView>
  );
};

export default Review;

const rateBars = [
  { label: "5", width: "60%" as const },
  { label: "4", width: "84%" as const },
  { label: "3", width: "40%" as const },
  { label: "2", width: "20%" as const },
  { label: "1", width: "10%" as const },
];

const style = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  leftWrapper: {
    alignItems: "center",
    gap: 4,
  },
  score: {
    fontSize: 28,
    fontWeight: "600",
  },
  starRow: {
    flexDirection: "row",
    gap: 3,
  },
  rightWrapper: {
    flex: 1,
    gap: 6,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  barLabel: {
    width: 8,
  },
  bar: {
    flex: 1,
    height: 5,
    borderRadius: 2,
    overflow: "hidden",
  },
  barIndicator: {
    borderRadius: 2,
    height: "100%",
  },
});
