export const validate = (newPokemon) => {
  const { name, image, life, attack, defense, speed, height, weight } =
    newPokemon;

  const errors = {
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  };

  if (!name) {
    errors.name = "Se requiere un nombre";
  } else {
    if (name.length > 20)
      errors.name = "El nombre no puede superar los 20 caracteres";
  }

  if (!image) {
    errors.image = "Se requiere una imagen";
  } 

  if (!life) {
    errors.life = "Se requiere la estadistica: Vida";
  } else {
    if (life < 0) errors.life = "La estadística: Vida no puede ser 0";
  }

  if (!attack) {
    errors.attack = "Se requiere la estadistica: Ataque";
  } else {
    if (attack < 0) errors.attack = "La estadística: Ataque no puede ser 0";
  }

  if (!defense) {
    errors.defense = "Se requiere la estadistica: Defensa";
  } else {
    if (defense < 0)
      errors.defense = "La estadística: Defensa no puede ser 0";
  }

  if (speed < 0) errors.speed = "La estadística: Velocidad no puede ser 0";

  if (height < 0) errors.height = "La estadística: Altura no puede ser 0";

  if (weight < 0) errors.weight = "La estadística: Peso no puede ser 0";

  return errors;
};

export const validateTypes = (types) => {
  if (types.length === 0) return "El pokemon debe tener al menos un tipo";

  if (types.length > 2) return "El pokemon no puede tener mas de 2 tipos";

  return "";
};
