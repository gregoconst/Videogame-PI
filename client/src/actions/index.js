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

export const getVideogameGenres = () => async (dispatch) => {
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

  export const setVideogamesOrder = (order) => (dispatch) => {
    dispatch({type: 'VIDEOGAMES_ORDER', payload: order});
  };
  export const setVideogamesOrigin = (origin) => (dispatch) => {
    dispatch({type: 'VIDEOGAMES_ORIGIN', payload: origin});
  };
  
  export const setVideogamesGenres = (genre) => (dispatch) => {
    dispatch({type: 'VIDEOGAMES_GENRE', payload: genre});
  };
  
  export const clearVideogameDetail = () => (dispatch) => {
    dispatch({type: 'CLEAR_VIDEOGAME_DETAIL'});
  };