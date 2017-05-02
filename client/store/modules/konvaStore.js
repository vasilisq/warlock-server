import Konva from 'konva';
import socket from '../../api/socket';

const state = {
        konva: {},
        layerMapSprite: {},
        layerPlayers: {},
        layerMissile: {}
    },
    actions = {
        /**
        *
        * @param {object} data данные
        * @param {string} data.container контейнер
        * @param {number} data.width ширина
        * @param {number} data.height высота
        * @returns {void}
        */
        initKonva({ state, commit, rootState }, data) {
            commit('INIT', data);

            // TODO @dyadyaJora: по хорошему нужно подписываться на обычний клик и чекать клик по конве
            // иначе возможны различные баги и артефакты по поводу того как тригерится именно этот contentClick
            state.konva.on('contentClick', function(e) {
                let curPos = state.layerPlayers.findOne('#object' + rootState.currentPlayer).getAbsolutePosition(),
                    data = calcSkillVector(
                        // воооот здесь могут быть баги =)
                        curPos,
                        state.konva.getPointerPosition()
                    );

                console.log('KONVA CLICK',data);
                //если левая кнопка мышки
                if (e.evt.button == 0 ) {
                    socket.emit('left', data);
                // если правая
                } else if (e.evt.button == 2) {
                    socket.emit('right', data);
                }
            });
        }
    },
    mutations = {
        /**
        *
        * @param {object} context объект конвы из хранилища
        * @param {object} data данные
        * @param {string} data.container контейнер
        * @param {number} data.width ширина
        * @param {number} data.height высота
        * @returns {void}
        */
        INIT(context, data) {
            context.konva = new Konva.Stage({
                container: data.container,
                width: data.width,
                height: data.height
            });
            context.layerMapSprite = new Konva.Layer();
            context.konva.add(context.layerMapSprite);

            context.layerPlayers = new Konva.Layer();
            context.konva.add(context.layerPlayers);

            context.layerMissile = new Konva.Layer();
            context.konva.add(context.layerMissile);
        },

        ADD_PLAYER(context, data) {
            console.log('Konva ADD_PLAYER');
            drawNewPlayer(context.layerPlayers, data);
        },

        ALL_PLAYERS(context, players) {
            console.log('Konva ALL_PLAYERS');
            
            context.layerPlayers.clear();
            context.layerPlayers = new Konva.Layer();
            context.konva.add(context.layerPlayers);
            players.forEach((item) => {
                drawNewPlayer(context.layerPlayers, item);
            });
        },

        DELETE_PLAYER (context, id) {
            console.log('Konva DELETE_PLAYER');
            let obj = context.layerPlayers.findOne('#object' + id);

            obj && obj.remove();

            context.layerPlayers.draw();
        },

        MOVE_PLAYER (context, data) {
            console.log('Konva MOVE_PLAYER');
            let obj = context.layerPlayers.findOne('#object' + data.id);

            obj && obj.setAbsolutePosition({ x: data.pos.x, y: data.pos.y});

            context.layerPlayers.draw();
        }
    },
    getters = { };

function calcSkillVector(point1, point2) {
    let rx = (point1.x - point2.x) * -1,
        ry = (point1.y - point2.y) * -1,
        r = Math.sqrt(Math.pow(rx, 2) + Math.pow(ry, 2));

    return {
        a: rx / r,
        b: ry / r
    };
}

function drawNewPlayer(layer, data) {
    layer.findOne('#object' + data.id) ||
        layer.add(
            new Konva.Rect({
                x: data.position.x,
                y: data.position.y,
                // TODO @dyadyaJora: разобраться почему не прокидывается dimentions и выпилить
                width: data.position.dimentions || 30, 
                height: data.position.dimentions || 30,
                fill: '#0f0',
                stroke: 'black',
                strokeWidth: 4,
                id: 'object' + data.id
            })
        );

    layer.draw();
}

export default {
    state,
    actions,
    mutations,
    getters
};
