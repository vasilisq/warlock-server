import PlayersList from '../PlayersList/PlayersList.vue';
import CanvasContainer from '../CanvasContainer/CanvasContainer.vue';
import LoginScreen from '../LoginScreen/LoginScreen.vue';

window.ls = LoginScreen;
export default {
    name: 'app',
    data () {
        return {
            msg: 'Warlock'
        };
    },
    components: {
        PlayersList,
        CanvasContainer,
        LoginScreen
    }
};