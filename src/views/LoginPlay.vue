<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar color="indigo" dark flat>
        <v-toolbar-title>Login</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            :rules="[nameRules]"
            counter
            maxlength="50"
            v-model="name"
            label="Nome de Usuário"
            name="Register"
            type="text" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="indigo" dark @click="login">Logar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import { getSessionId } from '@/_services/questionServices';

const { mapState, mapActions } = createNamespacedHelpers('user');

export default {
  name: 'LoginPlay',
  data: () => ({
    name: '',
    nameRules: (name) => name.length <= 50 || 'Máximo de 50 caracteres!',
  }),
  computed: {
    ...mapState({
      user: ({ user }) => user,
    }),
    getSessionId() {
      return this.$store.state.game.sessionId;
    },
  },
  methods: {
    ...mapActions([
      'addNewUser',
    ]),
    login() {
      if (this.name) {
        this.addNewUser(this.name).then(() => {
          this.redirectToHome();
        });
      }
    },
    redirectToQuestion() {
      this.$router.push('q');
    },
    redirectToHome() {
      if (getSessionId()) {
        this.$router.push('q');
      } else {
        this.$router.push('lo');
      }
    },
  },
};
</script>
