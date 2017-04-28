import store from '../../store/playersStore.js';
window.x = store;
export default {
    name: 'players-list',
    store,
    computed: {
        players() {
            return this.$store.getters.getPlayers
                .sort( (a, b) => {
                    if (a.score < b.score) 
                        return 1;
                    if (a.score > b.score)
                        return -1;
                    return 0;
                })
                .slice(0, 10);
        }
    }
}