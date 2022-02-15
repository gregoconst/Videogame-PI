import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import joystick from '../utils/button.png'
import "./styles/NavBar.css";
export const NavBar = () => {
  return (
    <header className="navbar">
        <div>
        <Link to="/">
                <img id="videogameslogo" src={joystick} width="50" height="50" className="d-inline-block align-top" alt="" />
            </Link>
        </div>
        <div>
            <SearchBar/>
        </div>
        <nav>
            <ul className="list">
                <li className="list-item">
                    <Link to="/home" >
                        <button className='button-54'>Home</button> 
                    </Link>
                    <Link to="/create" >
                        <button className='button-54'>Create a game</button>
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
)
};