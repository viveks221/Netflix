import React from "react";
import { IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return;
  return (
    <div className="w-36 md:w-48 pr-5 ">
      <img
        className="rounded-lg"
        alt="movie Card"
        src={IMG_CDN_URL + posterPath}
      ></img>
    </div>
  );
};

export default MovieCard;
