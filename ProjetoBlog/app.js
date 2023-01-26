//Carregando Modulos
	const express = require("express");
	const handlebars = require('express-handlebars');
	const bodyParser = require('body-parser')
	//const mongoose = require("mongoose")
	
	const app = express();

//Configurações
	//Body Parser
	app.use(bodyParser.urlencoded({extended: true}))
	app.use(bodyParser.json())
	//Handlebars
	app.engine('handlebars', handlebars.engine({defaultLayout: 'main'})) // main é o tamplate padrão do projeto
	app.set('view engine', 'handlebars')
	//Mongoose

//Rotas


//Outros
const PORT = 8081

app.listen(PORT, =>{ //Precisar ser a ultima linha do codigo
	console.log("Servidor Rodando!");
});