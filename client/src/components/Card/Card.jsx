import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { id, name, image, types } = props.pokemon;

  const nameMayusc = name[0].toUpperCase() + name.substring(1);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
      <div>
        <h2 className={styles.name}>{nameMayusc}</h2>
      </div>
        <Link to={`/detail/${id}`}>
          <img src={image} alt={name} className={styles.image} />
        </Link>
        <div className={styles.types}>
          {types.map((type) => (
            <span key={type} className={`${styles.type} ${styles[`${type}`]}`}>
              {type}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Card;
