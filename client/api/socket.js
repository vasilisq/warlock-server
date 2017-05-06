/**
*
* Модуль, отвечающий за работу с сокетами
*/
import io from 'socket.io-client';
import mainStore from '../store';

// TODO @dyadyaJora: может прикрутить конфиг,
// чтобы брать из него глобальные настройки?
// например урл
let socket = io('http://localhost:8080');

socket.on('players', function(players) {
    console.log(players);
    mainStore.dispatch('allPlayers', players.Players);
});

socket.on('connected', function(data) {
    console.log('Connected new user:', data);
    mainStore.dispatch('addPlayer', {
        id: data.Player.id,
        position: {
            x: data.Vector.x,
            y: data.Vector.y
        },
        dimentions: 30, //?????????????????????????????/
    });
});


socket.on('moved', function(data) {
    console.log('New position:', data.Vector);
    mainStore.dispatch('movePlayer', {
        id: data.Player.id,
        pos: {
            x: data.Vector.x,
            y: data.Vector.y
        }
    });
});

socket.on('disconnected', function(data) {
    console.log('Disconnected:', data);
    mainStore.dispatch('deletePlayer', data.Player.id);
});

/**
* Обработка события начала движения ракеты
*
* @param data {Object}
* @param data.position {Object} начальное положения ракеты
* @param data.position.x {Number}
* @param data.position.y {Number}
* @param data.id {Number}
* @param data.speed {Number}
* @param data.deltaT {Number} время в !милисекундах!
* @param data.directions {Object}
* @param data.directions.a {Number}
* @param data.directions.b {Number}
* @param data.size {Number}
*/
socket.on('missileStartMove', function(data) {
    console.log(data);
    mainStore.dispatch('missileStart', data);
});

/**
* Обработка окончания движения (столкновение, коллизия, выход за карту и т д)
*
* @param data.id {Number} id объекта Missile
*/
socket.on('missileEndMove', function(data) {
    console.log('missile', data.With.id,' died');
    mainStore.dispatch('missileEnd', data.With.id);
});

export default socket;