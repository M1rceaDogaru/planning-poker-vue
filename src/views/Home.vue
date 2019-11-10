<template>
  <v-container fill-height>
        <LoadingSpinner v-if="loading"></LoadingSpinner>
        <v-layout v-else align-center justify-center>
            <v-flex xs12 sm8 md4>
              <h1 class="blue--text">MOKER</h1>
                <v-alert
                    v-model="alert"
                    type="error"
                    close-text="Close Alert"
                    dark
                    dismissible
                    >{{ alertMessage }}</v-alert
                >
                <v-form ref="form" lazy-validation>
                    <v-text-field
                        prepend-icon="account_box"
                        name="name"
                        label="Name or nickname"
                        type="text"
                        v-model="name"
                        required
                    >
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        @click="startNewSession"
                        >Start new session</v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field
                        prepend-icon="email"
                        name="sessionId"
                        label="Session ID"
                        type="text"
                        v-model="sessionId"
                        required
                    >
                    </v-text-field>
                    <v-btn
                        color="primary"
                        @click="joinSession"
                        >Join session</v-btn>
                </v-form>
            </v-flex>
        </v-layout>
  </v-container>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner';

export default {
  name: "home",
  components: {
    LoadingSpinner
  },
  data() {
    return {
      loading: false,
      alert: false,
      alertMessage: "",
      name: "",
      userId: null,
      sessionId: ""
    };
  },
  mounted() {
    if (window.$cookies.isKey("user")) {
      var user = window.$cookies.get("user");
      this.name = user.name;
      this.userId = user.id;
    }

    if (this.$route.params.sessionId) {
      this.sessionId = this.$route.params.sessionId;
    }
  },
  methods: {
    startNewSession() {
      this.loading = true;
      this.updateUser();
      
      this.$store.dispatch('createNewSession', {
          config: {
            moderator: this.userId,
            isVoting: false,
            votingTimer: 0,
            votingResult: 0,
          },          
          users: {}
        })
        .then((sessionId) => {
          this.loading = false;
          this.redirectToPlanning(sessionId);
        });
    },
    joinSession() {
      this.updateUser();
      this.redirectToPlanning(this.sessionId);
    },
    updateUser() {
      if (!this.userId) {
        this.userId = "u" + this.getUniqueId();
      }
      
      this.$store.dispatch('setUserOnStart', {
        name: this.name,
        id: this.userId     
      });
    },
    getUniqueId() {
      return (+new Date).toString(36).slice(-8);
    },
    redirectToPlanning(sessionId) {
      this.$router.push("/planning/" + sessionId);
    }
  }
};
</script>
