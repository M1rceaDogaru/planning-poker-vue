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
                <v-form ref="form" v-model="valid" lazy-validation>
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
export default {
  name: "home",
  data() {
    return {
      alert: false,
      alertMessage: "",
      name: "",
      sessionId: ""
    };
  },
  methods: {
    startNewSession() {

    },
    joinSession() {
      
    }
  }
};
</script>
