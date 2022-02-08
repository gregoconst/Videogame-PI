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
    } else return state;
}

export default rootReducer;