const Sequelize = require('sequelize');

// Conexão com o Banco de Dados MySQL
const sequelize = new Sequelize('postapp', 'root', 'node.js', {
	host: "localhost",
	dialect: "mysql",
	query:{raw:true}
})

module.exports = {
	Sequelize: Sequelize,
	sequelize: sequelize
}