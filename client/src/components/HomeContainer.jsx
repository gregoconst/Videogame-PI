import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogameGenres, getVideogames } from "../actions";
import { Cards } from "./Cards";
import { Pages } from "./Pages";
import { Filter } from './Filter';
import { setVideogamesOrder, setVideogamesRating, setVideogamesGenres, setVideogamesOrigin } from './../actions/index';
export default function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  // const videogamesList = useSelector((state) => state.videogamesList);
  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getVideogameGenres());
  }, []);
  ///// FILTER ///////
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
  ////////////////////
 ////// PAGINADO ////////
  const [pagina, setPagina] = useState(1);
  const [juegosPorPagina, setJuegosPorPagina] = useState(15);
  const maxrender = videogames.length / juegosPorPagina;
 ////////////////////////////////
  if (!videogames.length) {
    return (
      <div>cargandooOOooOo</div>
    )
}
  return (
    <div>
      <Filter handleChangeAlf={handleChangeAlf} handleChangeRat={handleChangeRat} handleChangeGen={handleChangeGen} handleChangeOrigin={handleChangeOrigin}/>
      <Pages pagina={pagina} setPagina={setPagina} maxrender={maxrender} />
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
                  key={juego.id}
                  id={juego.id}
                  name={juego.name}
                  genres={juego.genres}
                  image={juego.img}
                  rating={juego.rating}
                />
              </Link>
            );
          })}
    </div>
  );
}

// const [numPag, setNumPag] = useState(1);
// let render;
// console.log(videogamesList, "holaaaaaaaaaaaaa");
// if (numPag * 15 > videogamesList.actual.length) {
//   render = videogamesList.todos.slice(
//     numPag * 15 - 15,
//     videogamesList.length
//   );
// } else {
//   render = videogamesList.todos.slice(numPag * 15 - 15, numPag * 15);
// }
// stateAux();
// const aux = videogamesList.todos.length / 15;
// const aux1 = Math.ceil(aux);
// console.log(render);
// if (contador <= 1) {
//   return (
//     <div>
//       <h1>cargando juegos</h1>
//       {/* imagen de carga??????????? */}
//     </div>
//   );
// } else {
//   return (
//     <div>
//       {/*aca deberia poner filtros*/}
//       {render.length ? ( //investigar por que no puedo usar if y si puedo usar ternarios
//         (console.log(videogamesList),
//         console.log(render, "chauuuuuuuuuuuuuu"),
//         (
//           <div>
//             {render.map((juego) => (
//               <Link to={`/home/detail/${juego.id}`}>
//               <Cards
//                 key={juego.id}
//                 id={juego.id}
//                 name={juego.name}
//                 genres={juego.genres}
//                 image={juego.img}
//                 rating={juego.rating}
//                 />
//                 </Link>
//             ))}
//           </div>
//         ))
//       ) : (
//         <div>
//           <h1>error?</h1>
//           {/* imagen de error¿¿¿¿¿¿¿ */}
//         </div>
//       )}
//       <div>
//         <button
//           onClick={() => {
//             numPag - 1 === 0 ? setNumPag(1) : setNumPag(numPag - 1);
//           }}
//         >
//           Anterior
//         </button>
//         <p>{numPag}</p>
//         <button
//           onClick={() => {
//             (numPag + 1) * 15 > videogamesList.todos.length
//               ? setNumPag(aux1)
//               : setNumPag(numPag + 1);
//           }}
//         >
//           Siguiente
//         </button>
//       </div>
//     </div>
//   );
// }

// return (
//   <>
//     <div>
//       <h2>soy Home</h2>
//     </div>
//     <div>
//       {/* {videogamesList.slice((Page - 1) * perPage, (Page - 1) * perPage + perPage)?.map((e) => {

//       })} */}

//     </div>
//   </>
// );

// return (
//   <Card key={e.id} name={e.name} image={e.img} genres={e.genres} />
// );
