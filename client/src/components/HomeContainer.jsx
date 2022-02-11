import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Cards } from "./Cards";
import { Pages } from "./Pages";
import { Filter } from './Filter';
import { setVideogamesOrder, setVideogamesRating, setVideogamesGenres, setVideogamesOrigin, getPlatforms, getVideogameGenres, getVideogames } from './../actions/index';
import { NavBar } from './NavBar';
export default function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  // const videogamesList = useSelector((state) => state.videogamesList);
  useEffect(() => {
    dispatch(getPlatforms());
    dispatch(getVideogameGenres());
  }, [dispatch]);
  useEffect(()=>{
    dispatch(getVideogames())
  }, [dispatch])
  console.log(getVideogameGenres(), "generos cargadossss")
  console.log(getVideogames());
  ///// FILTER & ORDERS ///////
  const [order, setOrder] = useState("")
  
  const handleChangeAlf = (e) =>{
    dispatch(setVideogamesOrder(e.target.value))
    setOrder(e.target.value)
  }
  const handleChangeRat = (e) =>{
    dispatch(setVideogamesRating(e.target.value))
    setOrder(e.target.value)
  }

  const handleChangeGen = (e) => {
    dispatch(setVideogamesGenres(e.target.value))
    setOrder(e.target.value)
  }

  const handleChangeOrigin = (e) => {
    dispatch(setVideogamesOrigin(e.target.value))
    setOrder(e.target.value)
  }
///// FILTER & ORDERS ///////
 ////// PAGINADO ////////
  const [pagina, setPagina] = useState(1);
  const [juegosPorPagina, setJuegosPorPagina] = useState(15);
  const maxrender = videogames.length / juegosPorPagina;
  ////// PAGINADO ////////
  if (!videogames.length) {
    return (
      <div>
        <div>
          <NavBar/>
        </div>
        <div>
        <Filter handleChangeAlf={handleChangeAlf} handleChangeRat={handleChangeRat} handleChangeGen={handleChangeGen} handleChangeOrigin={handleChangeOrigin}/>
        </div>
        <div>
        <Pages pagina={pagina} setPagina={setPagina} maxrender={maxrender} />
        </div>
        cargandooOOooOo
      </div>
    )
}
  return (
    <div>
      <div>
      <NavBar/>
      </div>
      <div>
      <Filter handleChangeAlf={handleChangeAlf} handleChangeRat={handleChangeRat} handleChangeGen={handleChangeGen} handleChangeOrigin={handleChangeOrigin}/>
      </div>
      <div>
      <Pages pagina={pagina} setPagina={setPagina} maxrender={maxrender} />
      </div>
      {videogames &&
        videogames
          .slice(
            (pagina - 1) * juegosPorPagina,
            (pagina - 1) * juegosPorPagina + juegosPorPagina
          )
          .map((juego) => {
            return (
              <Link to={`/home/detail/${juego.id}`}>
                <Cards
                // !videogames[0].inDB? juego.Genres.join(' - ') : videogames[0].genres.map((gen)=> (gen.name)).join(' - ')
                  key={juego.id}
                  id={juego.id}
                  name={juego.name}
                  genres={!videogames[0].inDB? juego.genres.join(' - ') : videogames[0].genres.map((gen)=> (gen.name)).join(' - ')}
                  background_image={juego.background_image}
                  rating={juego.rating}
                />
              </Link>
            );
          })}
    </div>
  );
}
