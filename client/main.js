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

stage = new Konva.Stage({
    container: 'canvas-container',
    width: window.innerWidth,
    height: window.innerHeight
});
layer = new Konva.Layer();
stage.add(layer);

socket.on('connected', function(data) {
    console.log('Connected new user:', data);
    let box = new Konva.Rect({
        x: data.x || 0,
        y: data.x || 0,
        width: 30,
        height: 30,
        fill: '#0f0',
        stroke: 'black',
        strokeWidth: 4,
        id: 'object' + data.id
    });
    layer.add(box);
    layer.draw();
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