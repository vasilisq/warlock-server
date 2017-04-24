module.exports = class EntityManager {
    constructor() {
        this.__entities = new Map();
    }

    add(name, entity) {
        this.__entities.set(name, entity);
    }

    get(name) {
        return this.__entities.get(name);
    }

    remove(name) {
        this.__entities.delete(name);
    }

    move(name, direction, factor) {
        let movingOne = this.__entities.get(name);
        let collisionDetected = false;

        // Проверяем на коллизию со всеми сущностями
        // TODO: Брать ближайшие в радиусе
        Array.from(this.__entities.values()).some((entity) => {
            if (movingOne !== entity) { 
                if(movingOne.movePossibleAgainst(entity, direction, factor)) {
                    // TODO: On collide event
                    collisionDetected = true;
                    return true;
                }
                if(entity instanceof World && entity.movePossibleAgainst(movingOne, direction, factor)) {
                    // TODO: On collide event
                    collisionDetected = true;
                    return true;
                }
            }
        });

        if(!collisionDetected) {
            movingOne.move(direction, factor);
        }

        this.__entities.set(name, movingOne);
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