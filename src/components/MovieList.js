import MovieCard from "./MovieCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const MovieList = ({ title, movies }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7.5, // Set the number of visible slides
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.85,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.9,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.9,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="px-6 md:mt-0  ">
      <h1 className="text-lg  md:text-3xl py-4 text-white">{title}</h1>
      <Slider {...settings}>
        {movies?.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </Slider>
    </div>
  );
};
export default MovieList;
