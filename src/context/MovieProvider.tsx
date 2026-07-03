import { fetcher } from "@/lib/fetcher";
import { Movie } from "@/lib/type";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

type Action =
  | {
      type: "fetch";
      payload: { movies?: Movie[]; topMovies?: Movie[]; loading?: boolean };
    }
  | { type: "toggleBookmark"; payload: { movieId: number } }
  | {
      type: "toggleLoading";
      payload: { loading: boolean };
    }
  | {
      type: "resetBookmark";
    };

type State = {
  movies: Movie[];
  topMovies: Movie[];
  bookMarkedMovies: Movie[];
  loading: boolean;
};

type MovieContextType = State & {
  movieDispatch: (action: Action) => void;
};

const initialState: State = {
  movies: [],
  topMovies: [],
  bookMarkedMovies: [],
  loading: false,
};

const Context = createContext<MovieContextType | undefined>(undefined);
const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatcher] = useReducer(reducer, initialState);
  const movieDispatch = (action: Action) => dispatcher(action);

  useEffect(() => {
    async function fetchMovies() {
      movieDispatch({ type: "toggleLoading", payload: { loading: true } });

      try {
        const movies = await fetcher("/movies/infinite-scroll").then(
          (res) => (res as any).data as Movie[],
        );
        const topMovies = [...movies]
          .sort(
            (a, b) =>
              Number(b.release_date.slice(-4)) -
              Number(a.release_date.slice(-4)),
          )
          .slice(0, 3);

        // console.log("Movies: ", { movies, topMovies });

        movieDispatch({
          type: "fetch",
          payload: { movies, topMovies, loading: false },
        });
      } catch (error) {
        movieDispatch({
          type: "toggleLoading",
          payload: { loading: false },
        });

        const msg = error instanceof Error ? error.message : "Unknown error";
        console.error({ msg, error });
      }
    }

    fetchMovies();
  }, []);

  return (
    <Context.Provider value={{ ...state, movieDispatch }}>
      {children}
    </Context.Provider>
  );
};

export default MovieProvider;

export const useMovie = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useMovie must be used within a MovieProvider");
  }
  return context;
};

const reducer = (state: State, action: Action): State => {
  const { type } = action;

  switch (type) {
    case "fetch":
      return {
        ...state,
        movies: action.payload.movies || state.movies,
        topMovies: action.payload.topMovies || state.topMovies,
        loading: action.payload.loading ?? state.loading,
      };

    case "toggleBookmark":
      const { movieId } = action.payload;
      const isBookmarked = state.bookMarkedMovies.some(
        (movie) => movie.movie_id === movieId,
      );

      const updatedBookmarkedMovies = isBookmarked
        ? state.bookMarkedMovies.filter((movie) => movie.movie_id !== movieId)
        : [
            state.movies.find((movie) => movie.movie_id === movieId)!,
            ...state.bookMarkedMovies,
          ];

      return { ...state, bookMarkedMovies: updatedBookmarkedMovies };

    case "toggleLoading":
      return { ...state, loading: action.payload.loading };

    case "resetBookmark":
      return { ...state, bookMarkedMovies: [] };

    default:
      return state;
  }
};
