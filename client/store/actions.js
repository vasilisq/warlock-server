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
    * @param {number} player.dimensions размеры
    * @param {number} player.speed скорость
    * @param {number} player.maxHP макс значение HP (оно же начальное)
    * @param {number} player.name никнэйм
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
    },

    diePlayer({ state, commit }, id) {
        if (id) {
            commit('DELETE_PLAYER', id);
            state.waitingRespawn = true;
        } 
    },

    respawnPlayer({ state, commit }, player) {
        if (player) {
            commit('ADD_PLAYER', player);
            state.waitingRespawn = false;
        }
    },

    /**
    * 
    * @param {object} context контекст
    * @param {object} data данные для изменения игрока
    * @param {number} data.id id игрока
    * @param {object} data.newValues новые данные
    * @returns {void}
    */
    changePlayer(context, data) {
        for(let key in data.newValues) {
            let player;

            switch (key) {
                case 'score':
                    context.commit('CHANGE_SCORE', { id: data.id, score: data.newValues[key] });
                    break;
                case 'hp':
                    player = context.getters.getPlayer(data.id);

                    context.commit('CHANGE_HP', {
                        id: data.id,
                        hp: data.newValues[key],
                        maxHp: player.maxHp,
                        dimensions: player.size
                    });
                    break;
                // case еще что-нибудь : ...
            }
        }
    }
};

export default actions;