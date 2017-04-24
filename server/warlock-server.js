let Vector2 = require('./vector2');
let Player = require('./player');

module.exports = class WarlockServer {
    constructor(io) {
        this.__idSequence = 0;
        this.__io = io;
        this.__players = new Map();

        this.__io.on('connection', (socket) => {
            this.handleConnection(socket);
        });
    }

    handleConnection(socket) {
        this.__idSequence += 1;
        let currentPlayer = new Player(this.__idSequence);
        // Add current player to stack
        this.__players.set(currentPlayer.id, currentPlayer);

        this.__io.emit('connected', {id: currentPlayer.id});

        // Transmit players list
        socket.emit('players', Array.from(this.__players.values()));

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

            // Remove player from stack
            this.__players.delete(currentPlayer.id);
        });
    }
};
