const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//Configurando mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/test", {
	useNewUrlParser:true,
    useUnifiedTopology: true
})
	.then(() => console.log('Conectado!'))
	.catch((erro) => console.log('Erro ao se conectar: '+erro));

//Model: usuarios

const UsuarioSchema = new Schema({ //Definindo model
	
	nome: {
		type: String, //texto
		require: true //campo obrigatório
	},
	sobrenome: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	},
	idade: {
		type: Number, //numero
		require: true
	},
	pais: {
		type: String,
	}
	
})

mongoose.model('usuarios', UsuarioSchema) //Definindo collection

//Criando Usuario
const Usuario = mongoose.model('usuarios')

new Usuario({ //não precisa ser colocado os dados em ordem
	nome: "Victor",
	sobrenome: "Lima",
	email: "victor@gmail.com",
	idade: 31,
	pais:"Brasil"
}).save().then(() => {
	console.log ("Usuario cadastrado com sucesso!")
}).catch((erro) => {
	console.log ("Erro ao cadastrar o usuario: " +erro)
})