<template>
    <div class="players-list">
        <div class="players-list__title">Top Players</div>
        <ol class="players-list__block">
            <li v-for="player in players">
                <span class="players-list__name">{{ player.name || ( 'Name_'  + player.id ) }}</span>
            </li>
        </ol>
    </div>
</template>
<script src="./PlayersList.js"></script>
<style src="./PlayersList.css"></style>