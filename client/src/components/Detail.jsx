import React, { useEffect, useState } from "react";
import { getVideogameDetail } from "../actions";
import { useParams } from "react-router";
import { Backbutton } from "./Backbutton";
import { useDispatch, useSelector } from "react-redux";
import { clearVideogameDetail } from "./../actions/index";
import { axios } from 'axios';
export default function Detail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  // const [juego, setJuego] = useState(null);
  const juego = useSelector((state) => state.videogamesDetail);
  const plataformas = useSelector((state) => state.platforms)
  useEffect(() => {
    dispatch(getVideogameDetail(id));
    return () => clearVideogameDetail();
  }, []); //el juego se crea sin platforms
//   useEffect(() => {
//     axios.get(`http://localhost:3001/videogames/${id}`)
//         .then((responseBack) => {
//           setJuego(responseBack.data)
//         })

//         return() => {
//           setJuego(null)   // CleanUp
//         }
// }, [id]);
console.log(juego,"a ver que onda");
  if (juego.length < 1) {
    return <div>cargandooOOoo</div>;
  }
  // console.log(juego?.find(e => e.inDB),"soy estado de plataformassss")
  return (
    <div className="details-container">
        <Backbutton/>
      <body>
        {
          <div className="info-details">
            <h2>
              <u>{juego.name}:</u>
            </h2>
            <br />
            <img
              src={juego.background_image}
              alt="Img of videogames"
              
            />{" "}
            <br />
            <ul>
              <h3>
                <u>Rating:</u>
              </h3>{" "}
              {juego.rating}{" "}
            </ul>
            <ul>
              <h3>
                <u>Platforms:</u>
              </h3>{" "}
              {juego.id?.length > 7
                ? juego.platforms?.map((el) => el).join(" || ")
                : juego.platforms?.map((el) => el.platform.name).join(" || ")}
              .
            </ul>
            <ul>
              <h3>
                <u>Genres:</u>
              </h3>{" "}
              {juego.genres?.map((el) => el.name).join(", ")}.
            </ul>
            <ul>
              <h3>
                <u>Release Date:</u>
              </h3>{" "}
              {juego.released}.
            </ul>
            <ul>
              <h3>
                <u>Description:</u>
              </h3>
              <p id="text">
                <strong> {juego.description_raw || juego.description} </strong>
              </p>
            </ul>
            <br />
          </div>
        }
      </body>
    </div>
  );
}
