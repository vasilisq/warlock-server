let World = require('../entities/world');
let Entity = require('./entity');
let Player = require('../entities/player');
let Missile = require('./missile');

/**
 * Менеджер сущностей
 *
 * @type {EntityManager}
 */
module.exports = class EntityManager {
    constructor() {
        this.__entities = new Map();
        this.__sequences = new Map();
        this.__lastDt = 0;

        this.startTicking();
    }

    /**
     * Вызываем think у всех сущностей, считая dT
     */
    startTicking() {
        const DELTA_T_SLOWDOWN_COEFFICIENT = 1000000;

        let onTick = (previousT) => {
            let now = process.hrtime()[1];
            let deltaT = now - previousT;

            this.__entities.forEach((entity) => {
                // Синхронизируем с клиентом
                this.__lastDt = deltaT / DELTA_T_SLOWDOWN_COEFFICIENT;

                entity.think(deltaT / DELTA_T_SLOWDOWN_COEFFICIENT);
            });

            setImmediate(() => {
                onTick(process.hrtime()[1]);
            });
        };

        onTick(process.hrtime()[1]);
    }

    /**
     * Добавить сущность на сцену
     *
     * @param {Entity} entity
     */
    add(entity) {
        this.__entities.set(entity.name, entity);
    }

    /**
     * Удалить сущность из сцены
     *
     * @param {Entity} entity
     */
    remove(entity) {
        this.__entities.delete(entity.name);
    }

    /**
     * Может ли сущность совершить движение
     *
     * @param {Entity} movingOne Движущаяся сущность
     * @param {Vector2} direction Направление
     * @param {Number} factor
     * @returns {boolean}
     */
    movePossible(movingOne, direction, factor) {
        let collisionDetected = false;

        // Проверяем на коллизию со всеми сущностями
        // TODO: Брать ближайшие в радиусе
        Array.from(this.__entities.values()).some((entity) => {
            if (movingOne !== entity && entity.movePossibleAgainst(movingOne, direction, factor)) {
                movingOne.onCollide(entity);

                collisionDetected = true;
                return true;
            }
        });

        return !collisionDetected;
    }

    /**
     * Находит все сущности начинающиеся на string
     *
     * @param string
     * @returns {Array}
     */
    getAllBeginningWith(string) {
        let all = [];

        // TODO: Поиск по классу объекта
        this.__entities.forEach(function (entity, name) {
            if (name.substr(0, string.length) === string) {
                all.push(entity);
            }
        });

        return all;
    }

    /**
     * Auto-increment для имен сущностей
     *
     * @param {Entity} entity сущность
     * @returns int
     */
    incrementSequenceOf(entity) {
        let sequenceName = entity.constructor.name.toLowerCase();

        if (this.__sequences.has(sequenceName)) {
            let newSequenceValue = this.__sequences.get(sequenceName) + 1;
            this.__sequences.set(sequenceName, newSequenceValue);
            return newSequenceValue;
        }

        this.__sequences.set(sequenceName, 1);
        return 1;
    }

    get lastDt() {
        return this.__lastDt;
    }
};
