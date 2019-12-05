<template>
    <v-app>
        <v-content transition="slide-x-transition">
            <router-view></router-view>
        </v-content>
        <footer>
            <v-layout class="footer-legal" align-center justify-center>
                <router-link to="legal/stuff">Legal stuff</router-link>
            </v-layout>
            <cookie-law theme="dark-lime">
                <div slot="message">
                    We use cookies. <router-link to="legal/stuff">Click here</router-link> to find out more.
                </div>
            </cookie-law>
        </footer>
    </v-app>
</template>

<script>
import CookieLaw from 'vue-cookie-law';

export default {
    name: 'App',
    components: {
        CookieLaw
    }
};
</script>

<style>
.footer-legal {
    background-color: lightblue;
}
</style>
