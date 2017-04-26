let Entity = require('./entity');
let Vector2 = require('./vector2');
let World = require('./world');

const MISSILE_SIZE = 15;
const MISSILE_SPEED = 30;

module.exports = class Missile extends Entity {
    constructor(direction, parent) {
        super(MISSILE_SIZE);

        this.__direction = direction;

        console.log(this.__direction);

        // TODO: переписать расчёт стартовой позиции
        this.x = parent.x + parent.dimensions * 2 * this.__direction.x;
        this.y = parent.y + parent.dimensions * 2 * this.__direction.y;
        this.timeout = null;

    }

    /**
     * Физическая логика обрабатывается здесь
     *
     * @param deltaT
     */
    think(deltaT) {
        super.move(this.__direction, MISSILE_SPEED * deltaT);

        if(this.timeout === null)
        this.timeout = setTimeout(() => {
            this.server.broadcast('missile_move', {id: this.id, x:this.x, y:this.y});
            console.log(this.name + ' x:' + this.x + ' y:' + this.y);
            this.timeout = null;
        }, 1000);
    }

    onCollide(entity) {
        console.log(entity.name, 'removed by', this.name);
            this.server.broadcast('collision', this.__position);
            this.server.entityMgr.remove(entity);

    }
};