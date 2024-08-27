const Sequelize = require('sequelize');


//Cria um objeto do tipo seuquelize e inicializa o objeto com parametros para conexao com o DB sqlite3
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});


module.exports = sequelize;