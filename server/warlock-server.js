let Vector2 = require('./vector2');
let Player = require('./player');

module.exports = class WarlockServer {
    constructor() {
        this.__idSequence = 0;
    }

    handleConnection(socket) {
        this.__idSequence += 1;
        let currentPlayer = new Player(this.__idSequence);

        socket.emit('connected', {id: currentPlayer.id});

        socket.on('move', (move) => {
            currentPlayer.move(
                new Vector2(move.x, move.y)
            );

            socket.emit(
                'moved',
                {id: currentPlayer.id, x: currentPlayer.x, y: currentPlayer.y}
            );

            console.log('Move:', {id: currentPlayer.id, x: currentPlayer.x, y: currentPlayer.y});
        });

        socket.on('disconnect', (reason) => {
            console.log('Player', currentPlayer.id, 'disconnected, reason:', reason);

            socket.emit('disconnected', {id: currentPlayer.id});
        });
    }
};
