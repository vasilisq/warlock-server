import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        players: []
    },
    actions: {
        /**
        *
        * Добавление нового игрока
        * 
        * player {Object}
        * player.__id {Number}
        * player.__position {Object}
        * player.__position.x {Number}
        * player.__position.y {Number}
        * player.__dimentions {Number}
        * player.__speed {Number}
        * player.__hp ?
        * player.__score ?
        */
        addPlayer({ commit }, player) {
            player && commit('ADD_PLAYER', player);
        },

        /**
        *
        * ВНИМАНИЕ! этот экшн полностью перезаписывает массив всех игроков
        * не предназначен для частого использования(!не бродкастить!), только в целях синхронизации
        *
        * players {Array} массив новых игроков
        */
        allPlayers({ commit }, players) {
            Array.isArray(players) && commit('ALL_PLAYERS', players);
        },

        /**
        *
        * {} {Object} mutation type
        * data {Object} данные для изменения игрока
        * data.id {Number} id игрока
        * data.newValues {Object}
        */
        changePlayer({ commit }, data) {
            for(let key in data.newValues) {
                switch (key) {
                    case 'position': commit('MOVE_PLAYER', { id: data.id, position: data.newValues[key] }); break;
                    case 'score': commit('CHANGE_SCORE', { id: data.id, score: data.newValues[key] }); break;
                    case 'hp': commit('CHANGE_HP', { id: data.id, hp: data.newValues[key] }); break;
                }
            }
        },

        deletePlayers({ commit }, player) {
            if (Array.isArray(player)) {
                commit('DELETE_PLAYERS', player);
            } else {
                player && commit('DELETE_PLAYER', player);
            }
        }
    },
    mutations: {
        ADD_PLAYER (context, player) {
            addPlayer(context.players, player);
        },

        ALL_PLAYERS (context, players) {
            context.players = [];
            players.forEach((item) => {
                addPlayer(context.players, item);
            });
        },
        
        DELETE_PLAYER (context, player) {
            context.players.push(player);
        },

        DELETE_PLAYERS (context, players) {
            context.players = context.players.concat(players);
        },

        /**
        *
        * data {Object} 
        * data.id {Number}
        * data.score {Number}
        */
        CHANGE_SCORE (context, data) {
            let player = context.players.find( (item) => data.id === item.id);
            player && (player.score = data.score);
        }
    },
    getters: {
        getPlayer: (state) => (id) => {
            return state.players.find( (item) => id === item.id );
        },
        getPlayers (state) {
            return state.players;
        }
    }
});

function findPlayerById(arr, id) {
    return arr.find((item) => id === item.id);
}

function addPlayer(state, newPlayer) {
    findPlayerById(state, newPlayer.__id) ||
        state.push( {
            id: newPlayer.__id || newPlayer.id,
            pos: newPlayer.__position && {
                x: newPlayer.__position.x,
                y: newPlayer.__position.y
            },
            size: newPlayer.__dimentions,
            hp: newPlayer.__hp || 10,
            score: newPlayer.__score || 10,
            speed: newPlayer.__speed || 10
        });
}

export default store;
