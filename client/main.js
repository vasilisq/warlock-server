import Vue from 'vue'
import App from './App.vue'
import Konva from 'konva'
import io from 'socket.io-client'

let socket = io('http://localhost:8080'),
    stage,
    layer,
    currentLocation = {x: 0, y: 0}; //temp
const size = 30;

new Vue({
    el: '#app',
    render: h => h(App)
});

//TODO: создать для инстанса игрока отдельный компонент или класс
// и переместить туда эту функцию
function drawPlayer(id, { x: x = 0, y: y = 0}, size = 30) {
    console.log(x, y);
    layer.findOne('#object' + id) ||
        layer.add(
            new Konva.Rect({
                x: x,
                y: y,
                width: size,
                height: size,
                fill: '#0f0',
                stroke: 'black',
                strokeWidth: 4,
                id: 'object' + id
            })
        );
    layer.draw();
}

// TODO вынести методом в инстанс Playera?
function calcSkillVector(point1, point2) {
    let rx = (point1.x - point2.x) * -1,
        ry = (point1.y - point2.y) * -1,
        r = Math.sqrt(Math.pow(rx, 2) + Math.pow(ry, 2));

    return {
        a: rx / r,
        b: ry / r
    }
}

// TODO вынести в инстанс Missile
function calcNewMissilePosition() {

}

stage = new Konva.Stage({
    container: 'canvas-container',
    width: window.innerWidth,
    height: window.innerHeight
});
layer = new Konva.Layer();
stage.add(layer);

socket.on('players', function(players) {
    players.Players.forEach( (item) => {
        drawPlayer(item.id, item.position, item.dimensions);
    });
});

socket.on('connected', function(data) {
    console.log('Connected new user:', data);
    drawPlayer(data.Player.id, {});
    currentLocation = {
        x: data.Vector.x || 0,
        y: data.Vector.y || 0
    };
})


socket.on('moved', function(data) {
    console.log('New position:', data.Vector);
    layer.findOne('#object' + data.Player.id).setAbsolutePosition({ x: data.Vector.x, y: data.Vector.y});
    layer.draw();

    currentLocation = {
        x: data.Vector.x || 0,
        y: data.Vector.y || 0
    };
});

socket.on('disconnected', function(data) {
    console.log('Disconnected:', data);
    layer.findOne('#object' + data.Player.id).remove();
    layer.draw();
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
    layer.add(skill);

    skill.timerId = setInterval(() => {
        let x = data.Direction.x * data.Speed * data.dt * 100, // todo: ????
            y = data.Direction.y * data.Speed * data.dt * 100;

            skill.move({
                x: x,
                y: y,
            });

        layer.draw();
    }, 1); // todo: recalc dt

});

/**
* Обработка окончания движения (столкновение, коллизия, выход за карту и т д)
*
* @param data.id {Number} id объекта Missile
*/
socket.on('missileEndMove', function(data) {
    console.log('missile', data.With.id,' died');
    let skill = layer.findOne('#missile' + data.With.id);
    if(skill) {
        clearInterval(skill.timerId);
        skill.remove();
        layer.draw();
    }
});

window.addEventListener('keypress', function(e) {
    switch (e.code) {
        case 'KeyW': socket.emit('move', { x: 0, y: -1}); break;
        case 'KeyA': socket.emit('move', { x: -1, y: 0}); break;
        case 'KeyS': socket.emit('move', { x: 0, y: 1}); break;
        case 'KeyD': socket.emit('move', { x: 1, y: 0}); break;
    }
    layer.draw();
});

stage.on('contentClick', function(e) {
    let data = calcSkillVector(currentLocation, stage.getPointerPosition());
    console.log(data);
    //если левая кнопка мышки
    if (e.evt.button == 0 ) {
        socket.emit('left', data);
    // если правая
    } else if (e.evt.button == 2) {
        socket.emit('right', data);
    }
});

$('#canvas-container').on('contextmenu', function(e) {
    e.preventDefault();
});

$('#canvas-container').on('click', function(e) {
    e.preventDefault();
});
