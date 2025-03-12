import { useState, ReactNode } from "react";
import { Movie } from "../types/Movie";
import { MovieContext } from "./MovieContext";

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchMovies = async (searchQuery: string, page: number) => {
    setLoading(true);
    try {
      const endpoint = searchQuery
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (movieId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const data = await response.json();
      setMovieData(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MovieContext.Provider value={{ movies, movieData, error, fetchMovies, fetchMovieDetails, totalPages, loading }}>
      {children}
    </MovieContext.Provider>
  );
};
