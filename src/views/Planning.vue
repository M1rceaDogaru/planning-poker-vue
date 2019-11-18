<template>
  <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-alert
                    v-model="alert"
                    type="error"
                    close-text="Close Alert"
                    dark
                    dismissible
                    >{{ alertMessage }}</v-alert
                >
                <div v-if="session.config.moderator === user.id">
                  <v-label>You are the moderator</v-label>
                  <br/>
                  <v-btn v-if="!session.config.isVoting" class="ml-3 mb-2 primary" @click="startVoting()">Start voting</v-btn>
                  <v-btn v-if="session.config.isVoting" class="ml-3 mb-2 primary" @click="stopVoting()">Stop voting</v-btn>
                </div>
                <v-label v-if="session.config.isVoting">VOTING IN PROGRESS. PICK A NUMBER.</v-label>

                <v-row>
                  <v-card
                          class="mx-3 mb-5"
                          width="60"
                          v-for="(value, id, i) in values"
                          :key="i"
                          @click="castVote(value)"
                      >
                      <v-card-title v-if="session.users[user.id].vote === value"
                          class="headline mb-2 green lighten-1 white--text"
                          >{{ value }}</v-card-title
                      >

                      <v-card-title v-else
                          class="headline mb-2 blue lighten-1 white--text"
                          >{{ value }}</v-card-title
                      >
                  </v-card>
                </v-row>
                
                <v-card
                        class="mx-3 mb-5"
                        max-width="400"
                        v-for="(user, id, i) in session.users"
                        :key="i"
                    >
                    <v-card-title
                        class="headline mb-2 blue lighten-1 white--text"
                        >{{ user.name }} - {{ user.vote }} </v-card-title
                    >
                </v-card>                
            </v-flex>
        </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      alert: false,
      alertMessage: "",
      session: this.$store.state.activeSession,
      user: this.$store.state.user,
      values: [0,1,2,3,5,8,13,21,34,55,89]
    };
  },
  mounted() {
    if (!this.$store.state.user) {
      this.$router.push("/" + this.$route.params.sessionId);
    }

    this.$store.dispatch("subscribeToSession", this.$route.params.sessionId);
  },
  methods: {
    startVoting() {
      for (var user in this.session.users) {
        this.session.users[user].vote = -1;
      }

      this.$store.dispatch("startVoting", {
        sessionId: this.session.id,
        users: this.session.users
      });
    },
    stopVoting() {
      this.$store.dispatch("stopVoting", this.session.id);
    },
    castVote(value) {
      this.$store.dispatch("updateUserState", { 
        sessionId: this.session.id, 
        userId: this.user.id, 
        data: { 
          vote: value 
        } 
      });
    }
  }
};
</script>
