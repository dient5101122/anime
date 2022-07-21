import React, { useState, useEffect } from 'react';
import Navbar from './../../Navbar';
import Grid from '@material-ui/core/Grid';
import Typography from "./../../Typography";
import Container from 'react-bootstrap/Container';
import useStyles from "./style";

import theme from "./../../../common/theme";
import Button from "./../../Button";
import Carousel from 'react-bootstrap/Carousel';

import { fetchAllMovie, fetchAllMovieDes } from "./../../../service/movie";
import { Link } from "react-router-dom";

const themeGlobal = localStorage.getItem("theme");
const themeSelected = themeGlobal === "light" ? theme.lightTheme : theme.darkTheme;

function Section1() {
    const classes = useStyles();

    const [movies, setMovies] = useState([]);

    

    useEffect(async () => {
        let movie = await fetchAllMovie();
        let description = await fetchAllMovieDes();
        setMovies(movie.data.results);

        let data = [
            {
                id: 0,
                name: "",
                image: "",
                description: "",
                anime_id: "",
            }
        ];
        let obj = {
            id: 0,
            name: "",
            image: "",
            description: "",
            anime_id: "",
        };
        const lengthOfMovie = movie.data.results.length;
        for (let i = 0; i < lengthOfMovie; i++) {
            if (movie.data.results[i].id === description.data.results[i].movie) {

                data.push({
                    id: movie.data.results[i].id,
                    name: movie.data.results[i].name,
                    image: movie.data.results[i].image,
                    description: description.data.results[i].description,
                    anime_id: movie.data.results[i].anime_id,
                });
            }
        }

        data = data.splice(1, data.length);
        setMovies(data);

    }, [])


    return (
        <div className={classes.root} >
            {/* <Navbar /> */}

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ height: "100%" }}
            >
                <Carousel variant={themeGlobal === "light" ? "dark" : "light"} style={{ paddingBottom: "50px" }} prevIcon={false} nextIcon={false}>

                    {movies.slice(0, 5).map((movie) => {
                        return (
                            <Carousel.Item interval={1000} key={movie.id}>
                                <Link to={`movie/${movie.anime_id}`} style={{ textDecoration: 'none', color: "#2B3445" }}>
                                <Container style={{ display: "flex" }}>
                                    <Grid item xs={12} lg={7}>
                                        <div>
                                            <Typography content={movie.name} variant="h2" color={themeSelected.color} />
                                            <div className={classes.description}>
                                                <Typography content={movie.description} variant="caption" color={themeSelected.color} />
                                            </div>
                                                <Button content="XEM CHI TIẾT" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={5}>
                                        <div className={classes.sectionImage}>
                                            <img src={movie.image} className={classes.image} />
                                        </div>
                                    </Grid>
                                </Container>
                                </Link>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </Grid>


        </div>

    )
}

export default Section1