/**
 * Базовый класс для WS сообщений
 *
 * @type {Message}
 */
module.exports = class Message {
    /**
     * @param {string} messageName - Имя сообщения (io-event'а)
     */
    constructor(messageName) {
        this.__dto = {};
        this.__name = messageName;
    }

    /**
     * Включить сущность в сообщение
     *
     * @param {Entity} entity
     * @returns {Message}
     */
    withEntity(entity) {
        this.__dto.With = {
            id: entity.id,
            entityClass: entity.constructor.name.toLowerCase(),
            dimensions: entity.dimensions
        };

        return this;
    }

    /**
     * Включить игрока в сообщение
     *
     * @param {Player} player
     * @returns {Message}
     */
    withPlayer(player) {
        this.__dto.Player = {
            id: player.id
        };

        return this;
    }

    /**
     * Включить вектор в сообщение
     *
     * @param {Vector2} vector
     * @returns {Message}
     */
    withVector(vector) {
        this.__dto.Vector = {
            x: vector.x,
            y: vector.y
        };

        return this;
    }

    /**
     * Включить информацию о повреждениях в сообщение
     *
     * @param {Number} damage
     * @param {Entity} damager
     * @returns {Message}
     */
    withDamage(damage, damager) {
        this.__dto.Damage = damage;
        this.__dto.Damager = {
            id: damager.id,
            entityClass: damager.constructor.name.toLowerCase(),
        };

        return this;
    }

    /**
     * Отправляем сообщение
     *
     * @param {null|Socket} to - Если указан - отправляем по данному сокету, или броадкаст
     */
    send(to = null) {
        console.log('Sending', this.__name, this.__dto);

        if(to === null) {
            this.server.broadcast(this.__name, this.__dto);
        } else {
            to.emit(this.__name, this.__dto);
        }
    }

    get server() {
        return require('../warlock-server');
    }

    get DTO() {
        return this.__dto;
    }

    set dto(value) {
        this.__dto = value;
    }
};