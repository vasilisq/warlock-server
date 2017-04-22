module.exports = class Vector2 {
    constructor(x, y) {
        this.__x = x;
        this.__y = y;
    }

    get x() {
        return this.__x;
    }

    set x(value) {
        this.__x = value;
    }

    get y() {
        return this.__y;
    }

    set y(value) {
        this.__y = value;
    }
};