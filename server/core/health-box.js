let Box = require('./box');

module.exports = class HealthBox extends Box {
    constructor() {
        super();
    }

    onCollide(collidedWithEntity) {
        super.onCollide(collidedWithEntity);
        
        collidedWithEntity.heal(collidedWithEntity.maxHealth);
    }
};
