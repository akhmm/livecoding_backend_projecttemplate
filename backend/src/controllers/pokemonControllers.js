const models = require("../models");
//このコードはtry catchをasyncMiddlewareでコンパクトにまとめたバージョン！

const browse = async (req, res) => {

    const [pokemons] = await models.pokemon.findAll()
    res.status(200).send(pokemons)

}
//asyncMiddlewareでtry catchを作っているため、nextもcatchも不要
const read = async (req, res ) => {
    const [pokemon] = await models.pokemon.find(req.params.id)
    /*errorをテストしたい場合は、throw new errorでエラーを投げられる
    ここでエラーを投げておくと、asyncMiddleware のcatchにひっかかる
    → next でerrorManagerが発動される

    */
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
        res.status(200).send({id: req.params.id, nom, description}) //proprietereと同じ名前だから省略できる
    } else {
        res.status(404).send("Not found")
    }
}

/*
const edit = await (req, res) => {
    try{
        const {nom, description} = req.body
        if(!nom || !description){
            return res.status(400).send("No name or description")
        }
        const [results] = awaits models.pokemon.update(nom.description)
        if(result.affectedRows > 0){
            res.status(200).send({id: req.params.id, nom, description})
        }
            res.status(404).send("Not found")
    } catch(e){
        console.log(e);
        res.status(500).send("Internal Server error")
    }
}
*/
const add = async (req, res) => {

    const {nom, description} = req.body
    const [result] = await models.pokemon.insert(nom, description)
    if(result.affectedRows > 0) {
        res.status(201).send({id: result.insertId, nom, description}) //req.paramsではなく、生成されたIdを回収する
    }

}

/*
//nextを追加、try catchのcatch(e)にnext(eを追加することで、errorManagerで管理ができる)
const add = async(req, res, next) => {
    try{
        const { nom, description } = req.body
        const [ result ] = await models.pokemon.insert(nom, description)

        if(result.affectedRows > 0){
            res.status(201).send({id: result.insertId, nom, description})
        }

    } catch(e){
        next(e)
    }
}
 */


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