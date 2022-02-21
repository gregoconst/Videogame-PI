import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/Cards.css";
export const Cards = ({ id, name, genres, background_image, rating }) => {
  return (
    <div className={'card'} key="general">
    <div className={'cover'} key="img1">
      <img src={background_image} alt="Videogames" />
      <div className={'img__back'} key="img2"></div>
    </div>
    <div className={'description'} key="name">
      <h2>{name} </h2>
      <br />
      <div key="genres">
        {genres}
      </div>
      <br />
      <div className="button-54" key="rating">
       Rating: {rating}
      </div>
      <NavLink to={`/home/detail/${id}`}>
        <button className="button-54" >Details</button>
      </NavLink>
    </div>
  </div>
  );
};
