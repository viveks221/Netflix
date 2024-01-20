import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return;
  return (
    <div className="p-4, m-4, bg-black text-white">
      <div>
        {movieNames &&
          movieNames.map((movieName, index) => (
            <MovieList
              key={movieNames}
              title={movieName}
              movies={movieResults[index].results}
            />
          ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
