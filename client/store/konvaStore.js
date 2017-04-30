import Vue from 'vue';
import Vuex from 'vuex';
import Konva from 'konva';


Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        konva,
        layerMapSprite,
        layerEntities
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
        }
    },
    getters: {
        getKonvaObject(state) {
            return state.konva;
        }
    }
});


export default store;