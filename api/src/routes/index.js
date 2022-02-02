const { Router } = require("express");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//FUNCIONES/////////////////////zzz
// const ObtenerApi = async () => {
//   let lista = [];
//   const videogamesList = await Promise.all([
//     axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`),
//     axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
//     axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
//     axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
//     axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`),
//   ]);
//   for (let i = 0; i < videogamesList.length; i++) {
//     lista = [...lista, ...videogamesList[i].data.results];
//   }
//   console.log(lista);
//   const videogamesProps = lista?.map((element) => {
//     return {
//       name: element.name,
//       img: element.background_image,
//       rating: element.rating,
//       released: element.released,
//       platforms: element.platforms?.map((plat) => {
//         return plat.platform.name;
//       }),
//       genres: element.genres?.map((gen) => {
//         return {
//           id: gen.id,
//           genero: gen.name,
//         };
//       }),
//     };
//   });
//   return videogamesProps;
// };

// const ObtenerDb = async () => {
//   return await Videogame.findAll({
//     includes: {Genre}
//   })
// };

// const todalaInfo = async () => {
//   let DatosApi = await ObtenerApi();
//   let DatosDb = await ObtenerDb();
//   console.log(DatosApi);
//   const datosCompletos = DatosApi.concat(DatosDb);
//   return datosCompletos;
// };

////////////////////////////////
router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  try {
    let videogamesApi = [];
    let videogamesDb = [];
    let lista = [];
    const condicionDb = {
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: Genre,
    };
    if (name) {
      videogamesDb = await Videogame.findAll(condicionDb);
      videogamesApi = await Promise.all([axios.get(
        `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
      )]) 
      console.log("primer llamado api query", videogamesApi);
    } else {
      videogamesApi = await Promise.all([
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`),
      ]);
      videogamesDb = await Videogame.findAll({ include: Genre });
    }
    for (let i = 0; i < videogamesApi.length; i++) {
      lista = [...lista, ...videogamesApi[i].data.results];
    }
    const videogamesProps = lista?.map((element) => {
      return {
        name: element.name,
        img: element.background_image,
        rating: element.rating,
        released: element.released,
        platforms: element.platforms?.map((plat) => plat.platform.name),
        genres: element.genres?.map((gen) => gen.name),
      };
    });
    const juegos = [...videogamesDb, ...videogamesProps];
    if (name) {
      console.log(name);
      if (juegos.length > 0) return res.status(200).json(juegos.slice(0, 15));
      return res
        .status(404)
        .json({ msg: "No se encontraron juegos con ese nombre" });
    }
    return res.status(200).json(juegos);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
