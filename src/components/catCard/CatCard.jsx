import React from "react";
import { Link } from "react-router-dom";
import "./catCard.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const currentUser = getCurrentUser();

const CatCard = ({ item }) => {
  return currentUser ? (
    <Link to={`/gigs?cat=${item.cat}`}>
      <div className="catCard">
        {item.cover ? (
          <img src={item.cover} alt="" />
        ) : (
          <Skeleton height={111} />
        )}
        {item.desc ? (
          <span className="desc">{item.desc}</span>
        ) : (
          <Skeleton height={111} />
        )}
        {item.title ? (
          <span className="title">{item.title}</span>
        ) : (
          <Skeleton height={111} />
        )}
      </div>
    </Link>
  ) : (
    <button style={{ border: "none " }} onClick={() => alert("please login")}>
      <div className="catCard">
        {item.cover ? (
          <img src={item.cover} alt="" />
        ) : (
          <Skeleton height={111} />
        )}
        {item.desc ? (
          <span className="desc">{item.desc}</span>
        ) : (
          <Skeleton height={111} />
        )}
        {item.title ? (
          <span className="title">{item.title}</span>
        ) : (
          <Skeleton height={111} />
        )}
      </div>
    </button>
  );
};

export default CatCard;
