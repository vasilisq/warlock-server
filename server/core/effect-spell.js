let Missile = require('./missile');
let Freeze = require('../effects/freeze');

const DAMAGE = 10;

/**
 * Базовый класс для скиллов, которые вешают бафф/дебафф
 *
 * @type {EffectSpell}
 */
module.exports = class EffectSpell extends Missile {
    /**
     * @param {Number} direction - направление движения
     * @param {Player} parent - игрок, который создал этот EffectSpell
     */
    constructor(direction, parent) {
        super(direction, parent);
    }

    /**
     * Навешивание баффа/дебаффа на сущность
     *
     * @param {Entity} damagedEntity - сущность, на которую будет повешен бафф/дебафф
     */
    hurt(damagedEntity) {
        (new Freeze()).applyTo(damagedEntity);
    }
}
