import React from 'react';
import { NavLink } from 'react-router-dom';


export const Backbutton = () => {
    return (
		<div>
			<NavLink exact to="/home" >
                <button className='btn_back' type='button'>
                    BACK
                </button>
            </NavLink>
		</div>
	);
}
