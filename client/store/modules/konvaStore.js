import Konva from 'konva';
import socket from '../../api/socket';

const state = {
        konva: {},
        layerMapSprite: {},
        layerPlayers: {},
        layerMissile: {},
        animations: []
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
        },

        missileStart({ commit }, data) {
            commit('MISSILE_START', data);
        },

        missileEnd({ commit }, data) {
            commit('MISSILE_END', data);
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
            let obj = context.layerPlayers.findOne('#object' + id),
                hpLine = context.layerPlayers.findOne('#hp' + id);

            if (obj && hpLine) {
                obj.remove();
                hpLine.remove();
            }

            context.layerPlayers.draw();
        },

        MOVE_PLAYER (context, data) {
            console.log('Konva MOVE_PLAYER');
            let obj = context.layerPlayers.findOne('#object' + data.id),
                hpLine = context.layerPlayers.findOne('#hp' + data.id),
                text = context.layerPlayers.findOne('#name' + data.id);

            if (obj && text && hpLine) {
                obj.setAbsolutePosition({ x: data.pos.x, y: data.pos.y});

                text.x(data.pos.x - (text.width() - obj.width()) / 2);
                text.y(data.pos.y - 20);

                hpLine.x(data.pos.x);
                hpLine.y(data.pos.y - 5);
            }

            context.layerPlayers.draw();
        },

        MISSILE_START(context, data) {
            let skill = new Konva.Rect({
                    x: data.Vector.x || 0,
                    y: data.Vector.y || 0,
                    width: data.With.dimensions,
                    height: data.With.dimensions,
                    fill: '#f00',
                    id: 'missile' + data.With.id,
                }),
                anim;

            context.layerMissile.add(skill);
            anim = new Konva.Animation(function(frame) {
                skill.setPosition({
                    x: data.Vector.x + data.Direction.x * data.Speed * frame.time / 1000,
                    y: data.Vector.y + data.Direction.y * data.Speed * frame.time / 1000
                });
            }, context.layerMissile);
            anim.missileId = data.With.id;
            anim.start();  

            context.animations.push(anim);
        },

        MISSILE_END (context, id) {
            let index = context.animations.findIndex( (item) => id === item.missileId),
                skill = context.layerMissile.findOne('#missile' + id);

            context.animations[index].stop();
            context.animations.splice(index, 1);
            skill.remove();
            context.layerMissile.draw();
        },

        /**
        *
        * @param {object} context контекст
        * @param {object} data данные
        * @param {number} data.id id
        * @param {number} data.hp новое hp 
        * @param {number} data.maxHp максимальное значение hp
        * @param {number} data.dimensions размеры игрока
        * @returns {void}
        */
        CHANGE_HP (context, data) {
            let hpLine = context.layerPlayers.findOne('#hp' + data.id),
                val = data.dimensions * data.hp / data.maxHp;

            hpLine.points([ 0, 0, val, 0]);
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
    if (!layer.findOne('#object' + data.id)) {
        layer.add(
            new Konva.Rect({
                x: data.position.x,
                y: data.position.y,
                width: data.dimensions, 
                height: data.dimensions,
                fill: '#0f0',
                id: 'object' + data.id
            })
        );

        layer.add(
            new Konva.Line({
                x: data.position.x,
                y: data.position.y - 5,
                points: [ 0, 0, data.dimensions, 0],
                stroke: 'red',
                strokeWidth: 5,
                id: 'hp' + data.id
            })
        );

        let nameText = new Konva.Text({
            text: data.name || 'Name_' + data.id,
            fill: 'black',
            fontSize: 12,
            fontFamily: 'cursive',
            y: data.position.y - 20,
            id: 'name' + data.id
        });

        nameText.x(data.position.x - (nameText.width() - (data.dimensions || 30)) / 2);
        layer.add(nameText);
    }

    layer.draw();
}

export default {
    state,
    actions,
    mutations,
    getters
};
