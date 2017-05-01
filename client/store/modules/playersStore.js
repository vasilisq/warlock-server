const state = {
        players: []
    },
    actions = {
        /**
        *
        * {} {Object} mutation type
        * data {Object} данные для изменения игрока
        * data.id {Number} id игрока
        * data.newValues {Object}
        */
        changePlayer({ commit }, data) {
            console.log('changePlayer own');
            for(let key in data.newValues) {
                switch (key) {
                    case 'score': commit('CHANGE_SCORE', { id: data.id, score: data.newValues[key] }); break;
                    case 'hp': commit('CHANGE_HP', { id: data.id, hp: data.newValues[key] }); break;
                    // case еще что-нибудь : ...
                }
            }
        }
    },
    mutations = {
        ADD_PLAYER (context, player) {
            console.log('Players ADD_PLAYER');
            addPlayer(context.players, player)
        },

        ALL_PLAYERS (context, players) {
            console.log('Players ALL_PLAYERS');
            context.players = [];
            players.forEach((item) => {
                addPlayer(context.players, item);
            });
        },
        
        DELETE_PLAYER (context, id) {
            console.log('Players DELETE_PLAYER');
            deletePlayer(context.players, id);
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
        },

        MOVE_PLAYER (context, data) {
            console.log('Players MOVE_PLAYER');
        }
    },
    getters = {
        getPlayer: (state) => (id) => {
            return state.players.find( (item) => id === item.id );
        }
    };

function findPlayerById(arr, id) {
    return arr.find((item) => id === item.id);
}

function addPlayer(state, newPlayer) {
    if (findPlayerById(state, newPlayer.__id)) return false;

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

    return true;
}

function deletePlayer(arr, id) {
    arr.splice(arr.findIndex( (item) => id === item.id), 1);
}

export default {
    state,
    actions,
    mutations,
    getters
};
