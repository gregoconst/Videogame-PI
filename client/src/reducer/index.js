const initialState = {
  videogames: [], //todos los datos de los juegos
  allVideogames: [],
  videogamesGenres: [],
  // allGenres: [],
  filteredVideogames: [],
  platforms: [],
  videogamesDetail: [], //detalles
  // spinnerLoader: true
};

function rootReducer(state = initialState, action) {
  if (action.type === "GET_VIDEOGAMES") {
    return {
      ...state,
      videogames: action.payload,
      allVideogames: action.payload,
      filteredVideogames: action.payload,
      // spinnerLoader: false,
    };
  } else if (action.type === "GET_PLATFORMS") {
    console.log(action.payload, "soy action payload de platformssss");
    return {
      ...state,
      platforms: action.payload,
    };
  } else if (action.type === "GET_GENRES") {
    return {
      ...state,
      videogamesGenres: action.payload,
    };
  } else if (action.type === "GET_VIDEOGAMES_DETAIL") {
    return {
      ...state,
      videogamesDetail: action.payload,
      // spinnerLoader: false,
    };
  } else if (action.type === "GET_VIDEOGAMES_NAME") {
    return {
      ...state,
      videogames: action.payload,
      // spinnerLoader: false,
    };
  } else if (action.type === "SET_FILTER_VIDEOGAMES_ORDER") {
    if (action.payload === "asc") {
      return {
        ...state,
        videogames: state.filteredVideogames?.slice().sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        }),
      };
    } else if (action.payload === "desc") {
      return {
        ...state,
        videogames: state.filteredVideogames?.slice().sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        }),
      };
    } else {
      return { ...state, videogames: state.filteredVideogames };
    }
  } else if (action.type === "SET_FILTER_VIDEOGAMES_RATING") {
    if (action.payload === "top") {
      return {
        ...state,
        videogames: state.filteredVideogames?.slice().sort((a, b) => {
          return b.rating - a.rating;
        }),
      };
    } else if (action.payload === "low") {
      return {
        ...state,
        videogames: state.filteredVideogames?.slice().sort((a, b) => {
          return a.rating - b.rating;
        }),
      };
    } else {
      return { ...state, videogames: state.filteredVideogames };
    }
  } else if (action.type === "SET_FILTER_VIDEOGAMES_GENRES") {
    const genre = action.payload; //genre debería llegar como un objeto con id y name
    if (genre === "All")
      return {
        ...state,
        videogames: state.allVideogames,
        filteredVideogames: state.allVideogames,
      };
    else {
      let videogamesFiltered = state.allVideogames?.filter((videogame) => {
        return videogame.genres?.map(e => e.name).includes(genre);
      });
      return {
        ...state,
        videogames: videogamesFiltered,
        filteredVideogames: videogamesFiltered,
      };
    }
  }
   else if (action.type === "SET_FILTER_VIDEOGAMES_ORIGIN") {
    if (action.payload === "VideogamesDB") {
      return {
        ...state,
        videogames: state.filteredVideogames?.filter((videogame) => {
          return videogame.inDB === true;
        }),
      };
    } else if (action.payload === "RawgAPI") {
      return {
        ...state,
        videogames: state.filteredVideogames?.filter((videogame) => {
          return videogame.inDB === false;
        }),
      };
    } else {
      return { ...state, videogames: state.filteredVideogames };
    }
  } else if (action.type === "POST_VIDEOGAME") {
    return {
      ...state,
    };
  } else if (action.type === "CLEAR_VIDEOGAME_STATE") {
    return {
      ...state,
      videogamesDetail: [],
      filteredVideogames: [],
      videogames: [],
    };
  } else if (action.payload === "LOADER_TRUE") {
    return {
      ...state,
      spinnerLoader: true,
    };
  } else if (action.payload === "LOADER_FALSE") {
    return {
      ...state,
      spinnerLoader: false,
    };
  }
  return state;
}

export default rootReducer;
