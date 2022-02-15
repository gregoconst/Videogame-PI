import React from 'react';
import { NavLink } from 'react-router-dom';


export const Backbutton = () => {
    return (
		<div>
			<NavLink to="/home" >
                <button class="button-54" type='button'>
                    BACK
                </button>
            </NavLink>
		</div>
	);
}
