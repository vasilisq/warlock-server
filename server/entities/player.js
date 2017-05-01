let Vector2 = require('../core/vector2');
let Entity = require('../core/entity');
let DamageSpell = require('../core/damage-spell');
let EffectSpell = require('../core/effect-spell');
let PlayerMessages = require('../messages/player');

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

        (new PlayerMessages.Connected())
            .withPlayer(this)
            .withVector(this.position)
            .send();

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

    /**
     * Двигаем объект, проверяем коллизию
     *
     * @param {Vector2} direction Направление
     */
    move(direction) {
        super.move(direction, this.speed);

        (new PlayerMessages.Moved())
            .withPlayer(this)
            .withVector(this.position)
            .send();
    }

    /**
     * Действия при получении урона сущностью
     *
     * @param {Entity} damager - кто нанёс урон
     * @param {Number} damage - количество урона
     */
    onDamaged(damager, damage) {
        super.onDamaged(damager, damage);

        (new PlayerMessages.Damaged())
            .withPlayer(this)
            .withDamage(damage, damager)
            .send();

        if(this.health <= 0) {
            this.destruct(damager);
        }
    }

    /**
     * Удаление сущности
     *
     * @param {Entity} killer - сущность, которая вызвала удаление текущей сущности
     */
    destruct(killer) {
        super.destruct(killer);
        
        (new PlayerMessages.Died())
            .withPlayer(this)
            .withEntity(killer)
            .send();
    }
};
