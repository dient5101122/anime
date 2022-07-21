import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home/index.js";
import About from "../../pages/About/index.js";
import MovieDetail from "../../pages/MovieDetail/index";
import Video from "../../pages/Video/index";
export default function Body() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/video/:id" element={<Video />} />
            </Routes>
        </div>
    )
}
