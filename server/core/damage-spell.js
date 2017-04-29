let Missile = require('./missile');

const DAMAGE = 10;

/**
 * Базовый класс для скиллов, которые наносят урон
 *
 * @type {DamageSpell}
 */
module.exports = class DamageSpell extends Missile {
    /**
     * @param {Number} direction - направление движения
     * @param {Player} parent - игрок, который создал этот DamageSpell
     */
    constructor(direction, parent) {
        super(direction, parent);
    }

    /**
     * нанесение урона сущности
     *
     * @param {Entity} damagedEntity - сущность, которой будет нанесён урон
     */
    hurt(damagedEntity) {
        damagedEntity.onDamaged(this, DAMAGE);
    }
}
