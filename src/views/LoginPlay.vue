<template>
  <v-card class="elevation-12">
    <v-toolbar color="indigo" dark flat>
      <v-toolbar-title>Login</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field v-model="name" label="Nome de Usuário" name="Register" type="text" />
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
  }),
  methods: {
    async login() {
      if (this.name) {
        await newUser(this.name);
      }
    },
  },
};
</script>
