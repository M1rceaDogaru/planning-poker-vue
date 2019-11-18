<template>
  <v-container fill-height>
        <v-layout align-center justify-center>
            <v-row>
                <v-alert
                    v-model="alert"
                    type="error"
                    close-text="Close Alert"
                    dark
                    dismissible
                    >{{ alertMessage }}</v-alert
                >
                <v-col>
                  <div v-if="isModerator">
                    <v-label>You are the moderator</v-label>
                    <br/>
                    <v-btn v-if="!session.config.isVoting" class="mb-2 primary" @click="startVoting()">Start voting</v-btn>
                    <v-btn v-else class="mb-2 primary" @click="stopVoting()">Stop voting</v-btn>
                  </div>

                  <v-label>VOTING TIME</v-label>
                  <h1>{{ session.config.votingTimer }} sec.</h1>
                
                  <br/>

                  <v-label v-if="session.config.isVoting">VOTING IN PROGRESS. PICK A NUMBER.</v-label>
                  <v-label v-else>WAITING FOR MODERATOR TO START VOTING...</v-label>
                  <br/>

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

                  <v-label>RESULT:</v-label>
                  <h1 v-if="!session.config.isVoting">{{ votingResult }}</h1>
                  <h1 v-else>-</h1>
                </v-col>
                
                <v-col>
                  <v-card
                          class="mx-3 mb-5"
                          max-width="400"
                          v-for="(user, id, i) in session.users"
                          :key="i"
                      >
                      <v-card-title v-if="user.vote > -1"
                          class="headline mb-2 green lighten-1 white--text">
                          <div>{{ user.name }}</div>
                          <v-spacer />
                          <div>{{ displayUserVote(user) }}</div>
                      </v-card-title>
                      <v-card-title v-else
                          class="headline mb-2 blue lighten-1 white--text">
                          <div>{{ user.name }}</div>
                          <v-spacer />
                          <div>{{ displayUserVote(user) }}</div>
                      </v-card-title>
                  </v-card>    
                </v-col>            
            </v-row>
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
  computed: {
    isModerator() {
      return this.session.config.moderator === this.user.id;
    },
    votingResult() {
      var numberOfVotes = 0;
      var voteSum = 0;
      for (var user in this.session.users) {
        var userVote = this.session.users[user].vote;
        if (userVote > -1) {
          numberOfVotes += 1;
          voteSum += userVote;
        }
      }

      if (numberOfVotes > 0) {
        return Math.round(voteSum / numberOfVotes);
      }

      return 0;
    }
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

      var timer = setInterval(() => {
        var newInterval = this.session.config.votingTimer - 1;
        if (newInterval <= 0) {
          this.stopVoting();
          clearInterval(timer);
        } else {
          this.$store.dispatch("updateVoting", {
            sessionId: this.session.id,
            timer: newInterval
          });
        }
      }, 1000)
    },
    stopVoting() {
      this.$store.dispatch("stopVoting", this.session.id);
    },
    castVote(value) {
      if (!this.session.config.isVoting) {
        return;
      }

      this.$store.dispatch("updateUserState", { 
        sessionId: this.session.id, 
        userId: this.user.id, 
        data: { 
          vote: value 
        } 
      });
    },
    displayUserVote(user) {
      return !this.session.config.isVoting && user.vote > -1 ? user.vote : "";
    }
  }
};
</script>
<style scoped>
h1 {
  font-size: 62px;
}
</style>
