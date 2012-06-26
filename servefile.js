var http = require('http');
var fs   = require('fs');

var file_path = __dirname+'/Venice.jpg';
fs.stat(file_path, function(err,stat){
    if (err){
	throw err;
    }

    http.createServer(function(request,response){
	response.writeHead(200,{
	    'Content-Type': 'image/jpeg',
	    'Content-Length': stat.size
	});

	//Pump pattern
	var rs = fs.createReadStream(file_path);
	rs.on('data', function(file_content){
	    var flushed = response.write(file_content);
	    //If there's still data to be read then pause for now
	    if (!flushed){
		rs.pause();
	    }
	});
	
	//When the reponse stream has been emptied, resume
	response.on('drain', function(){
	    rs.resume();
	});
	
	rs.on('end', function(){
	    response.end();
	});

    }).listen(4000);
});
