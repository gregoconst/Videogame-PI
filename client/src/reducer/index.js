// import { GetVideogamesList } from "../controladores"

const initialState = {
  videogames: [],
  videogamesList: [],
  videogamesGenres: [],
  allGenres: [],
  filteredVideogames: [],
  platforms: [],
  videogamesDetail: [],
  spinnerLoader: true
};

function rootReducer(state = initialState, action) {
  if (action.type === "GET_VIDEOGAMES") {
    return {
      ...state,
      videogames: action.payload,
      videogamesList: action.payload,
      // platforms: result,
      filteredVideogames: action.payload,
      spinnerLoader: false,
    };
  } else if (action.type === "GET_GENRES") {
    return {
      ...state,
      videogamesGenres: action.payload,
      allGenres: action.payload,
    };
  } else if (action.type === "GET_VIDEOGAMES_DETAIL") {
    return {
      ...state,
      videogamesDetail: action.payload,
      spinnerLoader: false,
    };
  } else if (action.type === "GET_VIDEOGAMES_NAME") {
    return {
      ...state,
      videogames: action.payload,
      spinnerLoader: false,
    };
  } else if (action.type === "SET_FILTER_VIDEOGAMES_ORDER") {
    // if (action.payload === "asc") {
    //   return {
    //     ...state,
    //     videogames: state.filteredVideogames?.slice().sort((a, b) => {
    //       //el slice me permite hacer una copia para no modificar mi array principal
    //       if (a.name > b.name) return 1;
    //       if (a.name < b.name) return -1;
    //       return 0;
    //     }),
    //   };
    // } else if (action.payload === "desc") {
    //   return {
    //     ...state,
    //     videogames: state.filteredVideogames?.slice().sort((a, b) => {
    //       if (a.name > b.name) return -1;
    //       if (a.name < b.name) return 1;
    //       return 0;
    //     }),
    //   };
    // }
    // return {
    //   ...state,
    //   videogames: state.filteredVideogames,
    // };
    let orderedVideogames = [...state.videogames]
            
    let order =  orderedVideogames.sort((a, b) => {
        if(a.name.toUpperCase() < b.name.toUpperCase()) {
            return action.payload === 'asc' ? -1 : 1;
        }
        if(a.name.toUpperCase() > b.name.toUpperCase()) {
            return action.payload === 'desc' ? -1 : 1;
        }
        return 0;
    })
    return {
        ...state,
        videogames: order,
    };
  } else if (action.type === "SET_FILTER_VIDEOGAMES_RATING") {
    // if (action.payload === "top") {
    //   return {
    //     ...state,
    //     videogames: state.filteredVideogames?.slice().sort((a, b) => {
    //       //el slice me permite hacer una copia para no modificar mi array principal
    //       return b.rating - a.rating;
    //     }),
    //   };
    // } else if (action.payload === "low") {
    //   return {
    //     ...state,
    //     videogames: state.filteredVideogames?.slice().sort((a, b) => {
    //       return a.rating - b.rating;
    //     }),
    //   };
    // }
    // return {
    //   ...state,
    //   videogames: state.filteredVideogames,
    // };
    let videogamesRating = [...state.videogames];

    let sortRating = videogamesRating.sort((a, b) => {
        if(a.rating < b.rating) {
            return action.payload === 'low' ? -1 : 1;
        }
        if(a.rating > b.rating) {
            return action.payload === 'top' ? -1 : 1;
        }
        return 0;
    });
    return {
        ...state,
        videogames: sortRating,
    };
  } else if (action.type === "SET_FILTER_VIDEOGAMES_GENRES") {
    const genresAPI = [...state.videogamesList];

    const filteredGenresAPI =
      action.payload === "All"
        ? genresAPI
        : genresAPI.filter((gen) => gen.Genres?.includes(action.payload));
    console.log("soy filteredGenresAPI", filteredGenresAPI);

    let filteredGenDB = genresAPI?.filter((x) => {
      // Revisamos el array.
      for (let i = 0; i < x.genres?.length; i++) {
        if (x.genres[i]?.name.includes(action.payload)) {
          return true;
        }
      }
      // Si no lo encontramos en el array no hay nada
      return false;
    });
    console.log("soy filteredGenDB", filteredGenDB);

    const concatGen = filteredGenresAPI.concat(filteredGenDB);

    console.log("soy action.payload >>> ", action.payload);

    return {
      ...state,
      videogames: concatGen,
    };
    // const genre = action.payload;
    // const filtrado = state.videogamesList?.filter((juego) => {
    //   return juego.genres.includes(genre);
    // });
    // if (genre === "All") return { ...state, videogames: state.videogamesList };
    // else {
    //   return {
    //     ...state,
    //     videogames: filtrado,
    //     filteredVideogames: filtrado,
    //   };
    // }
  } else if (action.type === "SET_FILTER_VIDEOGAMES_ORIGIN") {
    //no pude hacerlo andar con if porque soy un tonto
    if (action.payload === "VideogamesDB") {
      return {
        ...state,
        videogames: state.filteredVideogames?.filter((origin) => {
          return origin.inDB === true;
        }),
      };
    } else if (action.payload === "RawgAPI") {
      return {
        ...state,
        videogames: state.filteredVideogames?.filter((origin) => {
          return origin.inDB === false;
        }),
      };
    } else {
      return { ...state, videogames: state.filteredVideogames };
    }
  } else if (action.type === "POST_VIDEOGAME") {
    return {
      ...state,
    };
  } else if (action.payload === "CLEAR_VIDEOGAME_STATE") {
    return {
      ...state,
      videogamesDetail: [],
      filteredVideogames: [],
      videogames: [],
    };
  } else if (action.payload === "LOADER_TRUE"){
    return {
      ...state,
      spinnerLoader: true,
    }
  } else if (action.payload === "LOADER_FALSE"){
    return {
      ...state,
      spinnerLoader: false,
    }
  }
  return state;
}

export default rootReducer;
