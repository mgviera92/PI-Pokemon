import styles from "./Home.module.css";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Pagination from "../../components/Pagination/Pagination";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  getAllPokemons,
  filterPokemonsByType,
  filterPokemonsBySource,
  orderPokemons,
  getAllTypes,
} from "../../redux/actions";

import Loading from '../Loading/Loading';

const SelectType = ({ type, pokemons }) => {
  const count = pokemons.filter((pokemon) =>
    pokemon.types.includes(type)
  ).length;
  const typeName = type[0].toUpperCase() + type.substring(1);
  return (
    <option value={type}>
      {typeName} ({count})
    </option>
  );
};

const SelectSource = ({ pokemons }) => {
  const dataBasePokemons = pokemons.filter(
    (pokemon) => isNaN(pokemon.id) === true
  ).length;
  const pokeApiPokemons = pokemons.filter(
    (pokemon) => isNaN(pokemon.id) === false
  ).length;
  return (
    <>
      <option key="0" value="dataBase">
        Base de Datos ({dataBasePokemons})
      </option>
      <option key="1" value="pokeApi">
        Api ({pokeApiPokemons})
      </option>
    </>
  );
};

const Home = (props) => {
  //props del reducer
  const { pokemons, types, filtersValues, orderValue } = props;

  //props de actions
  const {
    getAllPokemons,
    filterPokemonsByType,
    filterPokemonsBySource,
    orderPokemons,
    getAllTypes,
  } = props;

  //variable de estado actual y funcion que actualiza
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const [filterType, setFilterType] = useState(filtersValues.byType);
  const [filterSource, setFilterSource] = useState(filtersValues.bySource);
  const [order, setOrder] = useState(orderValue);

  //me conecto a la base de datos y a la api
  useEffect(() => {
    !pokemons.length && getAllPokemons();
    !types.length && getAllTypes();
  }, []);

  //paginado
  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  //de los 150 pokemons que traigo, muestro los de la pagina actual
  const paginatedPokemons = pokemons.slice(
    (currentPage - 1) * pokemonsPerPage,
    currentPage * pokemonsPerPage
  );

  const handlePageChange = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  //filtros
  const handleFilterByType = (event) => {
    setFilterType(event.target.value);
    filterPokemonsByType(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterBySource = (event) => {
    setFilterSource(event.target.value);
    filterPokemonsBySource(event.target.value);
    setCurrentPage(1);
  };

  //orden
  const handleOrder = (event) => {
    setOrder(event.target.value);
    orderPokemons(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className={styles.bgHome}>
      <div className={styles.homeContainer}>
        <div className={styles.navBar}>
          <div className={styles.filterContainer}>
            <span>Filtros</span>
            <select value={filterType} onChange={handleFilterByType}>
              <option value="allTypes">Tipos</option>
              {types.map((type) => (
                <SelectType
                  key={type.id}
                  type={type.name}
                  pokemons={pokemons}
                />
              ))}
            </select>
            <select value={filterSource} onChange={handleFilterBySource}>
              <option value="allSources">Todos</option>
              <SelectSource pokemons={pokemons} />
            </select>
          </div>
          <div className={styles.topPagination}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
          <div className={styles.sortContainer}>
            <span>Orden </span>
            <select value={order} onChange={handleOrder}>
              <option value="default">Default</option>
              <option value="alfabeticoAsc">Alfabético (A-Z)</option>
              <option value="alfabeticoDesc">Alfabético (Z-A)</option>
              <option value="ataqueAsc">Ataque (🠋 a 🠉)</option>
              <option value="ataqueDesc">Ataque (🠉 a 🠋)</option>
            </select>
          </div>
        </div>
        {pokemons.length ? (
          <CardsContainer paginatedPokemons={paginatedPokemons} />
        ) :
          <Loading />
        }
        <div className={styles.navBarMobile}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pokemons: state.pokemons,
    types: state.types,
    filtersValues: state.filtersValues,
    orderValue: state.orderValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPokemons: () => dispatch(getAllPokemons()),
    filterPokemonsByType: (type) => dispatch(filterPokemonsByType(type)),
    filterPokemonsBySource: (source) =>
      dispatch(filterPokemonsBySource(source)),
    orderPokemons: (order) => dispatch(orderPokemons(order)),
    getAllTypes: () => dispatch(getAllTypes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
