import Vue from 'vue';
import Vuex from 'vuex';
import Konva from 'konva';


Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        konva: {},
        layerMapSprite: {},
        layerEntities: [],
        // TODO: @dyadyaJora не уверен, что лучше здесь кешровать
        // ID или полностью объект Player-a
        currentPlayerId: 0  
    },
    actions: {
        /**
        *
        * data {Object}
        * data.container {String}
        * data.width {Number}
        * data.height {Number}
        */
        initKonva({ commit }, data) {
            commit('INIT', data);
        }
    },
    mutations: {
        /**
        *
        * data {Object}
        * data.container {String}
        * data.width {Number}
        * data.height {Number}
        */
        INIT(context, data) {
            context.konva = new Konva.Stage({
                container: data.container,
                width: data.width,
                height: data.height
            });
            context.layerMapSprite = new Konva.Layer();
            context.konva.add(context.layerMapSprite);

            context.layerEntities = new Konva.Layer();
            context.konva.add(context.layerEntities);
        },

        ADD_NEW_PLAYER(context, data) {
            console.log('Konva new Player!!');
        }
    },
    getters: {
        getKonvaObject(state) {
            return state.konva;
        }
    }
});


export default store;