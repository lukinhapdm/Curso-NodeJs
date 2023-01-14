const express = require("express");
const app = express();

app.get("/", function(req, res){
	res.send("Welcome to my app!");
});

app.get("/about", function(req, res){
	res.send("My About page");
});

app.get("/blog", function(req, res){
	res.send("Welcome to my blog!");
});

app.get("/hello/:nome/:cargo/:idade", function(req, res){ //o : quer dizer que o que será colocado vai ser uma parâmetro
	res.send("<h1>Hello "+req.params.nome+"</h1>"+"<h2>Your occpation is "+req.params.cargo+"</h2>"+"<h3>Your are "+req.params.idade+" years old</h3>"); //só é possível enviar um send por função de rota
});

app.listen(8081, function(){ //precisar ser a ultima linha do codigo
	console.log("The Server is runnig on the url http://localhost:8081");
});
//function do app.listen é uma callback