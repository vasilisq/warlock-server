let Vector2 = require('./vector2');

module.exports = class Player {
    constructor(id) {
        this.__position = new Vector2(0, 0);
        this.__moveSpeed = 10;
        this.__id = id;
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

    move(vector) {
        console.log(vector.x);
        this.x = this.x + (vector.x * this.__moveSpeed);
        this.y = this.y + (vector.y * this.__moveSpeed);
    }

    get position() {
        return this.__position;
    }

    get id() {
        return this.__id;
    }
};