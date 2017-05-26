import socket from '../../api/socket';

export default {
    name: 'login-screen',
    data: function() {
        return {
            name: ''
        }
    },
    methods: {
        submit: function(e) {
            if (this.name.length == 0 || this.name.length > 20) {
                $('#error-alert').show();
                return;
            }
            socket.emit('authenticate', this.name);
        },
        showLoginScreen: function() {
            jQuery('#myModal').modal({
                backdrop: 'static',
                keyboard: false
            });
        },
        closeLoginScreen: function() {
            jQuery('#myModal').modal('hide');
        },
        closeAlert: function() {
            jQuery('#error-alert').hide();
        }
    }
};