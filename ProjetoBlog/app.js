//Carregando Modulos
	const express = require("express");
	const handlebars = require('express-handlebars')
	const bodyParser = require('body-parser')
	const mongoose = require("mongoose")
	const path = require("path") //Módulo padrão do Node.Js
	const session = require("express-session")
	const flash = require("connect-flash") //É umtipo de sessão que só aparece uma vez
	
	const app = express();
	const admin = require("./routes/admin");

//Configurações
	//Sessão
		app.use(session({
			secret: "2w17mljsedgf",
			resave: true,
			saveUninitialized: true
		}))
		app.use(flash()) // Deve ficar abaixo da sessão
	//Middleware
		app.use((req, res, next) => {
			res.locals.success_msg = req.flash("success_msg") //O res.local é a forma de declarar uma variavel global
			res.locals.error_msg = req.flash("error_msg")
			next()
		})
	//Body Parser
		app.use(bodyParser.urlencoded({extended: true}))
		app.use(bodyParser.json())
	//Handlebars
		app.engine('handlebars', handlebars.engine({defaultLayout: 'main'})) // O main é o tamplate padrão do projeto
		app.set('view engine', 'handlebars')
	//Mongoose
		mongoose.Promise = global.Promise;
		mongoose.connect("mongodb://127.0.0.1:27017/blogapp", {
			useNewUrlParser:true,
			useUnifiedTopology: true
		})
		.then(() => console.log('Conectado!'))
		.catch((erro) => console.log('Erro ao se conectar: '+erro));
	//Public
		app.use(express.static(path.join(__dirname, "public")))		
		
//Rotas
	app.get('/', (req, res) => {
		res.send("Rota principal")
	})
	
	app.use('/admin', admin)

//Outros
const PORT = 8081

app.listen(PORT, function(){ //Precisar ser a ultima linha do codigo
	console.log("Servidor Rodando!");
});