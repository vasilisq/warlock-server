let Vector2 = require('../core/vector2');
let Entity = require('../core/entity');
let DamageSpell = require('../core/damage-spell');
let EffectSpell = require('../core/effect-spell');

// Размеры игрока
const PLAYER_SIZE = 30;
// Скорость бега
const PLAYER_MOVE_SPEED = 10;
const PLAYER_START_HEALTH = 30;

/**
 * Сущность игрока
 *
 * @type {Player}
 */
module.exports = class Player extends Entity {
    constructor(playerSocket) {
        super(PLAYER_SIZE);

        this.__health = PLAYER_START_HEALTH;
        this.speed = PLAYER_MOVE_SPEED;

        this.server.broadcast('connected', {id: this.__id});

        // Subscribe to player's events
        playerSocket.on('move', (move) => {
            this.move(new Vector2(move.x, move.y));
        });

        playerSocket.on('left', (data) => {
            new DamageSpell(new Vector2(data.a, data.b), this);
        });

        playerSocket.on('right', (data) => {
            new EffectSpell(new Vector2(data.a, data.b), this);
        });
    }

    move(direction) {
        super.move(direction, this.speed);

        this.server.broadcast('moved', {
            id: this.id,
            x: this.x,
            y: this.y
        });
    }

    onDamaged(damager, damage) {
        super.onDamaged(damager, damage);

        this.server.broadcast('playerDamaged', {
            id: this.id,
            damage: damage,
            hp: this.health,
            damagerId: damager.creator.id
        });

        if(this.health <= 0) {
            this.destruct(damager);
        }
    }

    destruct(killer) {
        super.destruct(killer);
        
        this.server.broadcast('playerDied', {
            id: this.id,
            killerId: killer.creator.id
        });
    }
};