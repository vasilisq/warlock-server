import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        players: []
    },
    actions: {
        addPlayers({ commit }, player) {
            if (Array.isArray(player)) {
                commit('ADD_PLAYERS', player);
            } else {
                player && commit('ADD_PLAYER', player);
            }
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
            context.players.push(player);
        },

        ADD_PLAYERS (context, players) {
            context.players = context.players.concat(players);
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

export default store;
