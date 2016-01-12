var express  = require('express');
var fs = require('fs');

var app = express();

app.get('/downloads', function(req, res){
	var foo = fs.readdirSync(__dirname + "/data");
	res.send(foo);

});

app.listen(3600, function (){
	console.log('Listening on port 3600');

});
