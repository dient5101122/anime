import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";

export default function Card1({ ...props }) {

  const movie = props.movie;

  const redirect = () => {
    window.location = "http://localhost:3000/movie/" + movie.anime_id
  }

  return (
    <div onClick={redirect} style={{ color: "#2B3445" }}>
      <Card id="Card">
        <Card.Img variant="top" src={movie.image} id="img" />
        <Card.Body>
          {/* <Card.Title>{movie.name}</Card.Title> */}
          <h6 id="title">{movie.name}</h6>
        </Card.Body>
      </Card>
    </div>
  );
}
