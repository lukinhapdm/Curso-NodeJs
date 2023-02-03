//Carregando Modulos
	const express = require("express");
	const handlebars = require('express-handlebars')
	const bodyParser = require('body-parser')
	const mongoose = require("mongoose")
	const path = require("path") //Módulo padrão do Node.Js
	const session = require("express-session")
	const flash = require("connect-flash") //É umtipo de sessão que só aparece uma vez
	const passport = require("passport")
	
	const app = express();
	const admin = require("./routes/admin");
	const usuarios = require("./routes/usuario");
	
	require("./models/Postagem")
	const Postagem = mongoose.model("postagens")
	require("./models/Categoria")
	const Categoria = mongoose.model("categorias")
	require("./config/auth")(passport)

//Configurações
	//Sessão
		app.use(session({
			secret: "2w17mljsedgf",
			resave: true,
			saveUninitialized: true
		}))
		
		app.use(passport.initialize())
		app.use(passport.session())
		app.use(flash()) // Deve ficar abaixo da sessão
	//Middleware
		app.use((req, res, next) => {
			res.locals.success_msg = req.flash("success_msg") //O res.local é a forma de declarar uma variavel global
			res.locals.error_msg = req.flash("error_msg")
			res.locals.error = req.flash("error")
			res.locals.user = req.user || null;
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
		Postagem.find().populate("categoria").sort({date:"desc"}).lean().then((postagens) => {
			res.render("index", {postagens: postagens})
		}).catch((erro) => {
			req.flash("error_msg", "Houve um erro interno!")
			res.redirect("/404")
		})
	})
	
	app.get("/404", (req, res) => {
		res.send("Erro 404!")
	})
	
	app.get("/postagem/:slug", (req, res) => {
		Postagem.findOne({slug: req.params.slug}).lean().then((postagem) => {
			if(postagem) {
				res.render("postagem/index", {postagem: postagem})
			}else {
				req.flash("error_msg", "Está postagem não existe!")
				res.redirect("/")
			}
		}).catch((erro) => {
			req.flash("error_msg", "Houve um erro interno!")
			res.redirect("/")
		})
	})
	
	app.get("/categorias", (req, res) => {
		Categoria.find().lean().then((categorias) => {
			res.render("categorias/index", {categorias: categorias})
		}).catch((erro) => {
			req.flash("error_msg", "Houve um erro ao listar as categorias!")
			res.redirect("/")
		})
	})
	
	app.get("/categorias/:slug", (req, res) => {
		Categoria.findOne({slug: req.params.slug}).lean().then((categoria) => {
			if(categoria) {
				Postagem.find({categoria: categoria._id}).lean().then((postagens) => {
					res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
				}).catch((erro) => {
					req.flash("error_msg", "Houve um erro ao listar as postagens!")
					res.redirect("/categorias")
				})
			}
			else {
				req.flash("error_msg", "Está categoria não existe!")
				res.redirect("/categorias")
			}
		}).catch((erro) => {
			req.flash("error_msg", "Houve um erro ao carregar a página dessa categoria!")
			res.redirect("/categorias")
		})
	})
	
	app.use('/admin', admin)
	app.use('/usuarios', usuarios)

//Outros
const PORT = 8081

app.listen(PORT, function(){ //Precisar ser a ultima linha do codigo
	console.log("Servidor Rodando!");
});