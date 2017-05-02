import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions.js';
import getters from './getters.js';
import playersStore from './modules/playersStore.js';
import konvaStore from './modules/konvaStore.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
        // TODO: @dyadyaJora не уверен, что лучше здесь кешровать
        // ID или полностью объект Player-a

        // доступен в rootState
		currentPlayer: 0
	},
	actions,
	getters,
	modules: {
		playersStore,
		konvaStore
	}
});