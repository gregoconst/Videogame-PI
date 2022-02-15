import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/Cards.css";
export const Cards = ({ id, name, genres, background_image, rating }) => {
  return (
    <div className={'card'}>
    <div className={'cover'}>
      <img src={background_image} alt="Pokemons" />
      <div className={'img__back'}></div>
    </div>
    <div className={'description'}>
      <h2>{name} </h2>
      <br />
      <div className={'description'}>
        {genres}
      </div>
      <br />
      <div className={'description'}>
       Rating: &nbsp; {rating}
      </div>
      <NavLink to={`/home/detail/${id}`}>
        <button className="button-54" >Details</button>
      </NavLink>
    </div>
  </div>
  );
};
