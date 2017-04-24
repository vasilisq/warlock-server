module.exports = class EntityManager {
    constructor() {
        this.__entities = new Map();
    }

    add(name, entity) {
        this.__entities.set(name, entity);
    }

    get(name) {
        this.__entities.get(name);
    }

    remove(name) {
        this.__entities.delete(name);
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