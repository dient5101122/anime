import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";

export default function Card1({ ...props }) {

  const movie = props.movie;
  return (
    <Link key={movie.id} to={`movie/${movie.anime_id}`} style={{ textDecoration: 'none', color: "#2B3445" }}>
      <Card id="Card">
        <Card.Img variant="top" src={movie.image} id="img" />
        <Card.Body>
          {/* <Card.Title>{movie.name}</Card.Title> */}
          <h6 id="title">{movie.name}</h6>
        </Card.Body>
      </Card>
    </Link>
  );
}
