const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const Sequelize = require('sequelize');


// Configuração
	// Template Engine
	app.engine('handlebars', handlebars.engine({defaultLayout: 'main'})) // main é o tamplate padrão do projeto
	app.set('view engine', 'handlebars')
// Conexão com o Banco de Dados MySQL
const sequelize = new Sequelize('teste', 'root', 'node.js', {
    host: "localhost",
    dialect: "mysql"
})

//Rotas
app.get("/cadastro", function(req, res){
    res.render("formulario");
});

app.listen(8081, function(){ //precisar ser a ultima linha do codigo
	console.log("The Server is runnig on the url http://localhost:8081");
});