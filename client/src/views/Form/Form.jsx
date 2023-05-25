import styles from "./Form.module.css";
import { validate, validateTypes } from "./Validate";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTypes,
  createPokemon,
} from "../../redux/actions";

const Form = () => {
  const [newPokemon, setNewPokemon] = useState({
    name: "",
    image: "",
    life: null,
    attack: null,
    defense: null,
    speed: null,
    height: null,
    weight: null,
    types: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: "",
  });

  const [buttonClicks, setButtonClicks] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // traigo todos los tipos
  const allTypes = useSelector((state) => state.types);
  useEffect(() => {
    !allTypes.length && dispatch(getAllTypes());
  }, [dispatch]);

  //handlers para cambios en los atributos
  const handleNameChange = (event) => {
    setNewPokemon({ ...newPokemon, name: event.target.value });
    setErrors({
      ...errors,
      name: validate({ ...newPokemon, name: event.target.value }).name,
    });
  };

  const handleImageChange = (event) => {
    setNewPokemon({ ...newPokemon, image: event.target.value });
    setErrors({
      ...errors,
      image: validate({ ...newPokemon, image: event.target.value }).image,
    });
  };

  const handleLifeChange = (event) => {
    setNewPokemon({ ...newPokemon, life: event.target.value });
    setErrors({
      ...errors,
      life: validate({ ...newPokemon, life: event.target.value }).life,
    });
  };

  const handleAttackChange = (event) => {
    setNewPokemon({ ...newPokemon, attack: event.target.value });
    setErrors({
      ...errors,
      attack: validate({
        ...newPokemon,
        attack: event.target.value,
      }).attack,
    });
  };

  const handleDefenseChange = (event) => {
    setNewPokemon({ ...newPokemon, defense: event.target.value });
    setErrors({
      ...errors,
      defense: validate({
        ...newPokemon,
        defense: event.target.value,
      }).defense,
    });
  };

  const handleSpeedChange = (event) => {
    setNewPokemon({ ...newPokemon, speed: event.target.value });
    setErrors({
      ...errors,
      speed: validate({ ...newPokemon, speed: event.target.value }).speed,
    });
  };

  const handleHeightChange = (event) => {
    setNewPokemon({ ...newPokemon, height: event.target.value });
    setErrors({
      ...errors,
      height: validate({
        ...newPokemon,
        height: event.target.value,
      }).height,
    });
  };

  const handleWeightChange = (event) => {
    setNewPokemon({ ...newPokemon, weight: event.target.value });
    setErrors({
      ...errors,
      weight: validate({
        ...newPokemon,
        weight: event.target.value,
      }).weight,
    });
  };

  const handleTypesChange = (event) => {
    const typeId = event.target.value;
    const typeName = event.target.name;

    if (event.target.checked) {
      //cuando se clickea un tipo
      setNewPokemon({
        ...newPokemon,
        types: [...newPokemon.types, { id: typeId, name: typeName }],
      });
      setErrors({
        ...errors,
        types: validateTypes([
          ...newPokemon.types,
          { id: typeId, name: typeName },
        ]),
      });
    } else {
      //cuando se desclickea un tipo
      setNewPokemon({
        ...newPokemon,
        types: newPokemon.types.filter((type) => type.id !== typeId),
      });
      setErrors({
        ...errors,
        types: validateTypes([
          ...newPokemon.types.filter((type) => type.id !== typeId),
        ]),
      });
    }
  };

  let buttonDisabled =
    newPokemon.name === "" ||
    Object.values(errors).some((error) => error !== "");

  const submitHandler = (event) => {
    event.preventDefault();

    if (buttonClicks === 0) {
      const validarErrores = validate(newPokemon);
      const newErrors = {
        name: validarErrores.name,
        image: validarErrores.image,
        life: validarErrores.life,
        attack: validarErrores.attack,
        defense: validarErrores.defense,
        speed: validarErrores.speed,
        height: validarErrores.height,
        weight: validarErrores.weight,
        types: validateTypes(newPokemon.types),
      };
      setErrors(newErrors);
    } else {
      if (!Object.values(errors).some((error) => error !== "")) {
        const pokemonToCreate = {
          ...newPokemon,
          types: newPokemon.types.map((type) => Number(type.id)),
        };
        dispatch(createPokemon(pokemonToCreate));
        setNewPokemon({
          name: "",
          image: "",
          life: 0,
          attack: 0,
          defense: 0,
          speed: 0,
          height: 0,
          weight: 0,
          types: [],
        });
        navigate("/home");
      }
    }
    setButtonClicks((prev) => prev + 1);
  };

  return (
    <div className={styles.bgForm}>
      <div className={styles.createContainer}>
        <div className={styles.formContainer}>
          <form onSubmit={submitHandler}>
            <div className={styles.row}>
              <div className={styles.textInput}>
                <label htmlFor="name">Nombre:</label>
                <input
                  className={`${styles.input} ${errors.name && styles.error}`}
                  type="text"
                  id="name"
                  name="name"
                  value={newPokemon.name}
                  onChange={handleNameChange}
                  autoFocus
                />
                <span className={styles.spanError}>{errors.name}</span>
              </div>
              <div className={styles.textInput}>
                <label htmlFor="image">Imagen:</label>
                <input
                  className={`${styles.input} ${errors.image && styles.error}`}
                  type="text"
                  id="image"
                  name="image"
                  value={newPokemon.image}
                  onChange={handleImageChange}
                />
                <span className={styles.spanError}>{errors.image}</span>
              </div>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <label htmlFor="life">Vida:</label>
                <input
                  className={`${styles.input} ${errors.life && styles.error} ${
                    styles.statInput
                  }`}
                  type="number"
                  id="life"
                  name="life"
                  value={newPokemon.life}
                  onChange={handleLifeChange}
                />
                <span className={styles.spanError}>{errors.life}</span>
              </div>
              <div className={styles.stat}>
                <label htmlFor="attack">Ataque:</label>
                <input
                  className={`${styles.input} ${
                    errors.attack && styles.error
                  } ${styles.statInput}`}
                  type="number"
                  id="attack"
                  name="attack"
                  value={newPokemon.attack}
                  onChange={handleAttackChange}
                />
                <span className={styles.spanError}>{errors.attack}</span>
              </div>
              <div className={styles.stat}>
                <label htmlFor="defense">Defensa:</label>
                <input
                  className={`${styles.input} ${
                    errors.defense && styles.error
                  } ${styles.statInput}`}
                  type="number"
                  id="defense"
                  name="defense"
                  value={newPokemon.defense}
                  onChange={handleDefenseChange}
                />
                <span className={styles.spanError}>{errors.defense}</span>
              </div>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <label htmlFor="speed">Velocidad:</label>
                <input
                  className={`${styles.input} ${errors.speed && styles.error} ${
                    styles.statInput
                  }`}
                  type="number"
                  id="speed"
                  name="speed"
                  value={newPokemon.speed}
                  onChange={handleSpeedChange}
                />
                <span className={styles.spanError}>{errors.speed}</span>
              </div>
              <div className={styles.stat}>
                <label htmlFor="height">Altura:</label>
                <input
                  className={`${styles.input} ${
                    errors.height && styles.error
                  } ${styles.statInput}`}
                  type="number"
                  id="height"
                  name="height"
                  value={newPokemon.height}
                  onChange={handleHeightChange}
                />
                <span className={styles.spanError}>{errors.height}</span>
              </div>
              <div className={styles.stat}>
                <label htmlFor="weight">Peso:</label>
                <input
                  className={`${styles.input} ${
                    errors.weight && styles.error
                  } ${styles.statInput}`}
                  type="number"
                  id="weight"
                  name="weight"
                  value={newPokemon.weight}
                  onChange={handleWeightChange}
                />
                <span className={styles.spanError}>{errors.weight}</span>
              </div>
            </div>
            {allTypes.length ? (
              <div className={styles.typesSelectors}>
                {allTypes.length &&
                  allTypes.map((type) => (
                    <div className={styles.typeSelector} key={type.id}>
                      <label>
                        <input
                          type="checkbox"
                          id={type.id}
                          value={type.id}
                          name={type.name}
                          onChange={handleTypesChange}
                        />
                        {type.name}
                      </label>
                    </div>
                  ))}
              </div>
            ) : (
              <div className={styles.loadingContainer}>
                <span className={styles.loader}></span>
              </div>
            )}
            <span className={styles.spanError}>{errors.types}</span>

            <button disabled={buttonDisabled} className={styles.buttonSubmit}>
              Crear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
