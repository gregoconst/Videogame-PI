import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../actions";
import { Card } from "./Cards";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  useEffect(() => {
    dispatch(getVideogames());
  }, []);
  console.log(videogames);
  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  return (
    <>
      <div>
        <h2>soy Home</h2>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Cargar Juegos
        </button>
      </div>
      <div>
        {videogames?.map((e) => {
            return (
              <Card
                key={e.id}
                name={e.name}
                image={e.img}
                genres={e.genres}
              />
            );
          })}
      </div>
    </>
  );
}
