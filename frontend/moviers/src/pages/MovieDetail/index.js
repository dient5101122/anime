import React, { useState, useEffect } from 'react'

import { useParams } from "react-router-dom";
import { Grid, Container, Chip } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import Typography from "./../../components/Typography";
import CardSlider1 from "./../../components/CardSlider1";

import Button from "./../../components/Button";
import Video from "./../Video/index";

import useStyles from "./style";
import { fetchMovieDetail, fetchAllMovieBasedCF, fetchMovieBySearch, BASE_DIR } from "./../../service/movie";

import theme from "./../../common/theme";

const themeGlobal = localStorage.getItem("theme");
const themeSelected = themeGlobal === "light" ? theme.lightTheme : theme.darkTheme;

function MovieDetail() {
    const classes = useStyles();
    const [movie, setMovie] = useState({});
    // const [movieCF, setMovieCF] = useState([]);
    const [movieCF, setMovieCF] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            // let checkID = Number(id)

            let res = await fetchMovieBySearch(id);
            setMovie(res.data.results[0]);

            // if (Number.isFinite(checkID) === true) {
            //     res = await fetchMovieBySearch(id);
            //     console.log("Success")
            //     setMovie(res.data);
            // }
            // else {
            //     res = await fetchMovieBySearch(id)
            //     console.log("Fail")
            //     console.log("res: ", res.data.results[0])
            //     setMovie(res.data.results[0]);
            // }
        }
        getData();
    }, [])


    useEffect(() => {
        // Get data based on CF
        let url = BASE_DIR + '/movies/?search=' + id
        fetch(url)
            .then(res => res.json())
            .then(async (res) => {
                let anime_name = res.results[0].name
                let resCF = await fetchAllMovieBasedCF(anime_name)
                setMovieCF(resCF.data.data);
            })
    }, [])


    const passVideo = () => {
        window.location = "http://localhost:3000/video/" + movie.name
    }

    const renderCardSlider = () => {
        return (
            <div className="movie-section" id="movie-section-1">
                <div className="movie-title">
                    <Typography variant="h3" color={themeSelected.color} content="Phim Đề Xuất Cho Bạn" />
                </div>
                <CardSlider1 content={movieCF} />
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ height: "100%" }}
            >
                <Container style={{ display: "flex" }}>
                    <Grid item xs={12} lg={7}>
                        <div className={classes.sectionImage}>
                            <img src={movie.image} className={classes.image} />
                            <div onClick={passVideo}>
                                <Button content="XEM PHIM" />
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={12} lg={5}>
                        <div>
                            <Typography content={movie.name} variant="h2" color={themeSelected.color} />

                            <div className={classes.movie_content}>
                                <p style={{ width: "16%" }}>Thể loại: </p>
                                <Chip label={movie.genre} color="secondary" />
                            </div>

                            <div className={classes.movie_content}>
                                <p style={{ width: "20%" }}>Loại: </p>
                                <Typography content={movie.type} variant="subtitle1" color={themeSelected.color} />
                            </div>

                            <div className={classes.movie_content}>
                                <p style={{ width: "20%" }}>Số tập: </p>
                                <Typography content={movie.episodes} variant="subtitle1" color={themeSelected.color} />
                            </div>

                            <div className={classes.movie_content}>
                                <p style={{ width: "16%" }}>Đánh giá: </p>

                                <Rating name="read-only" value={`${movie.rating}`} max={10} readOnly />
                            </div>
                        </div>
                    </Grid>

                </Container>
            </Grid>

            {/* <div className="movie-section" id="movie-section-1">
                <div className="movie-title">
                    <Typography variant="h3" color={themeSelected.color} content="Phim Đề Xuất Cho Bạn" />
                </div>
                <CardSlider content={movieCF.data} />
            </div> */}

            {renderCardSlider()}
        </div>
    )
}

export default MovieDetail;