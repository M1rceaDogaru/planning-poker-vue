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
            state.activeSession.id = session.id;
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
                vote: -1
            });

            sessionRef.on('value', snapshot => {
                var session = snapshot.val();
                session.id = sessionId;
                commit('updateActiveSession', session);
            });
        },
        startVoting({ state }, { sessionId, users }) {
            firebase
                .database()
                .ref("sessions/" + sessionId + "/users")
                .update(users);

            firebase
                .database()
                .ref("sessions/" + sessionId + "/config")
                .update({
                    isVoting: true,
                    votingTimer: 15
                });
        },
        stopVoting({ state }, sessionId) {
            firebase
                .database()
                .ref("sessions/" + sessionId + "/config")
                .update({
                    isVoting: false,
                    votingTimer: 0
                });
        },
        updateUserState({ state }, { sessionId, userId, data }) {
            firebase
                .database()
                .ref("sessions/" + sessionId + "/users/" + userId)
                .update(data);
        }
    }
});
