import Vue from 'vue'
import App from './components/App/App.vue'
import Konva from 'konva'
import mainStore from './store'
import socket from './api/socket'

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

// TODO @dyadyaJora: тригерить эти события для window не годиться
// переподписать их для компонента CanvasComponent
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

// END TODO


// как вызывать action-ы
//store.dispatch('addPlayers', [{id: 1 }, { id: 2, score: 200 }, { id: 3, score: 1 }]);
//store.dispatch('changePlayer', { id: 1, newValues: { score: 10 } });
//console.log(store);