const { Router } = require("express");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre, Platform } = require("../db");
const { Op } = require("sequelize");
const { normalizeDataDb, getAllGames } = require("./utils");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

var videogamesList = [];
var videogamesApi = [];
var videogamesDb = [];
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//FUNCIONES////////////////////
const ObtenerPlatforms = async () => {
  let lista = [];
  const videogamesList = await Promise.all([
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`),
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`),
  ]);
  for (let i = 0; i < videogamesList.length; i++) {
    lista = [...lista, ...videogamesList[i].data.results];
  }
  // console.log(lista);
  let platforms = lista?.map((element) => {
    return {
      platforms: element.platforms?.map((plat) => plat.platform.name),
    };
  });
  let allPlatforms = [];
  platforms.map((e) => allPlatforms.push(...e.platforms));
  let result = allPlatforms.reduce((acc, plat) => {
    if (!acc.includes(plat)) {
      acc.push(plat);
    }
    return acc;
  }, []);
  return result;
};
// console.log(ObtenerPlatforms());
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
router.get("/videogamesplatforms", async (req, res, next) => {
  try {
    const platforms = await ObtenerPlatforms();
    platforms.forEach(async (p)=>{
      
    })
    return res.send(platforms);
  } catch (error) {
    console.log(error);
  }
});

router.get("/videogames", async (req, res) => {
  // Busqueda de videogames y por nombre:
  const name = req.query.name;

  let totalGames = await getAllGames();

  if (name) {
    let gameQ = await totalGames.filter((game) =>
      game.name.toLowerCase().includes(name.toLocaleLowerCase())
    );
    gameQ.length
      ? res.status(200).send(gameQ)
      : res.status(404).send("Videogame not found.");
  } else {
    res.status(200).send(totalGames);
  }
});

router.get("/videogames/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    // busqueda en database
    if (id.includes("-")) {
      const juegoDb = await Videogame.findOne({
        where: { id },
        include: [Genre],
      });

      return res.json(juegoDb);
    }
    // Si no encuentro nada en db busco en api:
    const gameAPI = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );

    res.json(gameAPI.data);
  } catch (err) {
    res.status(404).json({ error: "ID not found." });
  }
});

router.get("/genres", async (req, res, next) => {
  try {
    const llamadoApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const videogamesGenres = llamadoApi.data.results;
    videogamesGenres.forEach(async (g) => {
      await Genre.findOrCreate({
        where: {
          name: g.name,
        },
      });
    });
    const allGenres = await Genre.findAll();
    res.status(200).json(allGenres);
  } catch (err) {
    return console.log(err);
  }
});

router.post("/videogames", async (req, res, next) => {
  // console.log(req.body);
  let { name, description, released, rating, platforms, genres, background_image } =
    req.body;
  if (!name || !description || !platforms) {
    return res.status(404).send("Necessary parameters not found");
  }
  try {
    let juegoCreado = await Videogame.create({
      name,
      description,
      background_image,
      released,
      rating,
    });
    let generoDB = await Genre.findAll({
      where: { name: genres },
    });
    let platformaDB = await Platform.findAll({
      where: {name: platforms}
  });
    await juegoCreado.addGenre(generoDB);
    await juegoCreado.addGenre(platformaDB);

    return res
      .status(200)
      .json(juegoCreado);
  } catch (error) {
    next(error);
  }
});
// {name, description, released, rating, platforms, genres}
// var { name, description, released, rating, platforms, genres } = req.body;
// console.log(req.body)
// try {
//     var nuevoJuego = Videogame.create({
//           name,
//           description,
//           released,
//           rating,
//           platforms,
//       });
//       genres.forEach(async (genero) => {
//           const genEnviado = await Genre.findOne({
//               where: { name: genero.name },
//             });
//             await nuevoJuego.addGenre(genEnviado.id);
//           });
//           res.status(200).json(nuevoJuego);
//         } catch (error) {
//             console.log(error)
//             res.status(404).json({ error, msg: "El videojuego no se pudo crear" });
//           }
// const { name, description, released, rating, platforms, genres} = req.body
//   const newVideogame = await Videogame.create({
//           name,
//           description,
//           released,
//           rating,
//           platforms
//   })
//   genres.forEach(async (genre) => {
//       const actualGenre = await Genre.findOne({
//                               where: {name : genre.name}
//                           })
//       await newVideogame.addGenre(actualGenre.id)
//   });
//   res.send(newVideogame)
module.exports = router;
