import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/Cards.css";
export const Cards = ({ id, name, genres, background_image, rating }) => {
  console.log(genres);
  return (
    <div className="card-container">
      <div key={id} className='card'>
      <NavLink to={`/home/detail/${id}`} className="linkID" />
      <h3 className="card-name">{name}</h3>
      <div className="genres-info">
        Generos: &nbsp;
          {genres}
          <div className="rating-info">
        <label style={{justifySelf:'center', position:'static', paddingBottom:'6px', paddingTop:'4px', margin:'1%'}}><u>Rating:</u></label>
        <h4>{rating}</h4>
    </div>
          </div>
      <img className='vg-img' src={background_image} width="200px" height="125px" alt='background'/>
      </div>
    </div>
  );
};

{/* <div className="card-container">
<div key={id}   className="card">
    <h3 className="card-name">{name}</h3>
    <div className="genres-info">
        <label style={{paddingBottom:'5px',margin:'1%'}}><u>Genres:</u></label>
        <h5 style={{paddingBottom:'5px',}}>{ genres }</h5>
    </div>
    <img className='vg-img' src={background_image} alt="img not found" width='200px' height='125px' />
    <div className="rating-info">
        <label style={{justifySelf:'center', position:'static', paddingBottom:'6px', paddingTop:'4px', margin:'1%'}}><u>Rating:</u></label>
        <h4>{rating}</h4>
    </div>
</div>
</div> */}
