const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const pokemonControllers = require("./controllers/pokemonControllers")
const validatePokemon = require("./services/validator")
const asyncMiddleware = require("./services/asyncMiddleware")

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/pokemons", asyncMiddleware(pokemonControllers.browse))
router.get("/pokemons/:id", asyncMiddleware(pokemonControllers.read))
router.delete("/pokemons/:id", asyncMiddleware(pokemonControllers.destroy))

router.use(validatePokemon)
router.put("/pokemons/:id", asyncMiddleware(pokemonControllers.edit))
router.post("/pokemons", asyncMiddleware(pokemonControllers.add))

module.exports = router;
