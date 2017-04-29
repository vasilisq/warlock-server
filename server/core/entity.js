let Vector2 = require('./vector2');

const ENTITY_START_HEALTH = 10;

module.exports = class Entity {
    constructor(dimensions) {
        this.__position = new Vector2(0, 0);
        this.__dimensions = dimensions; // Размер объекта
        this.__id = this.server.entityMgr.incrementSequenceOf(this);

        this.__health = ENTITY_START_HEALTH;
        this.__speed = 0; // Скорость перемещения

        // Регистрируем обьект
        this.server.entityMgr.add(this);
    }

    /**
     * Двигаем объект, проверяем коллизию
     *
     * @param {Vector2} direction Направление
     * @param {Number} factor Скорость
     */
    move(direction, factor = 1) {
        if (!this.server.entityMgr.movePossible(this, direction, factor))
            return;

        this.x = this.x + (direction.x * factor);
        this.y = this.y + (direction.y * factor);
    }

    /**
     * Физическая логика обрабатывается здесь
     *
     * @param {number} deltaT
     */
    think(deltaT) {

    }

    /**
     * Возможно ли движение относительно данной сущности
     *
     * @param {Entity} entity Сущность, пытающаяся двигаться
     * @param {Vector2} direction Направление ее движения
     * @param {Number} factor Скорость
     * @returns {boolean}
     */
    movePossibleAgainst(entity, direction, factor) {
        return Math.abs(entity.x + direction.x * factor - this.x) < (this.dimensions / 2 + entity.dimensions / 2) &&
            Math.abs(entity.y + direction.y * factor - this.y) < (this.dimensions / 2 + entity.dimensions / 2);
    }

    /**
     * обработка коллизий движущейся сущностью
     *
     * @param {Entity} entity Сущность, с которой произошло столкновение
     */
    onCollide(entity) {

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
        return require('../warlock-server');
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

    get speed() {
        return this.__speed;
    }

    set speed(value) {
        this.__speed = value;
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
    hurt(damagedEntity, damage) {
        damagedEntity.onDamaged(this, damage);
    }

    /**
     * получение урона от сущности
     *
     * @param damage
     */
    onDamaged(damager, damage) {
        this.__health -= damage;
    }
};
