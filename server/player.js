let Vector2 = require('./vector2');
let Entity = require('./entity');

// Размеры игрока
const PLAYER_SIZE = 30;
// Скорость бега
const PLAYER_MOVE_SPEED = 10;

module.exports = class Player extends Entity {
    constructor(id) {
        super(PLAYER_SIZE);
        this.__id = id;
    }

    move(direction) {
        super.move(direction, PLAYER_MOVE_SPEED);
    }

    get id() {
        return this.__id;
    }
};