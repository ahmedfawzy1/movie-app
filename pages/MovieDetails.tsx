import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieContext } from "../src/hooks/useMovieContext";

export default function MovieDetails() {
  const { movieId } = useParams<{ movieId: string }>();
  const { movieData, error, fetchMovieDetails, loading } = useMovieContext();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails(movieId);
      checkWishlistStatus(movieId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const checkWishlistStatus = (id: string) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsWishlisted(wishlist.includes(id));
  };

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (isWishlisted) {
      const updatedWishlist = wishlist.filter((id: string) => id !== movieId);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      wishlist.push(movieId);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
    setIsWishlisted(!isWishlisted);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movieData) return <div>No movie details found</div>;

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto md:space-x-6 p-4 md:pt-8 flex flex-col md:flex-row content-center">
        <div className="w-full mb-3 rounded-2xl">
          <img
            src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
            alt={movieData.title}
            className="w-full max-h-[550px] object-center object-cover rounded-2xl cursor-pointer shadow-lg"
          />
        </div>
        <div className="p-2">
          <h1 className="font-bold md:text-2xl xl:text-3xl tracking-wide text-slate-950 mb-2">{movieData.title}</h1>
          <p className="text-sm font-medium text-sky-950 mb-2">
            {movieData.release_date.split("-")[0]} &#9679; {movieData.spoken_languages[0].english_name}
          </p>
          <p className="text-sm text-slate-950 leading-loose mb-2">{movieData.overview}</p>
          <p className="text-sm text-slate-950 mb-2">
            <span className="font-bold">Popularity:</span> {movieData.popularity}
          </p>
          <p className="text-sm text-slate-950 mb-2">
            <span className="font-bold">Release Date :</span> {movieData.release_date}
          </p>
          <div className="text-sm text-slate-950 flex gap-2 mb-2">
            <span className="font-bold">Vote Average:</span>
            <div className="flex items-center gap-1.5">
              <img src="/src/assets/icon/star.png" alt="star" />
              <p className="text-sm text-slate-950">{movieData.vote_average.toFixed(1)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-slate-950">
              <span className="font-bold">Vote Count:</span> {movieData.vote_count}
            </p>
          </div>
          <button
            onClick={toggleWishlist}
            className={`mt-4 px-4 py-2 text-sm font-medium border rounded-lg transition duration-500 ${
              isWishlisted ? "bg-red-500 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}
