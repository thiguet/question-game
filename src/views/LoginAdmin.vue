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
import { newUser } from '@/_services/userServices';

export default {
  name: 'Register',
  data: () => ({
    name: '',
    pass: '',
  }),
  methods: {
    login() {
      if (this.name) {
        newUser(this.name);
      }
    },
  },
};
</script>
