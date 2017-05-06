let Vector2 = require('./vector2');

module.exports = class Entity {
    /**
     * @param {Number} dimensions - размер сущности
     */
    constructor(dimensions, maxHP = 10) {
        this.__position = new Vector2(0, 0);
        this.__dimensions = dimensions; // Размер объекта
        this.__id = this.entityManager.incrementSequenceOf(this);

        this.__health = maxHP;
        this.__maxHealth = maxHP;
        this.__speed = 0; // Скорость перемещения

        this.__isDead = false;
        this.__reSpawnTimeout = null;

        // Регистрируем обьект
        this.entityManager.add(this);
    }

    /**
     * Двигаем объект, проверяем коллизию
     *
     * @param {Vector2} direction Направление
     * @param {Number} factor Скорость
     */
    move(direction, factor = 1) {
        if (this.isDead || !this.entityManager.movePossible(this, direction, factor))
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
     * Обработка коллизий движущейся сущностью
     *
     * @param {Entity} collidedWithEntity - Сущность, с которой произошло столкновение
     */
    onCollide(collidedWithEntity) {

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

    get entityManager() {
        let server = require('../warlock-server');
        return server.entityMgr;
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

    get isDead() {
        return this.__isDead;
    }

    get maxHealth() {
        return this.__maxHealth;
    }

    /**
     * Удаление сущности
     *
     * @param {Entity} killer - сущность, которая вызвала удаление текущей сущности
     */
    destruct(killer) {
        if(this.__reSpawnTimeout !== null) {
            clearTimeout(this.__reSpawnTimeout);
        }
        this.entityManager.remove(this);
        console.log(this.name, 'removed by', killer.name, 'at', this.x, ';', this.y);
    }

    /**
     * нанесение урона сущности
     *
     * @param {Entity} damagedEntity - сущность, которой будет нанесён урон
     */
    hurt(damagedEntity) {

    }

    /**
     * Действия при получении урона сущностью
     *
     * @param {Entity} damager - кто нанёс урон
     * @param {Number} damage - количество урона
     */
    onDamaged(damager, damage) {
        this.__health -= damage;

        if(this.health <= 0) {
            this.onDeath(damager, damage);
        }
    }

    /**
     * Задаёт новое случайное местоположение сущности
     */
    randomPosition() {
        do {
            this.x = Math.floor(Math.random() * (this.entityManager.worldSize - this.dimensions + 1));
            this.y = Math.floor(Math.random() * (this.entityManager.worldSize - this.dimensions + 1));
        } 
        while(!this.entityManager.movePossible(this, new Vector2(0, 0), 1));
    }

    /**
     * Действия при смерти сущности
     *
     * @param {Entity} killer
     */
    onDeath(killer) {
        this.__isDead = true;
    }

    /**
     * Действия при возрождении сущности
     */
    reSpawn() {
        this.__reSpawnTimeout = null;
        this.__health = this.maxHealth;
        this.randomPosition();
        this.__isDead = false;
    }
};
