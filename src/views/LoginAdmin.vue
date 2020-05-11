<template>
  <v-card class="elevation-12">
    <v-toolbar color="indigo" dark flat>
      <v-toolbar-title>Admin</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field v-model="name" label="Login" name="Register" type="text" />
        <v-text-field v-model="pass" label="Senha" name="Register" type="password" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="indigo" dark @click="login">Logar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('user');

export default {
  name: 'Admin',
  data: () => ({
    name: '',
    pass: '',
  }),
  methods: {
    ...mapActions({
      loginAction: 'login',
    }),
    async login() {
      if (this.name && this.pass) {
        const userData = await this.loginAction({
          name: this.name,
          pass: this.pass,
        });
        if (userData) this.redirectToHome();
      }
    },
    redirectToHome() {
      this.$router.push('c');
    },
  },
};
</script>
