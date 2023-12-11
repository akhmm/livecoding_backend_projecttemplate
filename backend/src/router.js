const express = require("express");

const router = express.Router();

//controllers
const itemControllers = require("./controllers/itemControllers");

const pokemonControllers = require("./controllers/pokemonControllers")

//validater
const validatePokemon = require("./services/validator")

//middleware try catchの代わり
const asyncMiddleware = require("./services/asyncMiddleware")
//各ファンクションのtry catchを除き、asyncMiddleware(コントローラー名.read)とするだけで、trycatchを行ってくれる


router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

//next(e)になったときにエラーが渡される
//const errorManager = require("./service/errorManager")
//app.use(errorManager)



router.get("/pokemons", asyncMiddleware(pokemonControllers.browse))
//router.get("/pokemons", pokemonControllers.browse)
router.get("/pokemons/:id", asyncMiddleware(pokemonControllers.read))
router.delete("/pokemons/:id", asyncMiddleware(pokemonControllers.destroy))

router.use(validatePokemon)　//この行を追加することで、これより下にあるrouterはvalidationがかかる
router.put("/pokemons/:id", asyncMiddleware(pokemonControllers.edit))
//router.put("/pokemons/:id", validatePokemon, pokemonControllers.edit) 
//こう書く方法もある その場合28行目の router.use(validatePokemon)は削除
router.post("/pokemons", asyncMiddleware(pokemonControllers.add))

module.exports = router;
