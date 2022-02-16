const { Router } = require("express");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre, Platform } = require("../db");
const { Op } = require("sequelize");
const { normalizeDataDb, getAllGames, getApiInfo } = require("./utils");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

var videogamesList = [];
var videogamesApi = [];
var videogamesDb = [];
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//FUNCIONES////////////////////
// const ObtenerPlatforms = async () => {
//   let lista = [];
//   const videogamesList = await Promise.all([
//     axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`),
//     axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`), //DEPRECATED
//     axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
//     axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
//     axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`),
//   ]);
//   for (let i = 0; i < videogamesList.length; i++) {
//     lista = [...lista, ...videogamesList[i].data.results];
//   }
//   // console.log(lista);
//   let platforms = lista?.map((element) => {
//     return {
//       platforms: element.platforms?.map((plat) => {
//         return {
//           name: plat.platform.name,
//           id: plat.platform.id,
//         };
//       }),
//     };
//   });
//   let allPlatforms = [];
//   platforms.map((e) => allPlatforms.push(...e.platforms));
//   let result = allPlatforms.reduce((acc, plat) => {
//     if (!acc.includes(plat)) {
//       acc.push(plat);
//     }
//     return acc;
//   }, []);
//   return result;
// };


////////////////////////////////
router.get("/videogamesplatforms", async (req, res) => {
  const juegos = await getApiInfo();
  const allPlatforms = [];
  juegos.map(game => {
      game.platforms.map(platform => {
          if (!allPlatforms.includes(platform)) {
              allPlatforms.push(platform)
          }
      })
  })
  allPlatforms.length
      ? res.status(200).json(allPlatforms)
      : res.status(404).send('Error')
}
)

router.get("/videogames", async (req, res) => {
  // Busqueda de videogames y por nombre:
  const name = req.query.name;

  let totalGames = await getAllGames();
  if (name) {
    let gameQuery = await totalGames.filter((game) =>
      game.name.toLowerCase().includes(name.toLocaleLowerCase())
    );
    
    gameQuery.length
      ? res.status(200).send(gameQuery)
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
    const videogamesGenres = await llamadoApi.data.results;
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

router.post("/videogames", async (req, res) => {
  try {
    let {
      name,
      description,
      background_image,
      released,
      rating,
      inDB,
      platforms,
      genres,
    } = req.body;
    if (!name || !description || !platforms) {
      return res.status(404).send("Necessary parameters not found");
    }
    const nameUpper = name.charAt(0).toUpperCase() + name.slice(1)
    let vGameCreated = await Videogame.create({
      name: nameUpper,
      description,
      background_image,
      released,
      rating,
      inDB,
      platforms,
    });

    let genreDB = await Genre.findAll({
      where: { name: genres },
    });
    vGameCreated.addGenre(genreDB);
    // vGameCreated.addPlatform(platformDB);

    // console.log("soy vGameCreated >>>", vGameCreated);

    res.status(200).json(vGameCreated);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
