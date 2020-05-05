<template>
  <v-app>
    <Menu />
    <v-content>
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="12" md="10">
              <router-view></router-view>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-content>
  </v-app>
</template>

<script>
import Menu from '@/components/Menu.vue';

export default {
  name: 'App',
  data: () => ({
    drawer: [],
  }),
  components: {
    Menu,
  },
};
</script>

<style scoped>
.v-application {
  font-family: 'Montserrat';
}
</style>
