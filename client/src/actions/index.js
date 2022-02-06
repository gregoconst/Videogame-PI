import axios from "axios";

import { VIDEOGAMES, GENRES, VIDEOGAMES_NAME } from "../utils/backroutes.js";

export const getVideogames = () => async (dispatch) => {
  try {
    const resp = await axios.get(VIDEOGAMES);
   return dispatch({ type: "GET_VIDEOGAMES", payload: resp.data });
  } catch (error) {
    console.log(error);
  }
};

export const getGameGenres = () => async (dispatch) => {
    try {
      const resp = await axios.get(GENRES);
     return dispatch({ type: "GET_GENRES", payload: resp.data });
    } catch (error) {
      console.log(error);
    }
  };

  export const getVideogameDetail = (id) => async (dispatch) => {
    try {
      const resp = await axios.get(`${VIDEOGAMES}/${id}`);
     return dispatch({ type: "GET_VIDEOGAMES_DETAIL", payload: resp.data });
    } catch (error) {
      console.log(error);
      dispatch({type: 'GET_VIDEOGAMES_DETAIL', payload: []});
    }
  };

  export const getVideogameSearchName = (name) => async (dispatch) => {
    try {
      const resp = await axios.get(`${VIDEOGAMES_NAME}${name}`);
     return dispatch({ type: "GET_VIDEOGAMES_NAME", payload: resp.data });
    } catch (error) {
      console.log(error);
      dispatch({type: 'GET_VIDEOGAMES_NAME', payload: []});
    }
  };