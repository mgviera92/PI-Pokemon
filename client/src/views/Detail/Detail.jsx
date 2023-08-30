import styles from "./Detail.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail, removePokemonDetail } from "../../redux/actions";

const Detail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  //a traves de las funciones me conecto a los recursos
  useEffect(() => {
    dispatch(getPokemonDetail(id));
    return () => {
      dispatch(removePokemonDetail());
    };
  }, [dispatch, id]);

//uso el hook para acceder al estado del detalle del pokemon
  const pokemon = useSelector((state) => state.pokemonDetail);

  return (
    <div className={styles.detailContainer}>
      {pokemon.image ? (
        <div className={styles.card}>
          <div className={styles.leftContainer}>
          <h1 className={styles.label}>{pokemon.name.toUpperCase()}</h1>

            <div className={styles.stats}>
              <p>ID: {pokemon.id}</p>
              <p>Vida: {pokemon.life}</p>
              <p>Ataque: {pokemon.attack}</p>
              <p>Defensa: {pokemon.defense}</p>
              <p>Velocidad: {pokemon.speed}</p>
              <p>Altura: {pokemon.height * 10} cm</p>
              <p>Peso: {pokemon.weight * 0.1} kg</p>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <img src={pokemon.image} alt={pokemon.name} />

            <div className={styles.types}>
              {pokemon.types.map((type, index) => (
                <span
                key={index}
                  className={`${styles.type} ${styles[`${type}`]}`}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Not Found</p>
      )}
    </div>
  );
};

export default Detail;