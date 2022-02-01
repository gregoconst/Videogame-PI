const { Router } = require("express");
const axios = require("axios");
require("dotenv").config();
const { APIKEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", async (req, res) => {
  try {
    const videogamesList = await Promise.all([
      axios.get(`https://api.rawg.io/api/games?key=${APIKEY}`),
      axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=2`),
      axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=3`),
      axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=4`),
      axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=5`),
    ]); // [{ data: {results:[] } }, { data:{results:[] } }]
    //  console.log(videogamesList)
    let llamadoUno = videogamesList[0].data.results;
    let llamadoDos = videogamesList[1].data.results;
    let llamadoTres = videogamesList[2].data.results;
    let llamadoCuatro = videogamesList[3].data.results;
    let llamadoCinco = videogamesList[4].data.results;
    let listaCompleta = llamadoUno.concat(
      llamadoDos.concat(llamadoTres.concat(llamadoCuatro.concat(llamadoCinco)))
    );
    console.log(listaCompleta);
    const videogamesProps = listaCompleta?.map((element) => {
      return {
        name: element.name,
        img: element.background_image,
        genres: element.genres?.map((gen) => {
          return {
            genero: gen.name,
          };
        }),
      };
    });
    console.log(videogamesProps);
    return res.status(200).json(videogamesProps);
  } catch (error) {
    console.log(error);
  }
});

router.get("/videogames/:name", async (req, res) => {
  const { name } = req.params;
});

module.exports = router;
