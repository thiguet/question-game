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
    </v-col>
  </v-card>
</template>

<script>
import { getUser } from '@/_services/userServices';

export default {
  name: 'Ranking',
  data: () => ({
    users: [],
  }),
  async mounted() {
    this.users = await getUser();
  },
};
</script>
