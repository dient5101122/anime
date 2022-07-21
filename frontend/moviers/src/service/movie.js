import axios from "axios";

export const BASE_DIR = "http://127.0.0.1:8000"

export const fetchAllMovie = async () => {
    const path = "/movies/";
    const url = BASE_DIR + path;
    let res = await axios.get(url);
    return res;
};

export const fetchAllMovieBasedCF = async (name) => {
    const path = "/cf-algorithm/" + name;
    const url = BASE_DIR + path;
    let res = await axios.get(url);
    return res;
};

export const fetchMovieBasedName = async (name) => {
    const path = "/get-anime/" + name;
    const url = BASE_DIR + path;
    let res = await axios.get(url);
    return res;
};

export const fetchMovieDetail = async (id) => {
    const path = "/movies/" + id;
    const url = BASE_DIR + path;
    let res = await axios.get(url);
    return res;
}

export const fetchMovieBySearch = async (id) => {
    const path = "/movies/?search=" + id;
    const url = BASE_DIR + path;
    let res = await axios.get(url);
    return res;
}

export const fetchMovie_Ordering = async (ordering = false) => {
    let path = "/movies/?ordering=id";
    if (ordering === true) {
        path = "/movies/?ordering=-id";
    }
    const url = BASE_DIR + path;
    let res = await axios.get(url);
    return res;
};

export const fetchMovieDidSearch = async (name) => {
    const path = "/movies/?search=" + name;
    const url = BASE_DIR + path;
    let res = await axios.get(url);
    return res;
}

export const fetchAllMovieDes = async () => {
    const path = "/movie-des/";
    const url = BASE_DIR + path;
    let res = await axios.get(url);
    return res;
};