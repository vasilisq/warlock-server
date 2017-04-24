let Vector2 = require('./vector2');
let Player = require('./player');


module.exports = class WarlockServer {
    constructor(io) {
        this.__idSequence = 0;
        this.__io = io;

        this.__io.on('connection', (socket) => {
            this.handleConnection(socket);
        });
    }

    handleConnection(socket) {
        this.__idSequence += 1;
        let currentPlayer = new Player(this.__idSequence);

        this.__io.emit('connected', {id: currentPlayer.id});

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
        });
    }
};
