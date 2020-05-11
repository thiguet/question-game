<template>
  <v-app>
    <Menu />
    <v-dialog
      v-model="showDialog"
      max-width="290">
      <v-card>
        <v-card-title>{{ dialogTitle }}</v-card-title>
        <v-card-text>{{ dialogText }}</v-card-text>
        <v-card-actions>
          <v-btn
            color="green darken-1"
            text
            @click="closeDialog">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="10">
          <v-content>
            <router-view></router-view>
          </v-content>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Menu from '@/components/Menu.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Menu,
  },
  computed: {
    showDialog: {
      get() { return this.$store.state.showDialog; },
      set() { this.$store.dispatch('closeDialog'); },
    },
    ...mapState({
      dialogTitle: (state) => state.dialogTitle,
      dialogText: (state) => state.dialogText,
    }),
  },
  methods: {
    closeDialog() {
      this.$store.dispatch('closeDialog');
    },
  },
};
</script>

<style scoped>
.v-application {
  font-family: 'Montserrat';
}
</style>
