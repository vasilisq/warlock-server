let Message = require('../core/message');

module.exports = {
    Connected: class ConnectedMessage extends Message {
        constructor() {
            super('connected');
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
        }
    },

    Died: class DiedMessage extends Message {
        constructor() {
            super('playerDied');
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