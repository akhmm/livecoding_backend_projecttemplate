const AbstractManager = require("./AbstractManager");


class PokemonManager extends AbstractManager {

    constructor() {
        super({table: "pokemon"});
        //superを追記することで、親クラス(AbstractManager)を呼び出す
    }

    update({id, nom, description}) {
        return this.connection.query(`UPDATE ${this.table} SET nom=?, description=? WHERE id=?`, [nom, description, id])
        //? の順番にvariableを並べる
    }

    insert(nom, description) {
        return this.connection.query("INSERT INTO pokemon (nom, description) VALUES (?,?)", [nom, description])
    }

}

module.exports = PokemonManager