const state = {
        konva: {},
        layerMapSprite: {},
        layerEntities: []
    },
    actions = {
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
    mutations = {
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

        ADD_PLAYER(context, data) {
            console.log('Konva ADD_PLAYER');
        },

        ALL_PLAYERS(context, data) {
            console.log('Konva ALL_PLAYERS');
        },

        DELETE_PLAYER (context, id) {
            console.log('Konva DELETE_PLAYER');
        },

        MOVE_PLAYER (context, data) {
            console.log('Konva MOVE_PLAYER');
        }
    },
    getters = { }


export default {
    state,
    actions,
    mutations,
    getters
};