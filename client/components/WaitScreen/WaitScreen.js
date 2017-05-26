import store from '../../store';


export default {
    name: 'wait-screen',
    store,
    data: function() {
        return {
            name: ''
        }
    },
    computed: {
        waiting() {
            if (this.$store.getters.getWaitingRespawnStatus) 
                this.open();
            else 
                this.close();
            return this.$store.getters.getWaitingRespawnStatus;
        }
    },
    methods: {
        open: function() {
            jQuery('#waitScreen').modal({
                backdrop: 'static',
                keyboard: false
            });
        },
        close: function() {
            jQuery('#waitScreen').modal('hide');
        }
    }
};