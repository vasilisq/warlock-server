let Vector2 = require('./vector2');
let Player = require('./player');
let EntityManager = require('./entity-manager');

module.exports = class WarlockServer {
    constructor(io) {
        this.__idSequence = 0;
        this.__io = io;
        this.__entityMgr = new EntityManager();

        this.__io.on('connection', (socket) => {
            this.handleConnection(socket);
        });
    }

    handleConnection(socket) {
        this.__idSequence += 1;
        let currentPlayer = new Player(this.__idSequence);

        // Add current player to scene
        this.__entityMgr.add('player' + currentPlayer.id, currentPlayer);

        this.__io.emit('connected', {id: currentPlayer.id});

        // Transmit players list
        socket.emit('players', this.__entityMgr.getAllBeginningWith('player'));

        socket.on('move', (move) => {
            currentPlayer.move(
                new Vector2(move.x, move.y)
            );

            this.__io.emit(
                'moved',
                {id: currentPlayer.id, x: currentPlayer.x, y: currentPlayer.y}
            );

            console.log('Move:', {id: currentPlayer.id, x: currentPlayer.x, y: currentPlayer.y});
        });

        socket.on('disconnect', (reason) => {
            console.log('Player', currentPlayer.id, 'disconnected, reason:', reason);

            this.__io.emit('disconnected', {id: currentPlayer.id});

            // Remove player from scene
            this.__entityMgr.remove('player' + currentPlayer.id);
        });
    }
};
