import { useEffect } from "react";
import { API_OPTIONS, GET_POPULAR_MOVIE_API } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularmovies = useSelector((store) => store.movies.popularMovies);
  const getPopularMovies = async () => {
    const data = await fetch(GET_POPULAR_MOVIE_API, API_OPTIONS);
    const jsonData = await data.json();
    dispatch(addPopularMovies(jsonData.results));
  };
  useEffect(() => {
    if (!popularmovies) getPopularMovies();
  }, []);
};

export default usePopularMovies;
