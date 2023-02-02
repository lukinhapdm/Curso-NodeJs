const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

require("../models/Usuario")
const Usuario = mongoose.model("usuarios")



module.exports = function(passport) {
	
	passport.use(new localStrategy({usernameField: 'email'}, (email, senha, done) => {
		Usuario.findOne({email: email}).then((usuario) => {
			if(!usuario){
				return done(null, false, {message: "Essa conta não existe!"})
			}
			
			bcrypt.compare(senha, usuario.senha, (erro, equivalem) => {
				if(equivalem){
					return done(null, user)
				}else{
					return done(null, false, {message: "Senha incorreta!"})
				}
			})
		})
	}))
	
	passport.serializeUser((usuario, done) => {
		done(null, usuario.id)
	})
	
	passport.deserializeUser((id, done) => {
		User.findById(id, (erro, usuario) => {
			done(erro, user)
		})
	})
	
}