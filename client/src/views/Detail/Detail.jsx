import styles from "./Detail.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail, removePokemonDetail } from "../../redux/actions";

const Detail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  //a traves de las funciones conectarme a los recursos
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
        <>
          <div className={styles.leftContainer}>
            <h1 className={styles.title}>{pokemon.name.toUpperCase()}</h1>

            <div className={styles.row}>
              <p className={styles.label}>ID:</p>
              <p className={styles.stats}>{pokemon.id}</p>
            </div>
            <div className={styles.row}>
              <p className={styles.label}>Vida:</p>
              <div className={styles.stats}>
                <div>{pokemon.life}</div>
              </div>
            </div>
            <div className={styles.row}>
              <p className={styles.label}>Ataque:</p>

              <div className={styles.stats}>{pokemon.attack}</div>
            </div>
            <div className={styles.row}>
              <p className={styles.label}>Defensa:</p>

              <div className={styles.stats}>{pokemon.defense}</div>
            </div>
            <div className={styles.row}>
              <p className={styles.label}>Velocidad:</p>

              <div className={styles.stats}>{pokemon.speed}</div>
            </div>
            <div className={styles.row}>
              <p className={styles.label}>Altura:</p>

              <div className={styles.stats}>{pokemon.height}</div>
            </div>
            <div className={styles.row}>
              <p className={styles.label}>Peso:</p>

              <div className={styles.stats}>{pokemon.weight}</div>
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
        </>
      ) : (
        <p>Not Found</p>
      )}
    </div>
  );
};

export default Detail;