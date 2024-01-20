import React, { useRef } from "react";
import { lang } from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { useNavigate } from "react-router-dom";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const languageKey = useSelector((store) => store.config.lang);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchText = useRef(null);
  // const dummyMovie = "Gadar, Sholay, Don, Golmaal, Koi Mil Gaya".split(",");
  // console.log(dummyMovie);

  const searchMovieTmdb = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json;
  };

  const handleGptSearchClick = async () => {
    try {
      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query : " +
        searchText.current.value +
        ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });
      const gptResultsArr =
        gptResults?.choices?.[0]?.message.content.split(",");
      const promiseArray = gptResultsArr.map((movie) => searchMovieTmdb(movie));
      const tmdbResults = await Promise.all(promiseArray);
      dispatch(
        addGptMovieResult({
          movieNames: gptResultsArr,
          movieResults: tmdbResults,
        })
      );
    } catch (e) {
      throw e;
    }
  };

  return (
    <div
      className=" pt-[30%] md:pt-[10%] flex justify-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <form className=" md:w-1/2 w-full bg-black grid grid-cols-12">
        <input
          ref={searchText}
          className="p-4 m-4 col-span-9"
          type="text"
          placeholder={lang[languageKey]?.gptSearchPlaceHolder}
        />

        <button
          className="py-2  w-9/12 m-4 col-span-3 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {" "}
          {lang[languageKey]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
