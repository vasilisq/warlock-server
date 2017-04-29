let Missile = require('./missile');
let Freeze = require('../effects/freeze');

const DAMAGE = 10;

module.exports = class EffectSpell extends Missile {
    constructor(direction, parent) {
        super(direction, parent);
    }

    hurt(damagedEntity) {
        (new Freeze()).applyTo(damagedEntity);
    }
}