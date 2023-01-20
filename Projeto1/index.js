const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const Sequelize = require('sequelize');


// Configuração
	// Template Engine
	app.engine('handlebars', handlebars.engine({defaultLayout: 'main'})) // main é o tamplate padrão do projeto
	app.set('view engine', 'handlebars')
	// Body Parser
	app.use(bodyParser.urlencoded({extended: false}))
	app.use(bodyParser.json())
	// Conexão com o Banco de Dados MySQL
	const sequelize = new Sequelize('teste', 'root', 'node.js', {
		host: "localhost",
		dialect: "mysql"
	})

//Rotas
app.get("/cadastro", function(req, res){
    res.render("formulario");
});
app.post("/adicionar", function(req, res){
    res.send("Titulo: " + req.body.titulo + " Conteudo: " + req.body.conteudo);
});

app.listen(8081, function(){ //precisar ser a ultima linha do codigo
	console.log("The Server is runnig on the url http://localhost:8081");
});