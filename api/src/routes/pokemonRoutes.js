const { Router } = require("express");

// importo los handlers
const {
    getPokemonsHandler,
    getPokemonByIdHandler,
    createNewPokemonHandler,
} = require("../handlers/pokemonHandler");

const pokemonsRouter = Router();

pokemonsRouter.get("/", getPokemonsHandler);

pokemonsRouter.get("/:id", getPokemonByIdHandler);

pokemonsRouter.post("/", createNewPokemonHandler);

module.exports = pokemonsRouter;