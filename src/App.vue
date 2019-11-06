<template>
    <v-app>
        <app-navigation></app-navigation>

        <v-content transition="slide-x-transition">
            <router-view></router-view>
        </v-content>
        <footer>            
        </footer>
    </v-app>
</template>

<script>
export default {
    name: 'App'
};
</script>

<style>
</style>
