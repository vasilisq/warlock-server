import store from '../../store';

export default {
    name: 'canvas-container',
    store,
    computed: {
        // перерисовывать при любых изменениях в объекте Konva 
        // пока не знаю - косыль это или фича, потому что так 
        // будет перерисовываться на каждый чих
        /*doRedraw() {
            store.dispatch('doRedraw');
            return this.$store.konva;
        }*/
    }
}