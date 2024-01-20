import { useEffect } from "react";
import { API_OPTIONS, GET_UPCOMING_MOVIE_API } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUpcoming } from "../utils/movieSlice";

const useUpcoming = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcoming);
  const getUpcoming = async () => {
    const data = await fetch(GET_UPCOMING_MOVIE_API, API_OPTIONS);
    const jsonData = await data.json();
    dispatch(addUpcoming(jsonData.results));
  };
  useEffect(() => {
    if (!upcomingMovies) getUpcoming();
  }, []);
};

export default useUpcoming;
