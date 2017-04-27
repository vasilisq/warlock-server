let Vector2 = require('./vector2');
let Entity = require('./entity');
let Missile = require('./missile');

// Размеры игрока
const PLAYER_SIZE = 30;
// Скорость бега
const PLAYER_MOVE_SPEED = 10;
const PLAYER_START_HEALTH = 30;

module.exports = class Player extends Entity {
    constructor(playerSocket) {
        super(PLAYER_SIZE);
        this.__health = PLAYER_START_HEALTH;

        this.server.broadcast('connected', {id: this.__id});

        // Subscribe to player's events
        playerSocket.on('move', (move) => {
            this.move(new Vector2(move.x, move.y));
        });

        playerSocket.on('left', (data) => {
            new Missile(new Vector2(data.a, data.b), this);
        });

        playerSocket.on('right', (data) => {
            new Missile(new Vector2(data.a, data.b), this);
        });
    }

    move(direction) {
        super.move(direction, PLAYER_MOVE_SPEED);

        this.server.broadcast('moved', {
            id: this.id,
            x: this.x,
            y: this.y
        });
    }

    hurt(damage, damager) {
        super.destruct(damage, damager);

        this.server.broadcast('playerDamaged', {
            id: this.id,
            damage: damage,
            hp: this.health
        });
    }

    destruct(killer) {
        super.destruct(killer);
        
        this.server.broadcast('playerDied', {
            id: this.id
        });
    }
};