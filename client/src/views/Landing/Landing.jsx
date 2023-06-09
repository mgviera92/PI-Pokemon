import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={styles.bgLanding}>
      <div className={styles.buttonContainer}>
        <Link to="/home">
          <button className={styles.button}>Gotta Catch 'Em All!!</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
