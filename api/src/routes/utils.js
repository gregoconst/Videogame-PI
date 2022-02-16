const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
normalizeDataDb = (videogamesDb) => {
  //////////////DEPRECATED
  const genresNormalized = videogamesDb.dataValues.genres?.map(
    (gen) => gen.name
  );

  return {
    name: videogamesDb.name,
    genres: genresNormalized,
    img: videogamesDb.img,
    id: videogamesDb.id,
    rating: videogamesDb.rating,
    description: videogamesDb.description,
    released: videogamesDb.released,
    platforms: videogamesDb.platforms,
    inDB: videogamesDb.inDB,
  };
};

const getApiInfo = async () => {
  try {
    const videogamesList = await Promise.all([
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`),
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`),
    ]);
    let llamadoUno = videogamesList[0].data.results;
    let llamadoDos = videogamesList[1].data.results;
    let llamadoTres = videogamesList[2].data.results;
    let llamadoCuatro = videogamesList[3].data.results;
    let llamadoCinco = videogamesList[4].data.results;

    let listaCompleta = llamadoUno.concat(
      llamadoDos.concat(llamadoTres.concat(llamadoCuatro.concat(llamadoCinco)))
    );
    listaCompleta = listaCompleta.map((element) => {
      return {
        id: element.id,
        name: element.name,
        background_image: element.background_image,
        rating: element.rating,
        released: element.released,
        platforms: element.platforms?.map((plat) => plat.platform.name),
        genres: element.genres?.map((gen) => {
          return {
            name: gen.name,
            id: gen.id
          }
        }),
        inDB: false,
      };
    });
    return listaCompleta;
  } catch (error) {
    console.log(error);
  }
};

const getDbIinfo = async () => {
  try {
    return await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getQueryGames = async (req, res) => {
  const { name } = req.query;
  // let gamesdatabase = await getDbIinfo();
  const condicionDb = {
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: Genre,
  };
  try {
    const videogamesList = await
      axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
    let juegosquery = videogamesList.data.results?.map((element) => {
      return {
        id: element.id,
        name: element.name,
        background_image: element.background_image,
        rating: element.rating,
        released: element.released,
        platforms: element.platforms?.map((plat) => plat.platform.name),
        Genres: element.genres?.map((gen) => gen.name),
        inDB: false,
      };
    })
    let gamesdatabasename = await Videogame.findAll(condicionDb);
    let listaCompleta = gamesdatabasename.concat(juegosquery);
    return listaCompleta;
  } catch (error) {
    console.log(error);
  }
};


const getAllGameName = async (req,res)=>{
  let name= req.query.name
  let gamesDB = await getDB()
  let page_size=15
  let array=[]
  let response = await axios.get(`https://api.rawg.io/api/games?search=${name}&search_precise=true&key=${API_KEY}&page_size=${page_size}`)
  response.data.results.map(el=>(
      array.push(  Object.keys(el).reduce(function(obj, k) {
                    if ( k==='id' ||k === 'background_image' || k === 'name' ||k === 'genres' || k==='released' ||k==='rating'
                    || k==='description' ||k==='platforms'
                       ) obj[k] = el[k];
                       return obj;
                   }, {}))) )
   //console.log(array)
  let gamesNameDB = await gamesDB.filter(el=> el.name.toLowerCase().includes(name.toLowerCase()))
   
 
  totalGamesName = (gamesNameDB.concat(array))
  //totalGamesName.length>0?
   return totalGamesName


}


const getAllGames = async () => {
  try {
    const infoAPI = await getApiInfo();
    const infoDB = await getDbIinfo();

    const infoTotal = infoAPI.concat(infoDB);

    return infoTotal;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { normalizeDataDb, getAllGames, getApiInfo, getDbIinfo, getQueryGames };
