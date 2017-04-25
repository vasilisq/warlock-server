let World = require('./world');
let Entity = require('./entity');

module.exports = class EntityManager {
    constructor() {
        this.__entities = new Map();

        this.startTicking();
    }

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
            if (movingOne !== entity && entity.movePossibleAgainst(movingOne,direction, factor)) { 
                // TODO: On collide event
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

        this.__entities.forEach(function(entity, name) {
            if(name.substr(0, string.length) === string) {
                all.push(entity);
            }
        });

        return all;
    }
};