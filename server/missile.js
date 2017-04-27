let Entity = require('./entity');
let Vector2 = require('./vector2');
let World = require('./world');
let Player = require('./player');

const MISSILE_SIZE = 15;
const MISSILE_SPEED = 30;
const DAMAGE_TO_PLAYER = 10;

module.exports = class Missile extends Entity {
    constructor(direction, parent) {
        super(MISSILE_SIZE);

        this.__direction = direction;

        console.log(this.__direction);

        // TODO: переписать расчёт стартовой позиции
        this.x = parent.x + parent.dimensions * 2 * this.__direction.x;
        this.y = parent.y + parent.dimensions * 2 * this.__direction.y;

        this.server.broadcast('missileStartMove', {
            id: this.id,
            x: this.x,
            y: this.y,
            dimensions: MISSILE_SIZE,
            direction: {
                x: this.__direction.x,
                y: this.__direction.y
            },
            speed: MISSILE_SPEED,
            dT: this.server.entityMgr.lastDt
        });
    }

    /**
     * Физическая логика обрабатывается здесь
     *
     * @param deltaT
     */
    think(deltaT) {
        super.move(this.__direction, MISSILE_SPEED * deltaT);
    }

    onCollide(entity) {
        if(entity instanceof Player) {
            entity.hurt(DAMAGE_TO_PLAYER);
        }

        this.destruct(entity);
    }

    destruct(killer) {
        super.destruct(killer);
        
        this.server.broadcast('missileEndMove', {
            id: this.id,
            x: this.x,
            y: this.y
        });
    }
};