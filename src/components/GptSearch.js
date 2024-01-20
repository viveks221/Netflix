import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { BG_IMAGE } from "../utils/constant";
const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10  ">
        <img
          className="h-screen w-screen  object-cover"
          alt="bg-img"
          src={BG_IMAGE}
        />
      </div>
      <div className="pt-[50%] md:pt-[0]">
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </>
  );
};

export default GptSearch;
