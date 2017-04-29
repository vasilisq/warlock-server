let Entity = require('./entity');
let Vector2 = require('./vector2');
let World = require('../entities/world');

const MISSILE_SIZE = 15;
const MISSILE_SPEED = 30;

/**
 * Базовый класс для всех скиллов
 *
 * @type {Missile}
 */
module.exports = class Missile extends Entity {
    /**
     * @param {Number} direction - направление движения
     * @param {Player} parent - игрок, который создал этот missile
     */
    constructor(direction, parent) {
        super(MISSILE_SIZE);

        this.__direction = direction;
        this.speed = MISSILE_SPEED;
        this.__creator = parent; 

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
            speed: this.speed,
            dT: this.server.entityMgr.lastDt
        });
    }

    get creator() {
        return this.__creator;
    }

    /**
     * Физическая логика обрабатывается здесь
     *
     * @param {Number} deltaT
     */
    think(deltaT) {
        super.move(this.__direction, this.speed * deltaT);
    }

    /**
     * Обработка коллизий движущейся сущностью
     *
     * @param {Entity} collidedWithEntity - Сущность, с которой произошло столкновение
     */
    onCollide(collidedWithEntity) {
        this.hurt(collidedWithEntity);
        this.destruct(collidedWithEntity);
    }

    /**
     * Удаление сущности
     *
     * @param {Entity} killer - сущность, которая вызвала удаление текущей сущности
     */
    destruct(killer) {
        super.destruct(killer);
        
        this.server.broadcast('missileEndMove', {
            id: this.id,
            x: this.x,
            y: this.y
        });
    }
};
