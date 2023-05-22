// ======================== Action Types
import {
    GLOBAL_ERROR_SET,
    GLOBAL_ERROR_REMOVE,
    GLOBAL_SUCCESS_SET,
    GLOBAL_SUCCESS_REMOVE,
    ALL_POKEMONS_GET,
    POKEMONS_FILTER_BY_TYPE,
    POKEMONS_FILTER_BY_SOURCE,
    POKEMONS_ORDER,
    POKEMONS_REMOVE,
    POKEMONS_BY_NAME_GET,
    POKEMON_DETAIL_GET,
    POKEMON_DETAIL_REMOVE,
    TYPES_GET,
    CREATE_POKEMON,
} from "./action-types";

// ======================== Initial State

const initialState = {
    globalError: "",
    globalSuccess: "",
    allPokemons: [],
    pokemons: [],
    filtersValues: {
        byType: "allTypes",
        bySource: "allSources",
    },
    orderValue: "defaul",
    pokemonDetail: {},
    types: [],
};

// ======================== Apply filters function
const applyFilters = (allPokemons, byType, bySource) => {
    let filteredPokemons = [...allPokemons];

    if (byType !== "allTypes") {
        filteredPokemons = filteredPokemons.filter((p) =>
            p.types.includes(byType)
        );
    }

    if (bySource !== "allSources") {
        filteredPokemons = filteredPokemons.filter((p) => {
            if (bySource === "dataBase") {
                return isNaN(p.id) === true;
            }
            if (bySource === "pokeApi") {
                return isNaN(p.id) === false;
            }
            return true;
        });
    }

    return filteredPokemons;
};

// ======================== Root Reducer

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GLOBAL_ERROR_SET:
            return { ...state, globalError: action.payload };
        case GLOBAL_ERROR_REMOVE:
            return { ...state, globalError: "" };

        case GLOBAL_SUCCESS_SET:
            return { ...state, globalSuccess: action.payload };
        case GLOBAL_SUCCESS_REMOVE:
            return { ...state, globalSuccess: "" };


        case ALL_POKEMONS_GET:
            return {
                ...state,
                allPokemons: action.payload,
                pokemons: action.payload,
            };

        case POKEMONS_FILTER_BY_TYPE:
            const filteredPokemonsByType = applyFilters(
                state.allPokemons,
                action.payload,
                state.filtersValues.bySource
            );

            return {
                ...state,
                pokemons: filteredPokemonsByType,
                filtersValues: {
                    ...state.filtersValues,
                    byType: action.payload,
                },
            };
        case POKEMONS_FILTER_BY_SOURCE:
            const filteredPokemonsBySource = applyFilters(
                state.allPokemons,
                state.filtersValues.byType,
                action.payload
            );

            return {
                ...state,
                pokemons: filteredPokemonsBySource,
                filtersValues: {
                    ...state.filtersValues,
                    bySource: action.payload,
                },
            };

        case POKEMONS_ORDER:
            let orderedPokemons = [...state.pokemons];

            switch (action.payload) {
                case "default":
                    return {
                        ...state,
                        pokemons: state.allPokemons,
                        orderValue: action.payload,
                    };
                case "alfabeticoAsc":
                    orderedPokemons.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                    break;
                case "alfabeticoDesc":
                    orderedPokemons.sort((a, b) =>
                        b.name.localeCompare(a.name)
                    );
                    break;
                case "ataqueAsc":
                    orderedPokemons.sort((a, b) => a.attack - b.attack);
                    break;
                case "ataqueDesc":
                    orderedPokemons.sort((a, b) => b.attack - a.attack);
                    break;
                default:
                    break;
            }
            return {
                ...state,
                pokemons: orderedPokemons,
                orderValue: action.payload,
            };
        case POKEMONS_REMOVE:
            return { ...state, pokemons: state.allPokemons };
        case POKEMONS_BY_NAME_GET:
            return { ...state, pokemons: action.payload };

        case POKEMON_DETAIL_GET:
            return { ...state, pokemonDetail: action.payload };
        case POKEMON_DETAIL_REMOVE:
            return { ...state, pokemonDetail: {} };


        case TYPES_GET:
            return { ...state, types: action.payload };

        case CREATE_POKEMON:
            return {
                ...state,
                allPokemons: [...state.allPokemons, action.payload],
                pokemons: [...state.pokemons, action.payload],
            };

        default:
            return { ...state };
    }
};

export default rootReducer;