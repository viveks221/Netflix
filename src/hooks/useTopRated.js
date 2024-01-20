import { useEffect } from "react";
import { API_OPTIONS, GET_TOP_RATED_MOVIE_API } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addTopRated } from "../utils/movieSlice";

const useTopRated = () => {
  const dispatch = useDispatch();
  const topRateMovies = useSelector((store) => store.movies.topRated);
  const getTopRatedMovies = async () => {
    const data = await fetch(GET_TOP_RATED_MOVIE_API, API_OPTIONS);
    const jsonData = await data.json();
    dispatch(addTopRated(jsonData.results));
  };
  useEffect(() => {
    if (!topRateMovies) getTopRatedMovies();
  }, []);
};

export default useTopRated;
