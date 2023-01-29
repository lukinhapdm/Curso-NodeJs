const express = require("express");
const mongoose = require("mongoose")

const router = express.Router();

require("../models/Categoria")
const Categoria = mongoose.model("categorias")

router.get('/', function(req, res){
	res.render("admin/index")
})

router.get('/posts', (req, res) => {
	res.send("Página de posts")
})

router.get('/categorias', (req, res) => {
	Categoria.find().sort({date: 'desc'}).then((categorias) => {
		res.render("admin/categorias", {categorias: categorias.map(categorias => categorias.toJSON()) //A função dentro do objeto é para converter o arquivo para json
})
	}).catch((erro) => {
		req.flash("error_msg", "Houve um erro ao listar as categorias!")
		res.redirect("/admin")
	})
})

router.get('/categorias/add', (req, res) => {
	res.render("admin/addcategorias")
})

router.post('/categorias/nova', (req, res) => {
	
	var erros = []
	
	if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
		erros.push({texto: "Nome inválido!"})
	}
	
	if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
		erros.push({texto: "Slug inválido!"})
	}
	
	if (req.body.nome.length < 2) {
		erros.push({texto: "Nome da categoria muito pequeno"})
	}
	
	if (erros.length > 0) {
		res.render("admin/addcategorias", {erros: erros})
	}
	
	else {
		const novaCategoria = {
			nome: req.body.nome,
			slug: req.body.slug
		}
	
		new Categoria(novaCategoria).save().then(() => {
			req.flash("success_msg", "Categoria criada com sucesso!")
			res.redirect("/admin/categorias")
		}).catch((erro) => {
			req.flash("error_msg", "Houve um erro ao criar a categoria, tente novamente!")
			res.redirect("/admin")
		})
	}
	
})

module.exports = router