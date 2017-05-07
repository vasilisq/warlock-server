const actions = {
    /**
    *
    * Добавление нового игрока
    * 
    * @param {object} player объект игрока
    * @param {number} player.id id
    * @param {object} player.position положение
    * @param {number} player.position.x  координата x
    * @param {number} player.position.x  координата y
    * @param {number} player.dimentions размеры
    * @param  {number} player.speed скорость
    * @param  {number} player.name никнэйм
    * player.hp ?
    * player.score ?
    * @returns {void}
    */
    addPlayer({ commit }, player) {
        player && commit('ADD_PLAYER', player);
    },

    /**
    *
    * ВНИМАНИЕ! этот экшн полностью перезаписывает массив всех игроков
    * не предназначен для частого использования(!не бродкастить!), только в целях синхронизации
    *
    * @param {array} players массив новых игроков
    * @returns {void}
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
    * @param {object} data данные игрока
    * @param {number} data.id id
    * @param {object} data.pos объект положения
    * @param {number} data.pos.x координата x
    * @param {number} data.pos.y координата y
    * @returns {void}
    */
    movePlayer({ commit }, data) {
        commit('MOVE_PLAYER', data);
    },

    deletePlayer({ commit }, id) {
        id && commit('DELETE_PLAYER', id);
    }
};

export default actions;