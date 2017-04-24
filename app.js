let app = require('http').createServer(function (data) {

});
let io = require('socket.io')(app);
let fs = require('fs');
let WarlockServer = require('./server/warlock-server');
const server = new WarlockServer(io);

app.listen(8080);