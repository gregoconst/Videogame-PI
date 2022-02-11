import React from "react";

const Videogame = ({ videogameDetail }) => {
  const {
    id,
    name,
    genres,
    background_image,
    description,
    released,
    rating,
    platforms,
  } = videogameDetail;
  console.log(videogameDetail);
  return (
    <div>
      <div className="videogame-general-div">
        <img src={background_image} alt="videojuego" />
        <div>{id}</div>
        <div>{name}</div>
        <div>{genres}</div>
        <div>{description}</div>
        <div>{released}</div>
        <div>{rating}</div>
        <div>{id?.length > 7 ? platforms?.map(el => el.name).join(' || ')
                    : platforms?.map(el => el.platform.name).join(' || ') }</div>
      </div>
    </div>
  );
};

export default Videogame;
