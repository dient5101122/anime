import React, { useState, useEffect } from 'react'
import { fetchMovieBasedName, BASE_DIR } from "./../../service/movie";

function Video() {

    const [movie, setMovie] = useState({})

    useEffect(() => {
        let url = document.URL;
        let name = url.replace("http://localhost:3000/video/", "")

        const getData = async () => {
            let res = await fetchMovieBasedName(name)
            setMovie(res.data.data[0])
        }

        getData();
    }, [])

    return (
        <center>
            <iframe width="1216" height="618" src={movie.videos} frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </center>
    )
}

export default Video;