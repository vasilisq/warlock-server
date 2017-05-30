const state = {
        players: []
    },
    actions = { },
    mutations = {
        ADD_PLAYER (context, player) {
            console.log('Players ADD_PLAYER');
            addPlayer(context.players, player);
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
        * @param {object} context контекст
        * @param {object} data данные 
        * @param {number} data.id id
        * @param {number} data.score счет игрока
        * @returns {void}
        */
        CHANGE_SCORE (context, data) {
            let player = context.players.find( (item) => data.id === item.id);
            
            player && (player.score = data.score);
        },

        /**
        *
        * @param {object} context контекст
        * @param {object} data данные игрока
        * @param {number} data.id id
        * @param {object} data.pos объект положения
        * @param {number} data.pos.x координата x
        * @param {number} data.pos.y координата y
        * @returns {void}
        */
        MOVE_PLAYER (context, data) {
            console.log('Players MOVE_PLAYER');
            let player = findPlayerById(context.players, data.id);

            if (player) {
                player.pos.x = data.pos.x;
                player.pos.y = data.pos.y;
            }
        },

        /**
        *
        * @param {object} context контекст
        * @param {object} data данные
        * @param {number} data.id id
        * @param {number} data.hp новое hp 
        * @returns {void}
        */
        CHANGE_HP (context, data) {
            let player = findPlayerById(context.players, data.id);

            player && (player.hp = data.hp);
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
        size: newPlayer.dimensions,
        hp: newPlayer.hp || 30,
        maxHp: newPlayer.maxHP || 30,
        score: newPlayer.score || 10,
        speed: newPlayer.speed || 10,
        name: newPlayer.name || newPlayer.nickname || 'Name_' + newPlayer.id
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
