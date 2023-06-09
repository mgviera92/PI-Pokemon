const axios = require("axios");

//api url de tipos
const URL_Types = 'https://pokeapi.co/api/v2/type';

// importo el modelo
const { Type } = require("../db");



const getAllTypes = async () => {
    const types = await Type.findAll(); //busco los tipos en la bdd

    if (types.length === 0) { //si no hay nada guardado 
        const pokemonTypes = (await axios.get(`${URL_Types}`)).data.results; //los traigo de la api
        const types = pokemonTypes.map((type) => { //mapeo los resultados
            return { name: type.name }; //y retorno el nombre de cada tipo
        });
        const newTypes = await Type.bulkCreate(types); //guardo los tipos que traje de la api en la base de datos
        return newTypes;
    }

    return types;
};

module.exports = { getAllTypes };