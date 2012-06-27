var http=require('http');
var fs=require('fs');

var file_path = __dirname + '/Venice.jpg';

fs.stat(file_path, function(err,stat){
    http.createServer(function(req,res){
	res.writeHead(200,{
	    'Content-Type': 'image/jpeg',
	    'Content-Length': stat.size
	});
	
	var rs = fs.createReadStream(file_path);
	rs.on('data', function(data){
	    if (!res.write(data)){
		rs.pause();
	    }
	});
	
	//    res.on('drain', rs.resume);
	res.on('drain', function(){
	    rs.resume();
	});

	//	rs.on('end', res.end);
	rs.on('end', function(){
	    res.end();
	});
    }).listen(4000);
});
	
