let Message = require('../core/message');

/**
 * Сообщения Missile
 */
module.exports = {
    startMove: class StartMoveMessage extends Message {
        constructor() {
            super('missileStartMove');
        }

        /**
         * Включаем информцию о Missile
         *
         * @param {Missile} missile
         */
        withMissile(missile) {
            super.withEntity(missile);
            super.withVector(missile.position);

            this.DTO.Direction = {
                x: missile.direction.x,
                y: missile.direction.y
            };

            this.DTO.Speed = missile.speed;

            return this;
        }
    },

    endMove: class EndMoveMessage extends Message {
        constructor() {
            super('missileEndMove');
        }
    }
};