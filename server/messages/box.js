let Message = require('../core/message');

/**
 * Сообщения для ящиков
 */
module.exports = {
    BoxPickUp: class BoxPickUpMassage extends Message {
        constructor() {
            super('boxPickUp');
        }
    }

    BoxRespawn: class BoxRespawnMessage extends Message {
        constructor() {
            super('boxRespawn');
        }
    }
};
