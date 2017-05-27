<template>
    <div class='modal fade login-screen' id='waitScreen' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'>
        <div class='modal-dialog modal-sm' role='document'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h4 class='modal-title' id='myModalLabel'>Wait to respawn...</h4>
                </div>
                <div class='modal-body'>
                    <div class="respawn-spinner"></div>
                    <div class="hidden">{{ waiting }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src='./WaitScreen.js'></script>
<style src='./WaitScreen.css'></style>