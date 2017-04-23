let app = require('http').createServer(function (data) {

});
let io = require('socket.io')(app);
let fs = require('fs');
let WarlockServer = require('./server/warlock-server');
const server = new WarlockServer();

app.listen(8080);

io.on('connection', function (socket) {
    server.handleConnection(socket);
});