let Vector2 = require('./vector2');

module.exports = class Entity {
    constructor(dimensions) {
        this.__position = new Vector2(0, 0);
        this.__dimensions = dimensions; // Размер объекта
        this.__id = this.server.entityMgr.incrementSequenceOf(this);
        this.__health = 100;

        // Регистрируем обьект
        this.server.entityMgr.add(this);
    }

    move(direction, factor = 1) {
        if (!this.server.entityMgr.movePossible(this, direction, factor))
            return;

        this.x = this.x + (direction.x * factor);
        this.y = this.y + (direction.y * factor);
    }

    /**
     * Физическая логика обрабатывается здесь
     *
     * @param deltaT
     */
    think(deltaT) {

    }

    /**
     * Возможно ли движение относительно данной сущности
     *
     * @param entity
     * @param direction
     * @param factor
     * @returns {boolean}
     */
    movePossibleAgainst(entity, direction, factor) {
        return Math.abs(entity.x + direction.x * factor - this.x) < (this.dimensions / 2 + entity.dimensions / 2) &&
            Math.abs(entity.y + direction.y * factor - this.y) < (this.dimensions / 2 + entity.dimensions / 2);
    }

    get x() {
        return this.__position.x;
    }

    set x(value) {
        this.__position.x = value;
    }

    get y() {
        return this.__position.y;
    }

    set y(value) {
        this.__position.y = value;
    }

    get position() {
        return this.__position;
    }

    set position(vector) {
        this.__position = vector;
    }

    get dimensions() {
        return this.__dimensions;
    }

    get server() {
        return require('./warlock-server');
    }

    get id() {
        return this.__id;
    }

    get name() {
        return this.constructor.name.toLowerCase() + this.__id;
    }

    get health() {
        return this.__health;
    }

    set health(hp) {
        this.__health = hp;
    }

    /**
     * обработка коллизий движущейся сущностью
     *
     * @param entity - сущность, с которой произошло столкновение
     */
    onCollide(entity) {

    }

    /**
     * удаление сущности
     *
     * @param killer
     */
    destruct(killer) {
        this.server.entityMgr.remove(this);
        console.log(this.name, 'removed by', killer.name, 'at', this.x, ';', this.y);
    }

    /**
     * нанесение урона сущности
     *
     * @param damage
     */
    hurt(damage, damager) {
        this.__health -= damage;

        if(this.__health <= 0) {
            this.destruct(damager);
        }
    }
};
