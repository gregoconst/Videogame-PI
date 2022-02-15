import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cards } from "./Cards";
import { Pages } from "./Pages";
import { Filter } from "./Filter";
import {
  setVideogamesOrder,
  setVideogamesRating,
  setVideogamesGenres,
  setVideogamesOrigin,
  getVideogameGenres,
  getVideogames,
  setLoaderTrue,
} from "./../actions/index";
import { NavBar } from "./NavBar";
import "./styles/Home.css";
import spinner from "../utils/loading.gif"
export default function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const spinnerLoader = useSelector((state) => state.spinnerLoader);
  useEffect(() => {
    dispatch(getVideogameGenres());
    dispatch(setLoaderTrue());
    dispatch(getVideogames());
  }, []);
  // useEffect(() => {
  //   dispatch(getVideogames());
  // }, [dispatch]);
  // console.log(getVideogameGenres(), "generos cargadossss");
  // console.log(getVideogames());
  ///// FILTER & ORDERS & HANDLES ///////
  const [order, setOrder] = useState("");

  const handleChangeAlf = (e) => {
    dispatch(setVideogamesOrder(e.target.value));
    setOrder(e.target.value);
  };
  const handleChangeRat = (e) => {
    dispatch(setVideogamesRating(e.target.value));
    setOrder(e.target.value);
  };

  const handleChangeGen = (e) => {
    dispatch(setVideogamesGenres(e.target.value));
    setOrder(e.target.value);
  };

  const handleChangeOrigin = (e) => {
    dispatch(setVideogamesOrigin(e.target.value));
    setOrder(e.target.value);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
}
  ///// FILTER & ORDERS ///////
  ////// PAGINADO ////////
  const [pagina, setPagina] = useState(1);
  const [juegosPorPagina, setJuegosPorPagina] = useState(15);
  const maxrender = videogames.length / juegosPorPagina;
  ////// PAGINADO ////////
  // console.log(videogames[0] ? videogames : videogames[0],"que onda");

  // let mapeo = videogames?.filter(e => e.inDB === true).map(f => f.genres.name)
  // console.log(mapeo,"holaaaaaaaaa soy mapeooo");
  if (!videogames.length) {
    return (
      <div className="loading">
        <div>
          <NavBar />
        </div>
        <div>
          <Filter
            handleChangeAlf={handleChangeAlf}
            handleChangeRat={handleChangeRat}
            handleChangeGen={handleChangeGen}
            handleChangeOrigin={handleChangeOrigin}
          />
        </div>
        <div>
          <Pages pagina={pagina} setPagina={setPagina} maxrender={maxrender} />
        </div>
        <img src={spinner} alt="...loading" className="spinnerStyle" />
      </div>
    );
  }
  return (
    <div className="home-container">
      <div className="navbar-container">
        <NavBar />
      </div>
      
      <div>
        <Filter
          handleChangeAlf={handleChangeAlf}
          handleChangeRat={handleChangeRat}
          handleChangeGen={handleChangeGen}
          handleChangeOrigin={handleChangeOrigin}
        />
      </div>
      <br />
      <div>
        <Pages pagina={pagina} setPagina={setPagina} maxrender={maxrender} />
      </div>
      <div>
        <button className="button-54" onClick={e => handleOnClick(e)}>Recargar Juegos</button>
      </div>
      <div className="card-container">
        {videogames &&
          videogames
            .slice(
              (pagina - 1) * juegosPorPagina,
              (pagina - 1) * juegosPorPagina + juegosPorPagina
            )
            .map((juego) => {
              return (
                <div className="card" key={juego.id}>
                  <Cards
                    // !videogames[0].inDB? juego.Genres.join(' - ') : videogames[0].genres.map((gen)=> (gen.name)).join(' - ')
                    key={juego.id}
                    id={juego.id}
                    name={juego.name}
                    genres={
                      juego.genres?.map((g) => (g.name)).join(' - ') || juego.Genres?.join(' - ')} //Genres es para generos de los juegos en API!!!!!!!!!
                    background_image={juego.background_image}
                    rating={juego.rating}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
}
