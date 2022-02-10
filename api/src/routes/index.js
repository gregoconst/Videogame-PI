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

//FUNCIONES////////////////////
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
router.get("/videogames", async (req, res, next) => {
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
      videogamesApi = await Promise.all([
        axios.get(
          `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
        ),
      ]);
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
        id: element.id,
        name: element.name,
        img: element.background_image,
        rating: element.rating,
        released: element.released,
        platforms: element.platforms?.map((plat) => plat.platform.name),
        genres: element.genres?.map((gen) => gen.name),
        inDB: false,
        // genres: element.genres?.map((gen) => gen.name)
        // genres: element.genres?.map((gen) => {
        //   return {
        //     genero: gen.name,
        //     id: gen.id,
        //   };
        // })
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

router.get("/videogames/:id", async (req, res, next) => {
  const { id } = req.params;
  let juego;
  try {
    if (isNaN(id)) {
      juego = await Videogame.findByPk(id, { include: Genre });
    } else {
      const videogameApi = (
        await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      ).data;
      juego = {
        id: videogameApi.id,
        name: videogameApi.name,
        genres: videogameApi.genres,
        img: videogameApi.background_image,
        description: videogameApi.description,
        released: videogameApi.released,
        rating: videogameApi.rating,
        platforms: videogameApi.platforms,
        inDB: false,
      };
    }
    return res.status(200).json(juego);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/genres", async (req, res, next) => {
  try {
    const generosApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const generosMap = generosApi.data.results?.map((gen) => ({
      name: gen.name,
      id: gen.id,
    })); //me traigo un array con los nombres y el id de los generos
    generosMap.forEach(async (e) => {
      return await Genre.findOrCreate({
        where: { name: e.name, id: e.id },
        // exclude: {createdAt, updatedAt}
      });
    });
    const generosPasadosAdB = await Genre.findAll();
    return res.send(generosPasadosAdB);
  } catch (error) {
    next(error)
    return res.status(404).json({ error, msg: "Generos no encontrados" });
  }
});

router.post("/videogames", async (req, res, next) => {
  console.log(req.body)
  const { name, description, released, rating, platforms, genres, img } = req.body;
  if (!name || !description || !platforms){
    return res.status(404).send('Necessary parameters not found');
}
  try {
    let nuevoJuego = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
      img,
    });
    console.log(typeof genres)
        if (typeof genres === 'number'){
            await nuevoJuego.addGenre(genres, {through:'game_genre'})
        }
        else{
          await nuevoJuego.addGenre(genres[0], {through:'game_genre'})
          await nuevoJuego.addGenre(genres[1], {through:'game_genre'})
          await nuevoJuego.addGenre(genres[2], {through:'game_genre'})
        }
    // const GenreDB = await Genre.findAll({
    //   where: { name: genres },
    // });
    // nuevoJuego.addGenre(GenreDB);
    const result = await Videogame.findOne({
      where: {
          name: name
      },
      include: Genre
  });
  return res.status(200).json({result, msg:"Juego creado correctamente"});
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
