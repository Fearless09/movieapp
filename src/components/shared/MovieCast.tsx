import { useTheme } from "@/hooks/useTheme";
import { Cast } from "@/lib/type";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { ThemeText } from "../ui/Theme";

type CastProp = {
  cast: Cast;
  index: number;
};
const MovieCast = ({ cast, index }: CastProp) => {
  const theme = useTheme();

  return (
    <View style={[style.wrapper, { marginTop: index === 0 ? 0 : 12 }]}>
      {/* Profile Image */}
      <View
        style={[
          style.profileImgWrapper,
          { backgroundColor: theme.secondaryBackground },
        ]}
      >
        <Image
          source={{ uri: cast.profile_path }}
          style={style.profileImg}
          contentFit="cover"
          contentPosition={"center"}
        />
      </View>

      {/* Info */}
      <View style={style.infoWrapper}>
        <ThemeText type="h2" themeColor="text">
          {cast.name}
        </ThemeText>
        <ThemeText type="tag" themeColor="secondaryText">
          {cast.character}
        </ThemeText>
      </View>
    </View>
  );
};

export default MovieCast;

const style = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    gap: 12,
    marginInline: 20,
    alignItems: "center",
  },
  profileImgWrapper: {
    width: 44,
    aspectRatio: 1,
    borderRadius: 14,
    position: "relative",
    overflow: "hidden",
  },
  profileImg: {
    width: "100%",
    height: "100%",
  },
  infoWrapper: {
    flex: 1,
    gap: 2,
  },
});
