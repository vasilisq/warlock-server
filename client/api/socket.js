/**
*
* Модуль, отвечающий за работу с сокетами
*/
import io from 'socket.io-client';
import mainStore from '../store';
import Konva from 'konva';

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
    let skill = new Konva.Rect({
        x: data.Vector.x || 0,
        y: data.Vector.y || 0,
        width: data.With.dimensions,
        height: data.With.dimensions,
        fill: '#f00',
        id: 'missile' + data.id,
    });

    mainStore.state.konvaStore.layerPlayers.add(skill);

    skill.timerId = setInterval(() => {
        let x = data.Direction.x * data.Speed / 100, // todo: Выяснить что это за коэффициент, и почему он именно такой
            y = data.Direction.y * data.Speed / 100;

        skill.move({
            x: x,
            y: y,
        });

        mainStore.state.konvaStore.layerPlayers.draw();
    }, 10); // todo: recalc dt

});

/**
* Обработка окончания движения (столкновение, коллизия, выход за карту и т д)
*
* @param data.id {Number} id объекта Missile
*/
socket.on('missileEndMove', function(data) {
    console.log('missile', data.With.id,' died');
    let skill = mainStore.state.konvaStore.layerPlayers.findOne('#missile' + data.With.id);

    if(skill) {
        clearInterval(skill.timerId);
        skill.remove();
        mainStore.state.konvaStore.layerPlayers.draw();
    }
});

export default socket;