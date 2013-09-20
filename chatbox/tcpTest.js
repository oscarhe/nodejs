var net = require('net');

var chatServer = net.createServer();

var clientList = [];

chatServer.on('connection', function(client) {
    
    client.name = client.remoteAddress + ':' + client.remotePort;
    
    client.write('Hi ' + client.name + '!\n');
    
    console.log(client.name + ' joined chat');
    
   clientList.push(client);
   
   client.on('data', function(data) {
    
        broadcast(data, client);
    
   });
   
   client.on('end', function() {
    
        console.log(client.name + ' quit chat');
        clientList.splice(clientList.indexOf(client), 1);
    
   });
   
   client.on('error', function(e) {
    
        console.log(e);
    
   });

});

function broadcast(message, client) {
    
    var cleanup = [];
    
    for (var i = 0; i < clientList.length; i++) {
        if (client !== clientList[i]) {
            
            if (clientList[i].writable) {
                clientList[i].write(client.name + ": " + message);
            } else {
                cleanup.push(clientList[i]);
                clientList[i].destroy();
            }
    
        }
    }
    
    // Remove after loop so as to avoid side effects
    for (i = 0; i < cleanup.length; i++){
        clientList.splice(clientList.indexOf(cleanup[i]), 1);
    }
}

chatServer.listen(9000);
