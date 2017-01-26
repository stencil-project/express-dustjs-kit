var server = require('./server');

var serverPort = process.env.PORT || 3000;

server.listen(serverPort, function() {
    console.log('Express-DustJS server listening on port ' + serverPort);
});
