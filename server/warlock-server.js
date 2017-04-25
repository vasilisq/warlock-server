let Vector2 = require('./vector2');
let Player = require('./player');
let EntityManager = require('./entity-manager');
let app = require('http').createServer(require('./static-handler'));
let io = require('socket.io')(app);
let World = require('./world');

class WarlockServer {
    constructor(io) {
        this.__idSequence = 0;
        this.__io = io;
        this.__entityMgr = new EntityManager();

        this.__io.on('connection', (socket) => {
            this.handleConnection(socket);
        });

        app.listen(8080);
    }

    handleConnection(socket) {
        this.__idSequence += 1;
        let currentPlayerId = this.__idSequence;

        // Add current player to scene
        let currentPlayer = new Player(currentPlayerId, socket);

        // Transmit players list
        socket.emit('players', this.__entityMgr.getAllBeginningWith('player'));

        socket.on('disconnect', (reason) => {
            console.log('Player', currentPlayerId, 'disconnected, reason:', reason);

            this.broadcast('disconnected', {id: currentPlayerId});

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
