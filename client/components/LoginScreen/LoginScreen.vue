<template>
    <div class='modal fade login-screen' id='myModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'>
        <div class='modal-dialog' role='document'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h4 class='modal-title' id='myModalLabel'>Warlock.io</h4>
                </div>
                <div class='modal-body'>
                    <div class='form-group'>
                        <label for='nickname'>Enter your nickname</label>
                        <input type='text' class='form-control' id='nickname' placeholder='Nickname' v-model='name' v-on:focus='closeAlert'>
                    </div>
                    <div class='alert alert-danger alert-dismissible' id='error-alert' role='alert' style="display:none;">
                        <button type='button' class='close' aria-label='Close' v-on:click='closeAlert'><span aria-hidden='true'>&times;</span></button>
                        <strong>Error!</strong> The name can consist of symbols of the Latin alphabet and numbers, and also have a length from 1 to 20 characters.
                    </div>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-primary' v-on:click='submit'>Play</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script src='./LoginScreen.js'></script>
<style src='./LoginScreen.css'></style>