import { Cast } from "@/lib/type";
import { blurhash } from "@/lib/utils";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { ThemeText, ThemeView } from "../ui/Theme";

type CastProp = {
  cast: Cast;
};
const MovieCast = ({ cast }: CastProp) => {
  return (
    <View style={style.wrapper}>
      {/* Profile Image */}
      <ThemeView
        themeColor="secondaryBackground"
        style={style.profileImgWrapper}
      >
        <Image
          source={{ uri: cast.profile_path }}
          style={style.profileImg}
          contentFit="cover"
          contentPosition={"center"}
          placeholder={{ blurhash }}
        />
      </ThemeView>

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
