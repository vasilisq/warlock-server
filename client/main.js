import Vue from 'vue'
import App from './App.vue'
import Konva from 'konva'
import io from 'socket.io-client'

let socket = io('http://localhost:8080');
console.log(socket);
new Vue({
  el: '#app',
  render: h => h(App)
});

socket.on('connected', function(data) {
	console.log('Connected new user:', data);
})

socket.on('moved', function(data) {
    console.log('New position:', data);
});

socket.on('disconnected', function(data) {
	console.log('Disconnected:', data);
});

socket.emit('move', { x: 1, y: 1 });