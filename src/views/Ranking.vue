<template>
  <v-card class="elevation-12">
    <v-col>
      <h1>Pontuação</h1>
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Nome</th>
              <th class="text-left">Pontos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.points }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-btn @click="onClickRefresh">Atualizar</v-btn>
    </v-col>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('ranking');

export default {
  name: 'Ranking',
  computed: {
    ...mapState(['users']),
  },
  methods: {
    ...mapActions(['getUsers']),
    onClickRefresh() {
      this.getUsers();
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>
