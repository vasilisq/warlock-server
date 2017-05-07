<template>
    <div class="players-list">
        <div class="players-list__title">Top Players</div>
        <ol class="players-list__block">
            <li v-for="player in players">
            <!-- TODO: выводить здесь еще и счет, очки , время подключения или еще что? -->
                <span class="players-list__name">{{ player.name }}</span>
            </li>
        </ol>
    </div>
</template>
<script src="./PlayersList.js"></script>
<style src="./PlayersList.css"></style>