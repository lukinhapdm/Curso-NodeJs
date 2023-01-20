const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const Post = require('./models/Post')


// Configuração
	// Template Engine
	app.engine('handlebars', handlebars.engine({defaultLayout: 'main'})) // main é o tamplate padrão do projeto
	app.set('view engine', 'handlebars')
	// Body Parser
	app.use(bodyParser.urlencoded({extended: false}))
	app.use(bodyParser.json())


//Rotas

app.get("/", function(req, res){
    res.render("home");
});

app.get("/cadastro", function(req, res){
    res.render("formulario");
});

app.post("/adicionar", function(req, res){
	Post.create({
		titulo: req.body.titulo,
		conteudo: req.body.conteudo
	}).then(function(){
		res.redirect('/')
	}).catch(function(erro){
		res.send("Erro Detectado: " + erro)
	})
	
    //res.send("Titulo: " + req.body.titulo + " Conteudo: " + req.body.conteudo);
});

app.listen(8081, function(){ //precisar ser a ultima linha do codigo
	console.log("The Server is runnig on the url http://localhost:8081");
});