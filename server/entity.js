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