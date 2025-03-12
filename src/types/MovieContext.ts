import { Movie } from "./Movie";

export interface MovieContextType {
  movies: Movie[];
  movieData: Movie | null;
  error: string | null;
  fetchMovies: (searchQuery: string, page: number) => void;
  fetchMovieDetails: (movieId: string) => void;
  totalPages: number;
  loading: boolean;
}
