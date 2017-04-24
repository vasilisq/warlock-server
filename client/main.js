import Vue from 'vue'
import App from './App.vue'
import Konva from 'konva'
import io from 'socket.io-client'

let socket = io('http://localhost:8080'),
    stage,
    layer;
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
});

socket.on('disconnected', function(data) {
    console.log('Disconnected:', data);
    layer.findOne('#object' + data.id).remove();
    layer.draw();
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