// import { GetVideogamesList } from "../controladores"

const initialState = {
    videogames: [],
    videogamesList : [],
    videogamesDetail: [],
    videogamesGenres: [],

}



function rootReducer (state = initialState, action) {
    if (action.type === "GET_VIDEOGAMES") {
        return {
          ...state, 
          videogames: action.payload,
          videogamesList: action.payload
        }
    } else if(action.type === "GET_GENRES"){
        return {
            ...state,
            videogamesGenres: action.payload
        }
    } else if (action.type === "GET_VIDEOGAMES_DETAIL"){
        return {
            ...state,
            videogamesDetail: action.payload
        }
    } else if (action.type === "GET_VIDEOGAMES_NAME"){
        return {
            ...state,
            videogames: action.payload
        }
    } else if (action.type === "SET_FILTER_VIDEOGAMES_ORDER"){
        if (action.payload === "asc") {
            return {
              ...state,
              videogames: state.videogamesList?.slice().sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
              }),
            };
          } else if (action.payload === "desc") {
            return {
              ...state,
              videogames: state.videogamesList?.slice().sort((a, b) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
              }),
            };
          } return {
            ...state,
            videogames: state.videogamesList
          }
    } else if (action.type === "SET_FILTER_VIDEOGAMES_RATING"){
        if (action.payload === "top") {
            return {
              ...state,
              videogames: state.videogamesList?.slice().sort((a, b) => { //el slice me permite hacer una copia para no modificar mi array principal
                return b.rating - a.rating;
              }),
            };
          } else if (action.payload === "low") {
            return {
              ...state,
              videogames: state.videogamesList?.slice().sort((a, b) => {
                return a.rating - b.rating;
              }),
            };
          } return {
            ...state,
            videogames: state.videogamesList
          }
    } else if (action.type === "SET_FILTER_VIDEOGAMES_GENRES"){
        const genre = action.payload; 
        if (genre === "All") return { ...state };
        else {
          return {
            ...state,
            videogames: state.videogamesList?.filter((juego) => {
              return juego.genres.includes(genre);
            }),
          };
        }
    } else if (action.type === "SET_FILTER_VIDEOGAMES_ORIGIN"){
        if (action.payload === "VideogamesDB") {
            return {
              ...state,
              videogames: state.videogamesList?.filter((juego) => {
                return juego.InDB === true;
              }),
            };
          } else if (action.payload === "RawgAPI") {
            console.log(action.payload, "holaaaaaaaaaaaaa");
            return {
              ...state,
              videogames: state.videogamesList?.filter((juego) => {
                return juego.InDB === false;
              }),
            };
          } else {
            return { ...state };
          }
    } return state;
}

export default rootReducer;