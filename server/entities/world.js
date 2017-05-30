let Entity = require('../core/entity');

// Размеры мира
const WORLD_SIZE = 1000;

/**
 * Сущность мира
 *
 * @type {World}
 */
module.exports = class World extends Entity {
    constructor() {
        super(WORLD_SIZE);

        this.entityManager.worldSize = WORLD_SIZE;
    }

    /**
     * Возможно ли движение относительно данной сущности
     *
     * @param {Entity} entity Сущность, которая проверяется
     * @param {Vector2} direction Направление этой сущности
     * @param {Number} factor Скорость сущности
     * @returns {boolean}
     */
    movePossibleAgainst(entity, direction, factor) {
        return (entity.x + direction.x * factor) > (this.x + this.dimensions / 2) ||
            (entity.x + direction.x * factor) < (this.x - this.dimensions / 2) ||
            (entity.y + direction.y * factor) > (this.y + this.dimensions / 2) ||
            (entity.y + direction.y * factor) < (this.y - this.dimensions / 2);
    }

    onDamaged(damager, damage) {
        return;
    }
};
