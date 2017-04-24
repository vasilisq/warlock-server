module.exports = class World extends Entity {
	constructor(dimensions) {
		super(dimensions);
		this.__width = 1000;
		this.__height = 1000;
	}

	get width() {
		return this.__width;
	}

	set width(value) {
		this.__width = value;
	}

	get height() {
		return this.__height;
	}

	set height(value) {
		this.__height = value;
	}
};