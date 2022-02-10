import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { createVideogames, getVideogameGenres } from "./../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Backbutton } from "./Backbutton";
import { NavBar } from './NavBar';

export const Create = () => {
  const dispatch = useDispatch();
  const generos = useSelector((state) => state.videogamesGenres);
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [], //puede ser 1????
    img: "",
  });

/////////VALIDACION///////////
  function validateErrors(input) {
    // var validIMG = /^(ftp|http|https):\/\/[^ "]+$/.test(input.image);    || !validIMG
    let errors = {};

    if (!input.name) {
      errors.name = "Each game must have a Name!";
    } else if (!input.background_image) {
      errors.background_image = "Image must have a valid Link.";
    } else if (!input.description || input.lenght > 3) {
      errors.description = "Description must be present...";
    } else if (!input.released) {
      errors.released = "Game must have a release date";
    } else if (
      !input.rating ||
      input.rating === 0 ||
      input.rating === "" ||
      input.rating < 1 ||
      input.rating >= 5
    ) {
      errors.rating = "Game Rating must be from 1 to 5 points.";
    }
    return errors;
  }
/////////VALIDACION///////////
//////HANDLES///////
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
  }

  const handleSelect = (e) => {
    setInput({
      ...input,
      generos:[...input.generos, e.target.value]
    })
  }
//////////////////
  return (
    <div className='div_g'>
      <NavBar />
      <h2><u>Hora de cargar tu juego:</u></h2><br />
      <form action="">
        <div className="div_name">
          <label>Nombre:</label>
          <input type="text"
          value= {input.name}
          name= "name" 
          />
        </div>
        <div className="div_description">
          <label>Description:</label>
          <input type="text" 
          value= {input.description}
          name="description"/>
        </div>
        <div className="div_released">
          <label>Released:</label>
          <input type="text"
          value= {input.rating}
          name="released"/>
        </div>
        <div className="div_rating">
          <label>Rating:</label>
          <input type="text"  
          value= {input.rating}
          name="rating"/>
        </div>
        <div className="div_platforms">
          <label>Platforms:</label>
          <input type="text"  
          value= {input.rating}
          name="rating"/>
        </div>
      </form>
    </div>
  );
};

// export const Create = () => {
//   const [data, setData] = {
//     name: "",
//     description: "",
//     released: "",
//     rating: "",
//     platforms: [],
//     genres: [],
//     img: "",
//   };
//   useEffect(() => {
//     dispatch(getVideogameGenres());
//   }, []);
//   return <div>holaaaaaaaaaaaaa</div>;
// };
