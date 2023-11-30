const models = require("../models");

const browse = async (req, res) => {

    const [pokemons] = await models.pokemon.findAll()
    res.status(200).send(pokemons)

}
const read = async (req, res ) => {
    const [pokemon] = await models.pokemon.find(req.params.id)
    res.status(200).send(pokemon[0])
}
const edit = async (req, res, next) => {

    const {nom, description} = req.body

    const updatePokemon = {
        id: req.params.id,
        nom: nom,
        description: description
    }

    const [result] = await models.pokemon.update(updatePokemon)
    if(result.affectedRows > 0) {
        res.status(200).send({id: req.params.id, nom, description})
    } else {
        res.status(404).send("Not found")
    }
}
const add = async (req, res) => {

    const {nom, description} = req.body
    const [result] = await models.pokemon.insert(nom, description)
    if(result.affectedRows > 0) {
        res.status(201).send({id: result.insertId, nom, description})
    }

}
const destroy = async (req, res) => {

    const [results] = await models.pokemon.delete(req.params.id)

    if(results.affectedRows > 0) {
        res.status(200).send("Pokemon supprimé")
    } else {
        res.status(404).send("Not found")
    }
}


module.exports = {
    browse,
    read,
    edit,
    add,
    destroy
}