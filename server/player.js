let Vector2 = require('./vector2');
let Entity = require('./entity');

// Размеры игрока
const PLAYER_SIZE = 30;
// Скорость бега
const PLAYER_MOVE_SPEED = 10;

module.exports = class Player extends Entity {
    constructor(id, playerSocket) {
        super(PLAYER_SIZE);
        this.__id = id;

        this.server.broadcast('connected', {id: this.__id});
        playerSocket.on('move', this.onMove);
    }

    onMove() {
        // TODO: Implement
    }

    move(direction) {
        super.move(direction, PLAYER_MOVE_SPEED);

        this.server.broadcast('moved', {
            id: this.id,
            x: this.x,
            y: this.y
        });
    }

    get id() {
        return this.__id;
    }
};