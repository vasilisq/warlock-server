const actions = {
    /**
    *
    * Добавление нового игрока
    * 
    * player {Object}
    * player.id {Number}
    * player.position {Object}
    * player.position.x {Number}
    * player.position.y {Number}
    * player.dimentions {Number}
    * player.speed {Number}
    * player.hp ?
    * player.score ?
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
    allPlayers({ state, commit }, players) {
        if (Array.isArray(players)) {
            commit('ALL_PLAYERS', players);
            state.currentPlayer = players[players.length - 1].id;
        }
    },

    /**
    *
    * Перемещение игрока
    *
    * data {Object}
    * data.id {Number}
    * data.pos {Object}
    * data.pos.x {Number}
    * data.pos.y {Number}
    */
    movePlayer({ commit }, data) {
        commit('MOVE_PLAYER', data);
    },

    deletePlayer({ commit }, id) {
        id && commit('DELETE_PLAYER', id);
    }
};

export default actions;