import PlayersList from '../PlayersList/PlayersList.vue';
import CanvasContainer from '../CanvasContainer/CanvasContainer.vue';
import LoginScreen from '../LoginScreen/LoginScreen.vue';
import WaitScreen from '../WaitScreen/WaitScreen.vue';

window.ws = WaitScreen;
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
        LoginScreen,
        WaitScreen
    }
};