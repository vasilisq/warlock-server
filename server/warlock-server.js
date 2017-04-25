let Vector2 = require('./vector2');
let Player = require('./player');
let EntityManager = require('./entity-manager');
let app = require('http').createServer(require('./static-handler'));
let io = require('socket.io')(app);

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
        let playerEntityName = 'player' + currentPlayerId;

        // Add current player to scene
        this.__entityMgr.add(playerEntityName, new Player(currentPlayerId, socket));

        // Transmit players list
        socket.emit('players', this.__entityMgr.getAllBeginningWith('player'));

        socket.on('move', (move) => {
            this.__entityMgr.move(playerEntityName, new Vector2(move.x, move.y), 10);
        });

        socket.on('disconnect', (reason) => {
            console.log('Player', currentPlayerId, 'disconnected, reason:', reason);

            this.__io.emit('disconnected', {id: currentPlayerId});

            // Remove player from scene
            this.__entityMgr.remove(playerEntityName);
        });
    }

    broadcast(event, data) {
        this.__io.emit(event, data);
    }
}

module.exports = new WarlockServer(io);