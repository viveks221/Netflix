import { useEffect } from "react";
import { API_OPTIONS, NOW_PLAYING_API } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addMovies } from "../utils/movieSlice";
const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    const data = await fetch(NOW_PLAYING_API, API_OPTIONS);
    const jsonData = await data.json();
    dispatch(addMovies(jsonData.results));
  };
  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
