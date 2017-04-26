let World = require('./world');
let Entity = require('./entity');
let Player = require('./player');
let Missile = require('./missile');

module.exports = class EntityManager {
    constructor() {
        this.__entities = new Map();
        this.__sequences = new Map();

        this.startTicking();
    }

    /**
     * Вызываем think у всех сущностей, считая dT
     */
    startTicking() {
        const DELTA_T_SLOWDOWN_COEFFICIENT = 10000000;

        let onTick = (previousT) => {
            let now = process.hrtime()[1];
            let deltaT = now - previousT;

            this.__entities.forEach((entity) => {
                entity.think(deltaT / DELTA_T_SLOWDOWN_COEFFICIENT);
            });

            setImmediate(() => {
                onTick(process.hrtime()[1]);
            });
        };

        onTick(process.hrtime()[1]);
    }

    add(entity) {
        this.__entities.set(entity.name, entity);
    }

    remove(entity) {
        this.__entities.delete(entity.name);
    }

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
     * @param entity
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
};
