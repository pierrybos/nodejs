var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send('yay');
});

app.listen(3000, function(){
	console.log('servidor esta vivo!!! porta 3k');
});