import Vue from 'vue';
import App from './components/App/App.vue';
import mainStore from './store';
import socket from './api/socket';
import ls from './components/LoginScreen/LoginScreen.vue';
import bootstrap from 'bootstrap';


//const size = 30;

let KeyWDown = false;
let KeyADown = false;
let KeySDown = false;
let KeyDDown = false;

new Vue({
    el: '#app',
    render: h => h(App),
    methods: {
        x: function() {
            return this.$refs.modalL;
        }
    }
});

mainStore.dispatch('initKonva', {
    container: 'canvas-container',
    width: 1000,
    height: 1000
});

ls.methods.showLoginScreen();

// для дебага
// НЕ ЗАБЫТЬ ВЫПИЛИТЬ!!!!
window.s = mainStore;
//stage.add(layer);

// TODO @dyadyaJora: тригерить эти события для window не годиться
// переподписать их для компонента CanvasComponent
window.addEventListener('keypress', function(e) {
    /*
        switch (e.code) {
            case 'KeyW': socket.emit('move', { x: 0, y: -1}); break;
            case 'KeyA': socket.emit('move', { x: -1, y: 0}); break;
            case 'KeyS': socket.emit('move', { x: 0, y: 1}); break;
            case 'KeyD': socket.emit('move', { x: 1, y: 0}); break;
    */

    if(KeyWDown){socket.emit('move', { x: 0, y: -1});}
    if(KeySDown){socket.emit('move', { x: 0, y: 1}); }
    if(KeyADown){socket.emit('move', { x: -1, y: 0});}
    if(KeyDDown){socket.emit('move', { x: 1, y: 0}); }
    
    //layer.draw();
});

/* eslint-disable no-undef */
$('#canvas-container').on('contextmenu', function(e) {
    e.preventDefault();
});

$('#canvas-container').on('click', function(e) {
    e.preventDefault();
});
/* eslint-disable no-undef */
// END TODO

$(document).keyup(function (e) {
    if(e.which == 87) KeyWDown = false;
    if(e.which == 65) KeyADown = false;
    if(e.which == 83) KeySDown = false;
    if(e.which == 68) KeyDDown = false;
})

.keydown(function (e) {
    if(e.which == 87) KeyWDown = true;
    if(e.which == 65) KeyADown = true;
    if(e.which == 83) KeySDown = true;
    if(e.which == 68) KeyDDown = true;
});

// как вызывать action-ы
//store.dispatch('addPlayers', [{id: 1 }, { id: 2, score: 200 }, { id: 3, score: 1 }]);
//store.dispatch('changePlayer', { id: 1, newValues: { score: 10 } });
//console.log(store);