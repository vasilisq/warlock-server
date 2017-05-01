import Vue from 'vue'
import App from './components/App/App.vue'
import Konva from 'konva'
import io from 'socket.io-client'
import mainStore from './store'

// TODO: вытащить сокеты в отдельный модуль
let socket = io('http://localhost:8080');
const size = 30;

new Vue({
    el: '#app',
    render: h => h(App)
});

mainStore.dispatch('initKonva', {
    container: 'canvas-container',
    width: 1000,
    height: 1000
});

// для дебага
// НЕ ЗАБЫТЬ ВЫПИЛИТЬ!!!!
window.s = mainStore;
//stage.add(layer);

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
})


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
    //layer.add(skill);
    mainStore.stage.konvaStore.layerPlayers.add(skill);

    skill.timerId = setInterval(() => {
        let x = data.Direction.x * data.Speed * data.dt * 100, // todo: ????
            y = data.Direction.y * data.Speed * data.dt * 100;

            skill.move({
                x: x,
                y: y,
            });

        mainStore.stage.konvaStore.layerPlayers.draw();
    }, 1); // todo: recalc dt

});

/**
* Обработка окончания движения (столкновение, коллизия, выход за карту и т д)
*
* @param data.id {Number} id объекта Missile
*/
socket.on('missileEndMove', function(data) {
    console.log('missile', data.With.id,' died');
    let skill = mainStore.stage.konvaStore.layerPlayers.findOne('#missile' + data.With.id);
    if(skill) {
        clearInterval(skill.timerId);
        skill.remove();
        mainStore.stage.konvaStore.layerPlayers.draw();
    }
});

window.addEventListener('keypress', function(e) {
    switch (e.code) {
        case 'KeyW': socket.emit('move', { x: 0, y: -1}); break;
        case 'KeyA': socket.emit('move', { x: -1, y: 0}); break;
        case 'KeyS': socket.emit('move', { x: 0, y: 1}); break;
        case 'KeyD': socket.emit('move', { x: 1, y: 0}); break;
    }
    //layer.draw();
});

$('#canvas-container').on('contextmenu', function(e) {
    e.preventDefault();
});

$('#canvas-container').on('click', function(e) {
    e.preventDefault();
});


// как вызывать action-ы
//store.dispatch('addPlayers', [{id: 1 }, { id: 2, score: 200 }, { id: 3, score: 1 }]);
//store.dispatch('changePlayer', { id: 1, newValues: { score: 10 } });
//console.log(store);