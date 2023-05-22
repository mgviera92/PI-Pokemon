import styles from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={styles.container}>
      <SearchBar />
      <div className={styles.linkContainer}>
        <NavLink className={styles.button} to="/home">Home</NavLink>
        <NavLink className={styles.button} to="/create">Crear Pokemon</NavLink>
      </div>
    </div>
  );
};

export default NavBar;
