const actions = {
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
    * Перемещение игрока
    *
    * data {Object}
    * data.id {Number}
    * data.pos {Object}
    * data.pos.x {Number}
    * data.pos.y {Number}
    */
    movePlayer({ commit }, data) {
        commit('MOVE_PLAYER', {
            id: data.id,
            x: data.pos.x,
            y: data.pos.y
        });
    },

    deletePlayer({ commit }, id) {
        id && commit('DELETE_PLAYER', id);
    }
};

export default actions;