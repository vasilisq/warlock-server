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

        /**
        *
        * data {Object}
        * data.id {Number}
        * data.pos {Object}
        * data.pos.x {Number}
        * data.pos.y {Number}
        */
        MOVE_PLAYER (context, data) {
            console.log('Players MOVE_PLAYER');
            let player = findPlayerById(context.players, data.id);
            player.pos.x = data.pos.x;
            player.pos.y = data.pos.y;
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
    if (findPlayerById(state, newPlayer.id)) return false;

    state.push( {
        id: newPlayer.id,
        pos: newPlayer.position && {
            x: newPlayer.position.x,
            y: newPlayer.position.y
        },
        size: newPlayer.dimentions,
        hp: newPlayer.hp || 10,
        score: newPlayer.score || 10,
        speed: newPlayer.speed || 10
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