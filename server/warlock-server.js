let Player = require('./entities/player');
let EntityManager = require('./core/entity-manager');
let app = require('http').createServer(require('./core/static-handler'));
let io = require('socket.io')(app);
let World = require('./entities/world');
let PlayerMessages = require('./messages/player');

class WarlockServer {
    constructor(io) {
        this.__io = io;
        this.__entityMgr = new EntityManager();

        this.__io.on('connection', (socket) => {
            this.handleConnection(socket);
        });

        app.listen(8080);
    }

    handleConnection(socket) {
        // Add current player to scene
        let currentPlayer = new Player(socket);

        // Transmit players list
        (new PlayerMessages.Players(
            this.__entityMgr.getAllBeginningWith('player')
        )).send(socket);

        socket.on('disconnect', (reason) => {
            console.log('Player', currentPlayer.id, 'disconnected, reason:', reason);

            (new PlayerMessages.Disconnected())
                .withPlayer(currentPlayer)
                .send();

            // Remove player from scene
            this.__entityMgr.remove(currentPlayer);
        });
    }

    initiateMap() {
        let world = new World();
        world.x = world.dimensions / 2;
        world.y = world.dimensions / 2;
    }

    broadcast(event, data) {
        this.__io.emit(event, data);
    }

    get entityMgr() {
        return this.__entityMgr;
    }
}

let server = new WarlockServer(io);
module.exports = server;
server.initiateMap();
