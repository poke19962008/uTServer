var express  = require('express');
var fs = require('fs');
var path = require('path');
var targz = require('tar.gz');
var rmdir = require('rimraf');

var app = express();

app.use(express.static(__dirname + "/public"));

app.get('/getFileList', function(req, res){
	var fl = fs.readdirSync(__dirname + "/data");

	for(var i =0; i<fl.length; i++){
		var ext =	path.extname(__dirname + "/data/" + fl[i]);

		if(ext == ""){
			targz().createReadStream('./data/' + fl[i]).pipe(fs.createWriteStream('./data/'+ fl[i] +'.tar.gz'));
			rmdir(__dirname + "/data/" + fl[i], function(err){
				console.log('[ERROR] Cannot delete ' + fl[i]);
			});
			fl[i] = fl[i] +'.tar.gz';
		}
	}
	res.send(fl);

});


app.get('/downloadFile', function (req, res){
	var q = req.query;
	res.download(__dirname + "/data/" + q.file, q.file, function (err) {
		if(err)	console.log(err);
	});

});

app.get('/deleteFile', function (req, res){
	var q = req.query;
	fs.unlink(__dirname + "/data/" + q.file, function (err){
		if(err)
			res.send('error');
		else
			res.send('success');
	});

});

app.listen(3600, function (){
	console.log('Listening on port 3600');

});
