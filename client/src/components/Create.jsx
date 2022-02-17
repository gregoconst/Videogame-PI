import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  createVideogames,
  getVideogameGenres,
  clearVideogameState,
  getPlatforms
} from "./../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./styles/Create.css";
import { NavBar } from "./NavBar";
export const Create = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [errors, setErrors] = useState({});
  const [dataForm, setdataForm] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
    background_image: "",
  });

  useEffect(() => {
    dispatch(clearVideogameState())
    dispatch(getVideogameGenres());
    dispatch(getPlatforms())
  }, [dispatch]);

  const generos = useSelector((state) => state.videogamesGenres);
  const platforms = useSelector((state) => state.platforms)
  /////////VALIDACION///////////
  function validateErrors(dataForm) {
    let errors = {};
    if (!dataForm.name) {
      errors.name = "Each game must have a Name!";
    } else if (!dataForm.description) {
      errors.description = "Description must be present...";
    } else if (!dataForm.released) {
      errors.released = "Game must have a release date";
    } else if (
      !dataForm.rating ||
      dataForm.rating === parseInt("0") ||
      dataForm.rating === "" ||
      dataForm.rating < parseInt("1") ||
      dataForm.rating > parseInt("5")
    ) {
      errors.rating = "Game Rating must be from 1 to 5 points.";
    }
    return errors;
  }
  /////////VALIDACION///////////

  //////HANDLES///////
  function handleDelete(e) {
    e.preventDefault();
    setdataForm({
      ...dataForm,
      genres: dataForm.genres.filter((gen) => gen !== e.target.value),
      platforms: dataForm.platforms.filter((plat) => plat !== e.target.value),
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!dataForm.background_image) {
      dataForm.background_image =
        "https://blogs.unsw.edu.au/nowideas/files/2019/08/videojuegos-agilidad.jpg";
    }
    if (
      dataForm.name &&
      dataForm.rating <= 5 &&
      dataForm.released &&
      dataForm.description &&
      dataForm.genres &&
      dataForm.platforms
    ) {
      dispatch(createVideogames(dataForm));
      alert("Videojuego creado");
      setdataForm({
        name: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
      });
      history("/home");
    } else alert("Game must have a name, rating < 5, release date, description, genres and platforms");
  };

  

  const handleInput = (e) => {
    setdataForm({ ...dataForm, [e.target.name]: e.target.value });

    setErrors(
      //valido los datos de los input
      validateErrors({
        ...dataForm,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handlePlatformSelected = (e) => {
    e.preventDefault();
    setdataForm({
      ...dataForm,
      platforms: [...dataForm.platforms, e.target.value],
    });
  };

  const handleGenreSelected = (e) => {
    e.preventDefault();
    if (!dataForm.genres.includes(e.target.value)) {
      setdataForm({
        ...dataForm,
        genres: [...dataForm.genres, e.target.value],
      });
    }
  };

  //////////////////
  let id = 0;
  function KeyGenerator() {
    return id++;
  }
  return (
    <div className="gameover">
    <NavBar />
    <br />
    <br />
    <br />
    <div className="post-daleORC">
      <form onSubmit={handleOnSubmit}>
        <div>
          <label className="button-54">Name:</label>&nbsp;&nbsp;
          <input
            className="input_form"
            onChange={handleInput}
            type="text"
            name="name"
            value={dataForm.name}
          />
          {errors.name && <p className="error"> {errors.name} </p>}
        </div>
        <br />
        <div>
          <label className="button-54">URL Image:</label>&nbsp;&nbsp;
          <input
            onChange={handleInput}
            type="url"
            name="img"
            value={dataForm.background_image}
          />
        </div>
        <br />
        <div>
          <label className="button-54">Release Date:</label>&nbsp;&nbsp;
          <input
            onChange={handleInput}
            type="date"
            id="released"
            name="released"
            value={dataForm.released}
          />

          {errors.released && <p className="error"> {errors.released} </p>}
        </div>
        <br />
        <div>
          <label className="button-54">Description:</label>&nbsp;&nbsp;
          <input
            onChange={handleInput}
            type="textarea"
            name="description"
            value={dataForm.description}
          />
        </div>
        <br />
        <div>
          <label className="button-54">Rating:</label>&nbsp;&nbsp;
          <input
            onChange={handleInput}
            type="number"
            name="rating"
            value={dataForm.rating}
          />
          {errors.rating && <p className="error"> {errors.rating} </p>}
        </div>
        <br />
        <div>
          <label className="button-54">Genres</label>&nbsp;&nbsp;
          <select onChange={handleGenreSelected} className="input-form">
            <option name="genres" key="keyGen">
              Select Genres
            </option>
            {generos &&
              generos.map((gen) => (
                <option key={gen.id} value={gen.name}>
                  {gen.name}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div className="btn-genres">
          {dataForm.genres.map((gen) => (
            <div key={KeyGenerator()}>
              <button
                className="button-54"
                value={gen}
                onClick={handleDelete}
              >
                {gen}
              </button>
            </div>
          ))}
        </div>

        <br />

        <div>
          <label className="button-54">Platforms</label>&nbsp;&nbsp;
          <select onChange={handlePlatformSelected} className="input-form">
            <option name="platforms" key="keyPlat">
              Select Platforms
            </option>
            {platforms &&
              platforms.map(plat => (
                <option key={plat} value={plat}>
                  {plat}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div className="btn-genres">
          {dataForm.platforms.map((plat) => (
            <div key={KeyGenerator()}>
              <button
                className="button-54"
                value={plat}
                onClick={handleDelete}
              >
                {plat}
              </button>
            </div>
          ))}
        </div>

        <br />
        <button className="button-54" type="submit" value="create_game">
          CREAR
        </button>
      </form>
    </div>
    </div>
  );
};
