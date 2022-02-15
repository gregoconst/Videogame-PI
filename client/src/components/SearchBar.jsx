import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getVideogameSearchName } from '../actions';
import "./styles/SearchBar.css";
export const SearchBar = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState("")

  const handleInput = (e) =>{
    e.preventDefault()
    setName(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.length !== 0)
    dispatch(getVideogameSearchName(name))
    setName('');
  }
  return <div>
      <input onChange={(e)=>{handleInput(e)}} type="text" 
      placeholder='Buscar juegos'
      />
      &nbsp;
      <button className="button-54" onClick={(e)=>{handleSubmit(e)}} type='submit'>Buscar</button>
  </div>;
};
