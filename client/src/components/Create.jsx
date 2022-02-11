import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  createVideogames,
  getPlatforms,
  getVideogameGenres,
} from "./../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Backbutton } from "./Backbutton";
// import { NavBar } from "./NavBar";
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
    img: "",
  });

  useEffect(() => {
    dispatch(getVideogameGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  const generos = useSelector((state) => state.videogamesGenres);
  const platforms = useSelector((state) => state.platforms);
  console.log(platforms);
  /////////VALIDACION///////////
  function validateErrors(input) {
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
      dataForm.rating >= parseInt("5")
    ) {
      errors.rating = "Game Rating must be from 1 to 5 points.";
    }
    return errors;
  }
  /////////VALIDACION///////////

  //////HANDLES///////
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!dataForm.background_image) {
      dataForm.background_image =
        "https://blogs.unsw.edu.au/nowideas/files/2019/08/videojuegos-agilidad.jpg";
    }
    if (
      dataForm.name &&
      dataForm.rating &&
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
        platforms: [],
        genres: [],
      });
      history("/home");
    } else alert("Debes completar los campos obligatorios");
    // const cleanGenres = dataForm.genres.reduce((prev, actual) => {
    //   if (!prev.includes(actual)) {
    //     prev.push(actual);
    //   }
    //   return prev;
    // }, []);
    // console.log(cleanGenres);
    // console.log(dataForm);
    // const cleanPlatforms = dataForm.platforms.reduce((prev, actual) => {
    //   if (!prev.includes(actual)) {
    //     prev.push(actual);
    //   }
    //   return prev;
    // }, []);
    // setdataForm({
    //   ...dataForm,
    //   genres: cleanGenres,
    //   platforms: cleanPlatforms,
    // });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setdataForm({
      genres: dataForm.genres.filter((gen) => gen !== e.target.value),
      platforms: dataForm.platforms.filter((plat) => plat !== e.target.value),
    });
  };

  const handleInput = (e) => {
    setdataForm({ ...dataForm, [e.target.name]: e.target.value });
    console.log(dataForm);

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
    setdataForm({
      ...dataForm,
      genres: [...dataForm.genres, e.target.value],
    });
  };

  // const handleCheckboxGen = (genre) => {
  //   setdataForm({ ...dataForm, genres: [...dataForm.genres, genre] });
  //   console.log(dataForm, "data form holaaa");
  // };

  // const handleCheckboxPlat = (platform) => {
  //   setdataForm({ ...dataForm, platforms: [...dataForm.platforms, platform] });
  //   console.log(dataForm, "data form holaaa");
  // };
  // const handleCheckbox = (e) => {
  //   if (e.target.checked) {
  //     setdataForm((prevState) => {
  //       return {
  //         ...prevState,
  //         genres: [...prevState.genres, e.target.value],
  //       };
  //     });
  //   }
  //   if (!e.target.checked) {
  //     dataForm.genres.splice(dataForm.genres.indexOf(e.target.value), 1);
  //     setdataForm((prevState) => {
  //       return { ...prevState };
  //     });
  //   }
  // };
  //////////////////
  let id = 0;
  function KeyGenerator() {
    return id++;
  }
  return (
    <div className="post-daleORC">
      <Backbutton />
      <form onSubmit={handleOnSubmit}>
        <div>
          <label>Name: </label>
          <input
            className="input_form"
            onChange={handleInput}
            type="text"
            name="name"
            value={dataForm.name}
          />
          {errors.name && <p className="error"> {errors.name} </p>}
        </div>
        <div>
          <label>URL Image:</label>
          <input
            onChange={handleInput}
            type="url"
            name="img"
            value={dataForm.img}
          />
        </div>
        <div>
          <label>Release Date:</label>
          <input
            onChange={handleInput}
            type="date"
            id="released"
            name="released"
            value={dataForm.released}
          />

          {errors.released && <p className="error"> {errors.released} </p>}
        </div>
        <div>
          <label>Description:</label>
          <input
            onChange={handleInput}
            type="textarea"
            name="description"
            value={dataForm.description}
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            onChange={handleInput}
            type="number"
            name="rating"
            value={dataForm.rating}
          />
          {errors.rating && <p className="error"> {errors.rating} </p>}
        </div>
        <div>
          <label>Selecciona los generos:</label>
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
        <div className="btn-genres">
          {dataForm.genres.map((gen) => (
            <div key={KeyGenerator()}>
              <button
                onClick={handleDelete}
                className="btn-destroy-genre"
                value={gen}
              >
                {gen}
              </button>
            </div>
          ))}
        </div>

        <br />

        <div>
          <label>Selecciona las plataformas:</label>
          <select onChange={handleGenreSelected} className="input-form">
            <option name="platforms" key="keyPlat">
              Select Platforms
            </option>
            {platforms &&
              platforms.map((plat) => (
                <option key={plat.id} value={plat}>
                  {plat}
                </option>
              ))}
          </select>
        </div>
        <div className="btn-genres">
          {dataForm.platforms.map((plat) => (
            <div key={KeyGenerator()}>
              <button
                onClick={handleDelete}
                className="btn-destroy-genre"
                value={plat}
              >
                {plat}
              </button>
            </div>
          ))}
        </div>

        <br />
        <button type="submit" value="create_game">
          CREAR
        </button>
      </form>
    </div>
  );
};
// return (
//   <div className='div_g'>
//     <NavBar />
//     <h2><u>Hora de cargar tu juego:</u></h2><br />
//     <form action="">
//       <div className="div_name">
//         <label>Nombre:</label>
//         <input type="text"
//         value= {dataForm.name}
//         name= "name"
//         />
//       </div>
//       <div className="div_description">
//         <label>Description:</label>
//         <input type="text"
//         value= {dataForm.description}
//         name="description"/>
//       </div>
//       <div className="div_released">
//         <label>Released:</label>
//         <input type="text"
//         value= {dataForm.rating}
//         name="released"/>
//       </div>
//       <div className="div_rating">
//         <label>Rating:</label>
//         <input type="text"
//         value= {dataForm.rating}
//         name="rating"/>
//       </div>
//       <div className="div_platforms">
//         <label>Platforms:</label>
//         <input type="text"
//         value= {dataForm.rating}
//         name="rating"/>
//       </div>
//     </form>
//   </div>
// );

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
