let Entity = require('./entity');
let Vector2 = require('./vector2');
let World = require('./world');

const MISSILE_SIZE = 15;
const MISSILE_SPEED = 30;

module.exports = class Missile extends Entity {
    constructor(direction, parent) {
        super(MISSILE_SIZE);

        this.__direction = direction;

        // TODO: переписать расчёт стартовой позиции
        //this.x = parent.x + parent.dimensions * 2 * this.__direction.x;
        //this.y = parent.y + parent.dimensions * 2 * this.__direction.y;
        this.x = 50;
        this.y = 50;

    }

    /**
     * Физическая логика обрабатывается здесь
     *
     * @param deltaT
     */
    think(deltaT) {
        super.move(this.__direction, MISSILE_SPEED * deltaT);
        console.log(this.name + ' x:' + this.x + ' y:' + this.y);
    }

    onCollide(entity) {
        if(entity instanceof World) {
            console.log(this.name + ' removed by ' + entity.name);
            this.server.entityMgr.remove(this);
        }
    }
}