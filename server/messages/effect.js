let Message = require('../core/message');

/**
 * Сообщения Effect
 */
module.exports = {
    effectApplied: class EffectAppliedMessage extends Message {
        constructor() {
            super('effectApplied');
        }

        /**
     	 * Включить эффект в сообщение
    	 *
    	 * @param {Effect} effect
    	 * @returns {Message}
    	 */
    	withEffect(effect) {
        	this.DTO.Effect = {
            	effectClass: effect.constructor.name.toLowerCase(),
            	duration: effect.duration
        	};

        	return this;
    	}
    }
};