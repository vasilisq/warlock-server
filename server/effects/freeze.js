/**
 * Заморозка. Должен уменьшить скорость
 *
 * @type {Freeze}
 */

let Effect = require('../effect');

const FREEZE_DURATION = 5;

module.exports = class Freeze extends Effect {
    constructor() {
        this.duration = FREEZE_DURATION;
    }

    effect() {
        
    }
};