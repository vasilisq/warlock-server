let Vector2 = require('./vector2');

module.exports = class Entity {
    constructor(dimensions) {
        this.__position = new Vector2(0, 0);
        this.__dimensions = dimensions; // Размер объекта
    }

    move(direction, factor = 1) {
        this.x = this.x + (direction.x * factor);
        this.y = this.y + (direction.y * factor);
    }

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
        return (this.x + direction.x * factor) < entity.x + entity.dimensions &&
            (this.x + direction.x * factor) + this.dimensions > entity.x &&
            (this.y + direction.y * factor) < entity.y + entity.dimensions &&
            this.dimensions + (this.y + direction.y * factor) > entity.y;
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
};