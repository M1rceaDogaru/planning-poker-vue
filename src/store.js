import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        activeSession: {
            config: {},
            users: {}
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        updateActiveSession(state, session) {
            state.activeSession.config = session.config,
            state.activeSession.users = session.users
        }
    },
    actions: {
        setUserOnStart({ commit }, user) {
            window.$cookies.set("user", user, "100d");
            commit('setUser', user);            
        },
        createNewSession({ state }, session) {
            var newSessionRef = firebase
                .database()
                .ref("sessions")
                .push(session);
            
            return newSessionRef.key;
        },
        subscribeToSession({ state, commit }, sessionId) {
            var sessionRef = firebase
                .database()
                .ref("sessions/" + sessionId);
            
            sessionRef.child("users/" + state.user.id).set({
                name: state.user.name,
                vote: 0
            });

            sessionRef.on('value', snapshot => {
                commit('updateActiveSession', snapshot.val());
            });
        }
    }
});
