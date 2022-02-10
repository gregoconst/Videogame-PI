import React from 'react';
import { NavLink } from 'react-router-dom';
import { SearchBar } from './SearchBar';
// import home from '../utils/home.png'
export const NavBar = () => {
  return (
    <header className="navbar">
        <div>
        <NavLink exact to="/home">
            {/* <img id="HenryVideogames" src={home} width="220" height="50" className="d-inline-block align-top" alt="" /> */}
        </NavLink>
        </div>
        <div>
            <SearchBar/>
        </div>
        <nav>
            <ul className="list">
                <li className="list-item">
                    <NavLink exact to="/home" >Home</NavLink>
                    <NavLink to="/create" >Create a Game</NavLink>
                </li>
            </ul>
        </nav>
    </header>
)
};