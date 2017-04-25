import Vue from 'vue'
import App from './App.vue'
import Konva from 'konva'
import io from 'socket.io-client'

let socket = io('http://localhost:8080'),
    stage,
    layer,
    currentLocation = {}; //temp
const size = 30;

new Vue({
    el: '#app',
    render: h => h(App)
});

//TODO: создать для инстанса игрока отдельный компонент или класс
// и переместить туда эту функцию
function drawPlayer(id, { __x: x = 0, __y: y = 0 }, size = 30) {
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
    let rx = Math.abs(point1.x - point2.x),
        ry = Math.abs(point1.y - point2.y),
        r = Math.sqrt(Math.pow(rx, 2) + Math.pow(ry, 2));

    return {
        a: rx / r,
        b: ry / r
    }
}

stage = new Konva.Stage({
    container: 'canvas-container',
    width: window.innerWidth,
    height: window.innerHeight
});
layer = new Konva.Layer();
stage.add(layer);

socket.on('players', function(players) {
    console.log(players);
    players.forEach( (item) => {
        drawPlayer(item.__id, item.__position, item.__dimensions);
    });
});

socket.on('connected', function(data) {
    console.log('Connected new user:', data);
    drawPlayer(data.id, {});
})

socket.on('moved', function(data) {
    console.log('New position:', data);
    layer.findOne('#object' + data.id).setAbsolutePosition({ x: data.x, y: data.y });
    layer.draw();
    currentLocation.x = data.x;
    currentLocation.y = data.y;
});

socket.on('disconnected', function(data) {
    console.log('Disconnected:', data);
    layer.findOne('#object' + data.id).remove();
    layer.draw();
});

let pressed = [];

window.addEventListener('keydown', function(e) {
    pressed.indexOf(e.code) == -1 && pressed.push(e.code);
});

window.addEventListener('keypress', function(e) {
    //
    if (pressed.length && e.code == pressed[pressed.length - 1] ) {
        if (pressed.length == 1) {
            switch (e.code) {
                case 'KeyW': socket.emit('move', { x: 0, y: -1}); break;
                case 'KeyA': socket.emit('move', { x: -1, y: 0}); break;
                case 'KeyS': socket.emit('move', { x: 0, y: 1}); break;
                case 'KeyD': socket.emit('move', { x: 1, y: 0}); break;
            }
        } else {
            switch (pressed.slice(pressed.length - 2).sort().join('+')) {
                case 'KeyA+KeyW': socket.emit('move', { x: -1, y: -1}); break;
                case 'KeyA+KeyS': socket.emit('move', { x: -1, y: 1}); break;
                case 'KeyD+KeyW': socket.emit('move', { x: 1, y: -1}); break;
                case 'KeyD+KeyS': socket.emit('move', { x: 1, y: 1}); break;
            }
        }
    }
    layer.draw();
});

window.addEventListener('keyup', function(e) {
    pressed.indexOf(e.code) !== -1 && pressed.splice(pressed.indexOf(e.code), 1);
});
stage.on('contentClick', function(e) {
    let data = calcSkillVector(currentLocation, stage.getPointerPosition());
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