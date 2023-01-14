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

app.listen(8081, function(){ //precisar ser a ultima linha do codigo
	console.log("The Server is runnig on the url http://localhost:8081");
});
//function do app.listen é uma callback