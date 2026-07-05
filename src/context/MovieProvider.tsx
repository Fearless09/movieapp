import { BASE_URL, fetcher } from "@/lib/fetcher";
import { getData, removeData, saveData } from "@/lib/localStorage";
import { Movie } from "@/lib/type";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";

type Action =
  | {
      type: "fetch";
      payload: {
        movies: Movie[];
        next_page_url: string | null;
      };
    }
  | { type: "toggleBookmark"; payload: { movieId: number } }
  | {
      type: "toggleLoading";
      payload: { loading?: boolean; loadingMore?: boolean };
    }
  | { type: "resetBookmark" }
  | { type: "getBookMarked"; payload: { movies: Movie[] } }
  | { type: "clearBookMarked" };

type State = {
  movies: Movie[];
  topMovies: Movie[];
  bookMarkedMovies: Movie[];
  loading: boolean;
  next_page_url: string | null;
  loadingMore: boolean;
};

type MovieContextType = State & {
  movieDispatch: (action: Action) => void;
  fetchMore: (refresh?: boolean) => Promise<void>;
};

const initialState: State = {
  movies: [],
  topMovies: [],
  bookMarkedMovies: [],
  loading: false,
  next_page_url: null,
  loadingMore: false,
};
const BOOKMARKED_MOVIES_KEY = "bookMarkedMovies";

const Context = createContext<MovieContextType | undefined>(undefined);
const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatcher] = useReducer(reducer, initialState);
  const movieDispatch = (action: Action) => dispatcher(action);

  const stateRef = useRef(state);
  const fetchMovies = useCallback(async () => {
    try {
      const state = stateRef.current;
      if (state.loadingMore || state.loading) return;

      movieDispatch({
        type: "toggleLoading",
        payload: {
          loading: !state.next_page_url,
          loadingMore: !!state.next_page_url,
        },
      });

      const url = state.next_page_url || `${BASE_URL}/movies/infinite-scroll`;

      const { data: movies, next_page_url } = await fetcher<{
        data: Movie[];
        next_page_url: string | null;
      }>(url);

      movieDispatch({
        type: "fetch",
        payload: { movies, next_page_url },
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      console.error({ msg, error });
    } finally {
      movieDispatch({
        type: "toggleLoading",
        payload: { loading: false, loadingMore: false },
      });
    }
  }, [fetcher]);

  const fetchMore = useCallback(
    async (refresh: boolean = false) => {
      if (refresh) {
        await fetchMovies();
        return;
      }

      if (!stateRef.current.next_page_url) return;
      await fetchMovies();
    },
    [fetchMovies],
  );

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    fetchMovies();

    const getBookMarkedMovies = async () => {
      const movies = await getData<Movie[]>(BOOKMARKED_MOVIES_KEY, []);
      movieDispatch({ type: "getBookMarked", payload: { movies } });
    };
    getBookMarkedMovies();
  }, []);

  return (
    <Context.Provider value={{ ...state, movieDispatch, fetchMore }}>
      {children}
    </Context.Provider>
  );
};

export default MovieProvider;

export const useMovie = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw Error("useMovie must be used within a MovieProvider");
  }
  return context;
};

const reducer = (state: State, action: Action): State => {
  const { type } = action;

  switch (type) {
    case "fetch": {
      const { next_page_url, movies } = action.payload;
      const newMovies = Array.from(
        new Map(
          [...state.movies, ...movies].map((movie) => [movie.movie_id, movie]),
        ).values(),
      );
      const topMovies = [...newMovies]
        .sort((a, b) => {
          if (!a.release_date || !b.release_date) {
            return b.popularity - a.popularity;
          }

          return (
            Number(b.release_date.slice(-4)) - Number(a.release_date.slice(-4))
          );
        })
        .slice(0, 3);

      return {
        ...state,
        movies: newMovies,
        loading: false,
        loadingMore: false,
        topMovies,
        next_page_url,
      };
    }

    case "getBookMarked": {
      return { ...state, bookMarkedMovies: action.payload.movies };
    }

    case "toggleBookmark": {
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
      saveData(BOOKMARKED_MOVIES_KEY, updatedBookmarkedMovies);

      return { ...state, bookMarkedMovies: updatedBookmarkedMovies };
    }

    case "clearBookMarked": {
      removeData(BOOKMARKED_MOVIES_KEY);
      return { ...state, bookMarkedMovies: [] };
    }

    case "toggleLoading": {
      const { loading, loadingMore } = action.payload;

      return {
        ...state,
        loading: loading ?? state.loading,
        loadingMore: loadingMore ?? state.loadingMore,
      };
    }

    case "resetBookmark": {
      return { ...state, bookMarkedMovies: [] };
    }

    default: {
      return state;
    }
  }
};
