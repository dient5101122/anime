import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovie } from "../../redux/actions/movie";

import CardSlider from "./../../components/CardSlider";
import Section1 from "./../../components/Home-Page/Section1";
import { fetchAllMovie, fetchMovie_Ordering } from "./../../service/movie";

import Typography from "./../../components/Typography";
import "./style.css";

import theme from "./../../common/theme";

const themeGlobal = localStorage.getItem("theme");
const themeSelected =
  themeGlobal === "light" ? theme.lightTheme : theme.darkTheme;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [ordering, setOrdering] = useState([]);

  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movie.movie);

  useEffect(() => {
    const getMovieFromApi = async () => {
      let res = await fetchAllMovie();
      setMovies(res.data.results);
      dispatch(getAllMovie(res.data.results));
    };

    const getMovieOrderingFromApi = async () => {
      let res = await fetchMovie_Ordering(true);
      setOrdering(res.data.results);
    };
    getMovieFromApi();
    getMovieOrderingFromApi();
  }, []);

  return (
    <>
      <Section1 />

      <div className="movie-section" id="movie-section-1">
        <div className="movie-title">
          <Typography
            variant="h3"
            color={themeSelected.color}
            content="Tất Cả Phim"
          />
        </div>
        <CardSlider content={movies} />
      </div>

      <div className="movie-section" id="movie-section-2">
        <div className="movie-title">
          <Typography
            variant="h3"
            color={themeSelected.color}
            content="Những Phim Mới Ra Mắt"
          />
        </div>
        <CardSlider content={ordering} />
      </div>
    </>
  );
}
