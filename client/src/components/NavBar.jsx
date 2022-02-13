import React from 'react';
import { NavLink } from 'react-router-dom';
import { SearchBar } from './SearchBar';
// import home from '../utils/home.png'
export const NavBar = () => {
  return (
    <header className="navbar">
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