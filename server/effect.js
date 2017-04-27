module.exports = class Effect {
    constructor() {
        this.__duration = 0; // Длительность в секундах
        this.__applicant = null; // Сущность, к которой применен эффект
    }

    /**
     * Применить эффект к сущности
     *
     * @param {Player} entity
     */
    applyTo(entity) {
        this.__applicant = entity;
        this.influence();
    }

    /**
     * Начинаем влиять на сущность
     */
    influence() {
        this.effect();
        setTimeout(() => {
            this.endEffect();
        }, this.__duration);
    }

    /**
     * Применяем эффект к сущности
     */
    effect() {

    }

    /**
     * Возвращаем всё как было
     */
    endEffect() {

    }

    get duration() {
        return this.__duration;
    }

    set duration(value) {
        this.__duration = value;
    }

    get applicant() {
        return this.__applicant;
    }
};