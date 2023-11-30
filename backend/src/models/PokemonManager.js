const AbstractManager = require("./AbstractManager");


class PokemonManager extends AbstractManager {

    constructor() {
        super({table: "pokemon"});
    }

    update({id, nom, description}) {
        return this.connection.query(`UPDATE ${this.table} SET nom=?, description=? WHERE id=?`, [nom, description, id])
    }

    insert(nom, description) {
        return this.connection.query("INSERT INTO pokemon (nom, description) VALUES (?,?)", [nom, description])
    }

}

module.exports = PokemonManager