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
                  <v-btn class="ml-3 mb-2 primary" @click="startVoting()">Start voting</v-btn>
                </div>
                <v-label v-if="session.config.isVoting">VOTING IN PROGRESS</v-label>
                <v-card
                        class="mx-3 mb-5"
                        max-width="400"
                        v-for="(user, id, i) in session.users"
                        :key="i"
                    >
                        <v-card-title
                            class="headline mb-2 blue lighten-1 white--text"
                            >{{ user.name }}</v-card-title
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
      user: this.$store.state.user
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
      this.$store.dispatch("startVoting", this.session.id);
    },
    joinSession() {
      
    }
  }
};
</script>
