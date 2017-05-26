const getters = {

    getPlayers(state) {
        return state.playersStore.players;
    },

    getKonvaObj(state) {
        return state.konvaStore.obj;
    },

    getWaitingRespawnStatus(state) {
        return state.waitingRespawn;
    }
};

export default getters;