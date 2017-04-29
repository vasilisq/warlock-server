let Missile = require('./missile');

const DAMAGE = 10;

module.exports = class DamageSpell extends Missile {
	constructor(direction, parent) {
		super(direction, parent);
	}

	hurt(damagedEntity) {
        damagedEntity.onDamaged(this, DAMAGE);
    }
}