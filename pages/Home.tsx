import { useEffect, useState } from "react";
import Card from "../src/components/Card/Card";
import { useMovieContext } from "../src/hooks/useMovieContext";

export default function Home() {
  const { movies, error, fetchMovies, totalPages } = useMovieContext();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMovies(searchQuery, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  if (error) return <div>Error: {error}</div>;
  if (movies.length === 0) return <div>No movies found</div>;

  return (
    <section className="px-2 py-4">
      <div className="w-full mb-2">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Movie..."
            required
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <Card movies={movies} />
      <div className="w-full flex justify-between items-center gap-4 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 max-w-3xs text-sm font-medium border border-black/10 rounded-lg transition duration-500 hover:bg-black/5 disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={page === totalPages}
          className="px-4 py-2 max-w-3xs text-sm font-medium border border-black/10 rounded-lg transition duration-500 hover:bg-black/5 disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </section>
  );
}
