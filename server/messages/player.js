let Message = require('../core/message');

/**
 * Сообщения игрока
 */
module.exports = {
    Connected: class ConnectedMessage extends Message {
        constructor() {
            super('connected');
        }

        withPlayer(player) {
            super.withPlayer(player);

            // Информация о максимальном здоровье игрока
            super.DTO.Player.maxHP = player.maxHealth;

            return this;
        }
    },

    Moved: class MovedMessage extends Message {
        constructor() {
            super('moved');
        }
    },

    Damaged: class DamagedMessage extends Message {
        constructor() {
            super('playerDamaged');
        }

        withPlayer(player) {
            super.withPlayer(player);

            // Включить информацию о здоровье
            super.DTO.Player.health = player.health;

            return this;
        }
    },

    Died: class DiedMessage extends Message {
        constructor() {
            super('playerDied');
        }
    },

    Respawn: class ReSpawnMessage extends Message {
        constructor() {
            super('playerRespawn');
        }
    },

    Disconnected: class DisconnectedMessage extends Message {
        constructor() {
            super('disconnected');
        }
    },

    Players: class PlayersMessage extends Message {
        /**
         * @param {Player[]} players - Массив игроков
         */
        constructor(players) {
            super('players');

            // Здесь меняется структура сообщения
            this.DTO.Players = [];

            players.forEach((player) => {
                this.DTO.Players.push({
                    id: player.id,
                    position: {
                        x: player.x,
                        y: player.y
                    },
                    dimensions: player.dimensions
                });
            });
        }
    }
};