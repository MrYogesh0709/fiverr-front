import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./featured.scss";

const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (!input) {
      navigate("/");
    } else {
      navigate(`/gigs?search=${input}`);
    }
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <i>freelancer</i> for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="search" />
              <input
                type="text"
                placeholder="try building yourself"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>

        <div className="right">
          <img src="./img/man.png" alt="man" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
