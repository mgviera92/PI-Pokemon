const axios = require("axios");

// REGEX
const REGEX_URL =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

// api url
const URL_Pokemon = "https://pokeapi.co/api/v2/pokemon";

// importo modelos
const { Pokemon, Type, Pokemon_Types } = require("../db");
const { Op } = require("sequelize");

// para traer los datos limpios

const cleanPokemonApi = (pokemon) => {
  const types = pokemon.types.map((t) => t.type.name);

  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other.dream_world.front_default,
    life: pokemon.stats[0].base_stat,
    attack: pokemon.stats[1].base_stat,
    defense: pokemon.stats[2].base_stat,
    speed: pokemon.stats[5].base_stat,
    height: pokemon.height,
    weight: pokemon.weight,
    types: types,
  };
};

const cleanPokemonData = (pokemon) => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.image,
    attack: pokemon.attack,
    types: pokemon.types,
  };
};

const cleanPokemonDb = (pokemon) => {
  const types = pokemon.Types.map((t) => t.name);

  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.image,
    life: pokemon.life,
    attack: pokemon.attack,
    defense: pokemon.defense,
    speed: pokemon.speed,
    height: pokemon.height,
    weight: pokemon.weight,
    types: types,
  };
};

const getAllPokemons = async () => {
  // traigo los pokemons de la base de datos
  const query = await Pokemon.findAll({ include: Type });
  const dbPokemons = query.map((q) => cleanPokemonDb(q));

  // traigo los pokemons de la api
  const arrayPokemons = (await axios.get(`${URL_Pokemon}?limit=150`)).data
    .results;
  const promises = arrayPokemons.map((r) => axios(r.url));
  const responses = await Promise.all(promises);
  const apiPokemons = responses.map((r) => {
    return cleanPokemonApi(r.data);
  });

  const pokemonsDb = dbPokemons.map((p) => cleanPokemonData(p));

  const pokemonsApi = apiPokemons.map((p) => cleanPokemonData(p));

  return [...pokemonsDb, ...pokemonsApi];
};

const getPokemonsByName = async (name) => {
  const pokemonsDb = await Pokemon.findAll({
    where: { name: { [Op.iLike]: name } },
    include: Type,
  });

  const pokemons = pokemonsDb.map((pokemon) => cleanPokemonDb(pokemon));

  try {
    const response = await axios.get(`${URL_Pokemon}/${name.toLowerCase()}`);
    if (response.data.name) {
      pokemons.push(cleanPokemonApi(response.data));
    }
  } catch (error) {}

  if (pokemons.length === 0) {
    throw new Error(`"${name}" not found.`);
  }
  return pokemons;
};

const getPokemonById = async (id, source) => {
  if (source === "api") {
    try {
      const response = await axios.get(`${URL_Pokemon}/${id}`);
      return cleanPokemonApi(response.data);
    } catch (error) {
      if (error.message === "Request failed with status code 404") {
        throw new Error(`Id "${id}" not found in ${source}`);
      } else {
        throw new Error(error.message);
      }
    }
  }

  if (source === "db") {
    const pokemon = await Pokemon.findByPk(id, { include: Type });
    if (pokemon === null) {
      throw new Error(`Id "${id}" not found in ${source}`);
    }

    return cleanPokemonDb(pokemon);
  }
};

const createNewPokemon = async (pokemon) => {
  const { name, image, life, attack, defense, speed, height, weight, types } =
    pokemon;

  if (!name) {
    throw new Error("Name is required.");
  }

  if (!image) {
    throw new Error("Image url is required.");
  }

  if (name.length > 20) {
    throw new Error("Name should not be longer than 20 characters.");
  }

  if (!REGEX_URL.test(image)) {
    throw new Error("Image url is invalid.");
  }

  if (
    life < 0 ||
    attack < 0 ||
    defense < 0 ||
    speed < 0 ||
    height < 0 ||
    weight < 0
  ) {
    throw new Error("Stats can't be less than 0.");
  }

  if (types.length > 2) {
    throw new Error("Pokemon can't have more than 2 types.");
  }

  const typesCreated = await Type.findAll();
  const typeIdsCreated = typesCreated.map((type) => type.id);

  if (!types.every((t) => typeIdsCreated.includes(t))) {
    throw new Error("Invalid type");
  }

  // Creción de Pokemon
  const newPokemon = await Pokemon.create({
    ...pokemon,
    name: pokemon.name.replace(/\s(?=\w)/g, ""),
  });

  for (let i = 0; i < types.length; i++) {
    await Pokemon_Types.create({
      PokemonId: newPokemon.id,
      TypeId: types[i],
    });
  }

  // Return pokemon created
  const createdPokemon = await Pokemon.findByPk(newPokemon.id, {
    include: Type,
  });

  return cleanPokemonData(cleanPokemonDb(createdPokemon));
};

module.exports = {
  getAllPokemons,
  getPokemonsByName,
  getPokemonById,
  createNewPokemon,
};
