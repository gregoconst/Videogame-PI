// import { GetVideogamesList } from "../controladores"

const initialState = {
  videogames: [],
  videogamesList: [],
  videogamesGenres: [],
  allGenres: [],
  filteredVideogames: [],
  platforms: [],
  videogamesDetail: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === "GET_VIDEOGAMES") {
    return {
      ...state,
      videogames: action.payload,
      videogamesList: action.payload,
      // platforms: result,
      filteredVideogames: action.payload,
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
    };
  } else if (action.type === "GET_VIDEOGAMES_NAME") {
    return {
      ...state,
      videogames: action.payload,
    };
  } else if (action.type === "SET_FILTER_VIDEOGAMES_ORDER") {
    if (action.payload === "asc") {
      return {
        ...state,
        videogames: state.filteredVideogames?.slice().sort((a, b) => {
          //el slice me permite hacer una copia para no modificar mi array principal
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
    }
    return {
      ...state,
      videogames: state.filteredVideogames,
    };
  } else if (action.type === "SET_FILTER_VIDEOGAMES_RATING") {
    if (action.payload === "top") {
      return {
        ...state,
        videogames: state.filteredVideogames?.slice().sort((a, b) => {
          //el slice me permite hacer una copia para no modificar mi array principal
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
    }
    return {
      ...state,
      videogames: state.filteredVideogames,
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
    const allFilteredVideogames = state.filteredVideogames;
    if (action.payload === "All") {
      return { ...state, videogames: state.videogamesList };
    } else if (action.payload === "VideogamesDB") {
      return {
        ...state,
        videogames: allFilteredVideogames.filter((origin) => origin.inDB),
        filteredVideogames: allFilteredVideogames.filter(
          (origin) => origin.inDB
        ),
      };
    } else {
      return {
        ...state,
        videogames: allFilteredVideogames.filter((origin) => !origin.inDB),
        filteredVideogames: allFilteredVideogames.filter(
          (origin) => !origin.inDB
        ),
      };
    }
  } else if (action.type === "POST_VIDEOGAME") {
    return {
      ...state,
    };
  } else if (action.payload === "CLEAR_VIDEOGAME_DETAIL") {
    return {
      ...state,
      videogamesDetail: [],
      filteredVideogames: [],
    };
  }
  return state;
}

export default rootReducer;
