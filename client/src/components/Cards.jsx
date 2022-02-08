import React from "react";
import { NavLink } from "react-router-dom";

export const Card = ({ id, name, genres, image }) => {
  return (
    <div>
      <NavLink to={`/home/detail/${id}`} className="linkID" />
      <h3>{name}</h3>
      <div>
          {genres && genres.map((e) => (
              <div key={e.id}>
                  {e.genero}
              </div>
          ))}
          </div>
      <img src={image} width="105" height="105" alt='Image'/>
    </div>
  );
};
