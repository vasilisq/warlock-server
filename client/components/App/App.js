import PlayersList from '../PlayersList/PlayersList.vue'
import CanvasContainer from '../CanvasContainer/CanvasContainer.vue'

export default {
    name: 'app',
    data () {
        return {
            msg: 'Warlock'
        }
    },
    components: {
        PlayersList,
        CanvasContainer
    }
}