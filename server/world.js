module.exports = class World extends Entity {
	constructor(dimensions) {
		super(dimensions);
	}

	/**
     * Возможно ли движение относительно данной сущности
     *
     * @param entity - сущность, которая проверяется
     * @param direction - направление этой сущности
     * @param factor - коэф. скорости сущности
     * @returns {boolean}
     */
	movePossibleAgainst(entity, direction, factor) {
	        return (entity.x + direction.x * factor) < (this.x + this.dimensions / 2) &&
	            (entity.x + direction.x * factor) > (this.x - this.dimensions / 2) &&
	            (entity.y + direction.y * factor) < (this.y + this.dimensions / 2) &&
	            (entity.y + direction.y * factor) > (this.y - this.dimensions / 2);
	    }
};
