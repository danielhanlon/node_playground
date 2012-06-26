var http=require('http');

var spawn = require('spawn').spawn;

http.createServer(function(request, response){
    response.write(200,{
        'Content-Type' : 'text/plain'
    });
    
    //For each new request spawn a new child process
    var tail_child = spawn('tail', ['-f', '/var/log/system.log']);
    
    //bind to the stdout
    tail_child.stdout.on('data', function(data){
       //Called every time there is data on standard out
       //Data is already buffered by Node.js
       console.log(data.toString());
       response.write(data);
    });
}).listen(4000);