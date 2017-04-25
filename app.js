let app = require('http').createServer(require('./server/static-handler'));
let io = require('socket.io')(app);

let WarlockServer = require('./server/warlock-server');
const server = new WarlockServer(io);

app.listen(8080);
