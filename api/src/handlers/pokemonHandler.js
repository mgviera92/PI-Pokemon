// importo los controladores
const {
  getAllPokemons,
  getPokemonsByName,
  getPokemonById,
  createNewPokemon,
} = require("../controllers/pokemonController");


const getPokemonsHandler = async (req, res) => {
  const { name } = req.query;

  if (name) {
      // si hay un nombre en la query, muestro los que conincidan

      try {
          const pokemons = await getPokemonsByName(name);
          res.status(200).json(pokemons);
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  } else {
      // si no hay nombre, muestro todos los pokemon

      try {
          const pokemons = await getAllPokemons();
          res.status(200).json(pokemons);
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  }
};

const getPokemonByIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "db" : "api"; //verifico si el id ingresado es de la base da datos o de la api

  try {
      const pokemon = await getPokemonById(id, source);
      res.status(200).json(pokemon);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

const createNewPokemonHandler = async (req, res) => {
  const pokemon = req.body;

  try {
      const newPokemon = await createNewPokemon(pokemon);
      res.status(201).json(newPokemon); //201: se ha llevado a cabo la creacion de un recurso
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPokemonsHandler,
  getPokemonByIdHandler,
  createNewPokemonHandler,
};