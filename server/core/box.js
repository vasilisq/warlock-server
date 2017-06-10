let Entity = require('../core/entity');
let BoxMessages = require('../messages/box');

// Размер ящика
const BOX_SIZE = 30;
// Промежуток времени в сек., через который возможнен респавн ящика.
const BOX_RESPAWN_TIME_MIN = 25;
const BOX_RESPAWN_TIME_MAX = 35;

module.exports = class Box extends Entity {
    constructor() {
        super(BOX_SIZE);

        this.__isDead = true;
        
        let respTime = Math.random() * (BOX_RESPAWN_TIME_MAX - BOX_RESPAWN_TIME_MIN) + BOX_RESPAWN_TIME_MIN;
        
        this.__reSpawnTimeout = setTimeout(() => {
            this.reSpawn();
        }, respTime * 1000);
    }

    move() {
        // nothing
    }

    onDamaged() {
        // nothing
    }

    onCollide(collidedWithEntity) {
        this.onDeath(collidedWithEntity);
    }

    onDeath(killer){
        super.onDeath(killer);

        let respTime = Math.random() * (BOX_RESPAWN_TIME_MAX - BOX_RESPAWN_TIME_MIN) + BOX_RESPAWN_TIME_MIN;

        this.__reSpawnTimeout = setTimeout(() => {
            this.reSpawn();
        }, respTime * 1000);

        (new BoxMessages.BoxPickUp())
            .withEntity(this)
            .send();
    }

    reSpawn() {
        super.reSpawn();
                
        (new BoxMessages.BoxRespawn())
            .withEntity(this)
            .withVector(this.position)
            .send();
    }
};
