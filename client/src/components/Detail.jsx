import React, { useEffect } from "react";
import { getVideogameDetail } from "../actions";
import { useParams } from "react-router";
import { Backbutton } from "./Backbutton";
import { useDispatch, useSelector } from "react-redux";
import { clearVideogameState } from "./../actions/index";
import "./styles/Detail.css";
import spinner from "../utils/loading.gif"

export default function Detail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const juego = useSelector((state) => state.videogamesDetail);
  // const plataformas = useSelector((state) => state.platforms)
  useEffect(() => {
    dispatch(getVideogameDetail(id));
    dispatch(clearVideogameState());
  }, [id, dispatch]);
  if (juego.length < 1) {
    return <div><img src={spinner} alt="...loading" className="spinnerStyle" /></div>;
  }
  return (
    <div className="details-container">
        <Backbutton/>
      <body>
        {
          <div className="info-details">
            <h2>
              <strong>{juego.name}</strong>
            </h2>
            <br />
            <img
              src={juego.background_image}
              alt="Img of videogames"
              style={{width: '550px', height:'330px', borderRadius:'4.3%', boxShadow: '-1.2px -1.10px 6.10px rgba(247, 243, 18, 0.897)'}} 
            />{" "}
              <br />
            <br />
            <ul>
              <h3>
                <u class="button-54">Rating:</u>
              </h3>{" "}
            <div class="button-54">
             <strong>{juego.rating}</strong> 
              </div>
            </ul>
            <ul>
              <h3>
                <u class="button-54">Platforms:</u>
              </h3>{" "}
              <div class="button-54">
             <strong>{juego.id?.length > 7
                ? juego.platforms?.map((el) => el).join(" || ")
                : juego.platforms?.map((el) => el.platform.name).join(" || ")}
              .</strong> 
              </div>
            </ul>
            <ul>
              <h3>
                <u class="button-54">Genres:</u>
              </h3>{" "}
            <div class="button-54">
             <strong>{juego.genres?.map((el) => el.name).join(", ")}.</strong> 
              </div>
            </ul>
            <ul>
              <h3>
                <u class="button-54"> <strong>Release Date:</strong></u>
              </h3>{" "}
            <div class="button-54">
             <strong>{juego.released}.</strong> 
              </div>
            </ul>
            <ul>
            <div class="button-54">
              <h3>
                <button disabled class="button-54"> <strong>Description:</strong> </button>
              </h3>
              <p id="text">
                <strong> {juego.description_raw || juego.description} </strong>
              </p>
              </div>
            </ul>
            <br />
          </div>
        }
      </body>
    </div>
  );
}
