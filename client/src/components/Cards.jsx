import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/Cards.css";
export const Cards = ({ id, name, genres, background_image, rating }) => {
  // console.log(genres);
  return (
    <div className={'card'}>
    <div className={'cover'}>
      <img src={background_image} alt="Pokemons" />
      <div className={'img__back'}></div>
    </div>
    <div className={'description'}>
      <h2>{name} </h2>
      <br />
      <div className={'description'}>
        {genres}
      </div>
      <br />
      <div className={'description'}>
       Rating: &nbsp; {rating}
      </div>
      <NavLink to={`/home/detail/${id}`}>
        <button className="button-54" >Details</button>
      </NavLink>
    </div>
  </div>
  );
};

    // <div className="card-container">
    //   <div key={id} className='card'>
    //     <img className='vg-img' src={background_image} width="200px" height="125px" alt='background' />
    //     <NavLink to={`/home/detail/${id}`} className="linkID" />
    //     <h3 className="card-name">{name}</h3>
    //     <div className="genres-info">
    //       Generos: &nbsp;
    //       {genres}
    //       <div className="rating-info">
    //         <label style={{ justifySelf: 'center', position: 'static', paddingBottom: '6px', paddingTop: '4px', margin: '1%' }}><u>Rating:</u></label>
    //         <h4>{rating}</h4>
    //       </div>
    //     </div>
    //   </div>
    // </div>



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
