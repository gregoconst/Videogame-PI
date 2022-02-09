import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setVideogamesOrder,
  setVideogamesOrigin,
  setVideogamesGenres,
} from "./../actions/index";

export const Filter = ({handleChangeAlf, handleChangeRat, handleChangeGen, handleChangeOrigin}) => {
  const dispatch = useDispatch();
  const videogamesGenres = useSelector((state) => state.videogamesGenres);
  return (
    <div className="div_filters">
      <label className="label_fil">Filters & Orders</label>
      <select onChange={(e)=>{handleChangeAlf(e)}} name="Orden alfabético">
        <option value="All">Orden alfabético</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select onChange={(e)=>{handleChangeGen(e)}} name="Generos">
        <option value="All">Genero</option>
        {videogamesGenres &&
          videogamesGenres.map((t, i) => (
            <option key={i} value={t.name}>
              {t.name}
            </option>
          ))}
      </select>
      <select onChange={(e)=>{handleChangeOrigin(e)}} name="Origin">
        <option value="All">Origen</option>
        <option value="RawgAPI">RawgAPI</option>
        <option value="VideogamesDB">VideogamesDB</option>
      </select>
      <select onChange={(e)=>{handleChangeRat(e)}} name="Rating">
        <option value="All">Rating</option>
        <option value="top">Mayor</option>
        <option value="low">Menor</option>
      </select>
    </div>
  );
};
// return <div>
//     <select name="order">
//       <option value="all">Orden alfabético</option>
//       <option value="asc">A-Z</option>
//       <option value="desc">Z-A</option>
//     </select>
//     <select name="">
//       <option value=""></option>
//     </select>
// </div>;
