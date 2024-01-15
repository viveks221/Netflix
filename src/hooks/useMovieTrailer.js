import { API_OPTIONS } from "../utils/constant";
import { addTrailerVideo } from "../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const jsonData = await data.json();
    const filterData = jsonData.results?.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filterData?.length ? filterData[0] : jsonData[0];
    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, []);
};

export default useMovieTrailer;
