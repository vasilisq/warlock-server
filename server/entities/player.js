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
const PLAYER_RESPAWN_TIME = 5; // seconds

/**
 * Сущность игрока
 *
 * @type {Player}
 */
module.exports = class Player extends Entity {
    constructor(playerSocket, nick) {
        super(PLAYER_SIZE, PLAYER_START_HEALTH);

        this.randomPosition();
        this.__health = PLAYER_START_HEALTH;
        this.speed = PLAYER_MOVE_SPEED;
        this.__nickname = nick;

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

        if(this.health > 0) {
            (new PlayerMessages.Damaged())
            .withPlayer(this)
            .withDamage(damage, damager)
            .send();
        }
    }

    /**
     * Действия при смерти игрока
     *
     * @param {Entity} killer
     */
    onDeath(killer, damage) {
        super.onDeath(killer);

        this.__reSpawnTimeout = setTimeout(() => {
            this.reSpawn();
        }, PLAYER_RESPAWN_TIME * 1000);

        (new PlayerMessages.Died())
            .withPlayer(this)
            .withDamage(damage, killer)
            .send();
    }

    /**
     * Действия при возрождении игрока
     */
    reSpawn() {
        super.reSpawn();

        (new PlayerMessages.Respawn())
            .withPlayer(this)
            .withVector(this.position)
            .send();
    }

    /**
     * Обработка коллизий движущейся сущностью
     *
     * @param {Entity} collidedWithEntity - Сущность, с которой произошло столкновение
     */
    onCollide(collidedWithEntity) {
        // переписать этот говнокод
        if (!(collidedWithEntity instanceof Player)) {
            collidedWithEntity.onCollide(this);
        }
    }

    get nickname() {
        return this.__nickname;
    }
};
