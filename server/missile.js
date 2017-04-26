let Entity = require('./entity');
let Vector2 = require('./vector2');

const MISSILE_SIZE = 15;
const MISSILE_SPEED = 30;

module.exports = class Missile extends Entity {
    constructor(direction, parent) {
        super(MISSILE_SIZE);

        this.__direction = direction;

        this.position = new Vector2(parent.x + parent.dimensions * __direction, 
            parent.y + parent.dimensions * __direction);

        this.server.broadcast('moved', {
            id: this.id,
            x: this.x,
            y: this.y
        });
    }

    /**
     * Физическая логика обрабатывается здесь
     *
     * @param deltaT
     */
    think(deltaT) {
        super.move(this.__direction, MISSILE_SPEED * deltaT);

        this.server.broadcast('moved', {
            id: this.id,
            x: this.x,
            y: this.y
        });
    }
}