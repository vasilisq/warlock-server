import store from '../../store/konvaStore.js';

export default {
    name: 'canvas-container',
    store,
    computed: {
        // перерисовывать при любых изменениях в объекте Konva 
        // пока не знаю - косыль это или фича
        /*doRedraw() {
            store.dispatch('doRedraw');
            return this.$store.konva;
        }*/
    }
}