var app     =   require('http').createServer(handler);
var sys     =   require('util');
var fs      =   require('fs');
var io      =   require('socket.io').listen(app);

handler = function(request,response){
    response.writeHead(200,{
        'Content-Type': 'text/html'
    });
    
    var rs = fs.createReadStream(__dirname + '/template.html');
    sys.pump(rs,response);
}

io.sockets.on('connection', function(client){
    var username;
    
    client.send('Welcome to this socket.io chat server!');
    client.send('Please enter your username');
    
    client.on('message', function(message){
        if (!username){
            username = message;
            client.send('Welcome, '+username+'!');
            return;
        }
        socket.broadcast(username + ' sent:' + message);
    });
    
});

app.listen(4000);
