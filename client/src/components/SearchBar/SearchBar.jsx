import styles from "./SearchBar.module.css";
import { getPokemonsByName, removePokemons } from "../../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const dispatch = useDispatch();
  const handleSearchSubmit = (event) => {
    //cancelo la actualizacion por default del evento
    event.preventDefault();
    if (name !== "") {
      dispatch(getPokemonsByName(name));
    } else {
      dispatch(removePokemons());
    }
  };

  return (
    <form className={styles.search} onSubmit={handleSearchSubmit}>
      <input
        type="text"
        className={styles.input}
        name="search"
        value={name}
        onChange={handleInputChange}
      />
      <button type="submit" className={styles.button}>
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
