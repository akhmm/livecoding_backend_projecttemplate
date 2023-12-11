const Joi = require("joi")
//package joi  backendにnpmインストールする

const pokemonSchema = Joi.object(
    {
        nom: Joi.string().min(2).max(30).required(),
        description: Joi.string().max(255).required()
    }
)

const validatePokemon = async (req, res, next) => {

    try {

        const {nom, description} = req.body

        await pokemonSchema.validateAsync({nom, description})

        next()

    } catch(e) {
        console.log(e)
        res.status(422).send(e.details[0].message)
        //e のオブジェクトの中に、details, messageがあり、エラーメッセージが表示される
    }

}

module.exports = validatePokemon