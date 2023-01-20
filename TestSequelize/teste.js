const Sequelize = require('sequelize')
const sequelize = new Sequelize('teste', 'root', 'node.js', {
	host: "localhost",
	dialect: "mysql"
})

/* sequelize.authenticate().then(function(){
	console.log("Conectado com sucesso!")
}).catch(function(erro){
	console.log("Falha ao se conctar: " + erro)
}) */

const Postagem = sequelize.define('postagens', {
	titulo: {
		type: Sequelize.STRING // STRING possui limite
	},
	conteudo: {
		type: Sequelize.TEXT // TEXT não possui limite
	}
})

//Postagem.sync({force: true}) // force: true garante que a tabela será criada

/* Postagem.create({
	titulo: "Titulo Qualquer",
	conteudo: "Algum conteudo..."
}) */

const Usuario = sequelize.define('usuarios', {
	nome: {
		type: Sequelize.STRING
	},
	sobrenome: {
		type: Sequelize.STRING
	},
	idade: {
		type: Sequelize.INTEGER
	},
	email: {
		type: Sequelize.STRING
	}
})

//Usuario.sync({force: true})

Usuario.create({
	nome: "Lucas",
	sobrenome: "Magalhaes",
	idade: 26,
	email: "lucaspintodemagalhaes@hotmail.com"
})