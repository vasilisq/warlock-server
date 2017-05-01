const getters = {

	getPlayers(state) {
		return state.playersStore.players;
	},

	getKonvaObj(state) {
		return state.konvaStore.obj;
	}
}

export default getters;