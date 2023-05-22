const { Router } = require("express");

const pokemonsRouter = require("./pokemonRoutes");
const typesRouter = require("./typeRoutes");

const router = Router();

// ======================== Routers
router.use("/pokemons", pokemonsRouter);

router.use("/types", typesRouter);

router.use("*", (req, res) => {
    res.status(404).json({ error: "not found" });
});

module.exports = router;