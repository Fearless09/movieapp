import { useMovie } from "@/context/MovieProvider";
import { useTheme } from "@/hooks/useTheme";
import { router } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Skeleton from "../ui/Skeleton";

const TopMovies = () => {
  const theme = useTheme();
  const { topMovies, loading } = useMovie();

  return (
    <>
      <FlatList
        data={topMovies}
        horizontal
        contentContainerStyle={{ marginTop: 20 }}
        keyExtractor={(movie) => `${movie.movie_id}`}
        renderItem={({ item: movie, index }) => (
          <TouchableOpacity
            onPress={() => router.push(`/movie/${movie.movie_id}`)}
            key={movie.movie_id}
            style={{
              position: "relative",
              width: 150,
              height: 210,
              flexShrink: 0,
              borderRadius: 16,
              backgroundColor: theme.secondaryBackground,
              marginLeft: index === 0 ? 0 : 20,
            }}
          >
            <Image
              source={{ uri: movie.poster_path }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 16,
                objectFit: "cover",
              }}
            />

            <Text
              style={{
                position: "absolute",
                bottom: -15,
                left: 0,
                fontSize: 96,
                fontWeight: "semibold",
                zIndex: 1,
                textShadowColor: theme.primary,
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 1,
                color: theme.secondaryBackground,
              }}
            >
              {index + 1}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          loading ? (
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                gap: 20,
                flexWrap: "nowrap",
                flex: 1,
              }}
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  type="card"
                  style={{
                    width: 150,
                    height: 210,
                  }}
                  key={index}
                />
              ))}
            </View>
          ) : null
        }
      />
    </>
  );
};

export default TopMovies;
