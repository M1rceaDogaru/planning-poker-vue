import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import '@/firebase/';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import VueCookies from 'vue-cookies';

import firebase from 'firebase';

Vue.config.productionTip = false;

app = new Vue({
    router,
    store,
    vuetify,
    VueCookies,
    render: h => h(App)
}).$mount('#app');
