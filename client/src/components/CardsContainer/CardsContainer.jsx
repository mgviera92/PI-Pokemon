import styles from "./CardsContainer.module.css";
import Card from "../../components/Card/Card";

const CardsContainer = ({ paginatedPokemons }) => {
    return (
        <div className={styles.cardsContainer}>
            {paginatedPokemons.map((pokemon) => (
                <div key={pokemon.id}>
                    <Card pokemon={pokemon} />
                </div>
            ))}
        </div>
    );
};

export default CardsContainer;

