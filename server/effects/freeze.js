/**
 * Заморозка. Должен уменьшить скорость
 *
 * @type {Freeze}
 */

let Effect = require('../core/effect');

const FREEZE_DURATION = 5;
const FREEZE_SLOW_FACTOR = 2;

module.exports = class Freeze extends Effect {
    constructor() {
        super();
        this.duration = FREEZE_DURATION;
        this.__oldSpeed = null;
    }

    effect() {
        this.__oldSpeed = this.applicant.speed;

        // Уменьшаем скорость игрока в N раз:
        this.applicant.speed /= FREEZE_SLOW_FACTOR;
    }

    endEffect() {
        // Возвращаем обратно
        this.applicant.speed = this.__oldSpeed;
    }
};