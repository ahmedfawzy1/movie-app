import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../types/Movie";

const Card = React.memo(({ movies }: { movies: Movie[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <Link key={movie.id} to={`/movie/${movie.id}`} className="min-w-[155px] md:min-w-[170px] lg:min-w-[180px] flex flex-col">
          <div className="w-full h-auto md:h-[250px] lg:h-[300px] mb-3 rounded-2xl">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path || movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-[220px] md:h-[250px] lg:h-[300px] object-center object-cover rounded-2xl cursor-pointer shadow-lg"
            />
          </div>
          <h2 className="text-sm md:text-base truncate text-slate-900 mb-1 sm:mb-2">{movie.title}</h2>
          <div className="flex justify-between items-center">
            <p className="text-xs md:text-sm text-slate-500">{movie.release_date.split("-")[0]}</p>
            <div className="flex items-center gap-1">
              <img src="/icon/star.svg" alt="star" className="w-4 h-4" />
              <p className="text-xs md:text-sm text-slate-500">{movie.vote_average.toFixed(1)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
});

export default Card;
