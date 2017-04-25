let Vector2 = require('./vector2');
let Player = require('./player');
let EntityManager = require('./entity-manager');
let World = require('./world');

module.exports = class WarlockServer {
    constructor(io) {
        this.__idSequence = 0;
        this.__io = io;
        this.__entityMgr = new EntityManager();

        this.__entityMgr.add('world', new World());

        this.__io.on('connection', (socket) => {
            this.handleConnection(socket);
        });
    }

    handleConnection(socket) {
        this.__idSequence += 1;
        let currentPlayerId = this.__idSequence;
        let playerEntityName = 'player' + currentPlayerId;

        // Add current player to scene
        this.__entityMgr.add(playerEntityName, new Player(currentPlayerId));

        this.__io.emit('connected', {id: currentPlayerId});

        // Transmit players list
        socket.emit('players', this.__entityMgr.getAllBeginningWith('player'));

        socket.on('move', (move) => {
            this.__entityMgr.move(playerEntityName, new Vector2(move.x, move.y), 10);

            this.__io.emit(
                'moved',
                {
                    id: currentPlayerId,
                    x: this.__entityMgr.get(playerEntityName).x,
                    y: this.__entityMgr.get(playerEntityName).y
                }
            );
        });

        socket.on('disconnect', (reason) => {
            console.log('Player', currentPlayerId, 'disconnected, reason:', reason);

            this.__io.emit('disconnected', {id: currentPlayerId});

            // Remove player from scene
            this.__entityMgr.remove(playerEntityName);
        });
    }
};
