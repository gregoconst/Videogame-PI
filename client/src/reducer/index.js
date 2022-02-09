import { GetVideogamesList } from "../controladores"

const initialState = {
    videogames: [],
    videogamesList : {
        todos: [],
        actual: []
    },
    videogamesDetail: [],
    videogamesGenres: [],

}



function rootReducer (state = initialState, action) {
    if (action.type === "GET_VIDEOGAMES") {
        return {
          ...state, 
          videogames: action.payload,
          videogamesList: {
              todos: action.payload,
              actual: GetVideogamesList(action.payload)
          }
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
    }  return state;
}

export default rootReducer;