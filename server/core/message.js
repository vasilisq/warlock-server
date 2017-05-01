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
     * Отправляем сообщение
     *
     * @param {null|Socket} to - Если указан - отправляем по данному сокету, или броадкаст
     */
    send(to = null) {
        if(to === null) {
            this.server.broadcast(this.__name, this.__dto);
        } else {
            to.emit(this.__name, this.__dto);
        }
    }

    get server() {
        return require('../warlock-server');
    }
};