import React from "react";
import { Link } from "react-router-dom";
import "./catCard.scss";

const CatCard = ({ item }) => {
  return (
    <Link to={`/gigs?cat=${item.cat}`}>
      <div className="catCard">
        <img src={item.cover} alt="" />
        <span className="desc">{item.desc}</span>
        <span className="title">{item.title}</span>
      </div>
    </Link>
  );
};

export default CatCard;
