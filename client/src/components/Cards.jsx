import React from "react";
import { NavLink } from "react-router-dom";

export const Cards = ({ id, name, genres, image, rating }) => {
  return (
    <div>
      <NavLink to={`/home/detail/${id}`} className="linkID" />
      <h3>{name}</h3>
      <div>
        Generos:
          {genres && genres.map((e,i) => (
              <div key={i}>
                  {e}
              </div>
          ))}
          <h4>Rating: {rating}</h4>
          </div>
      <img src={image} width="105" height="105" alt='Image'/>
    </div>
  );
};
