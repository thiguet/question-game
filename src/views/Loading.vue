<template>
  <div>
    <v-row justify="center">
      <v-col class="title" cols="10" md="12" align="center">
        <span class="title">Aguarde o ADM iniciar o jogo:</span>
      </v-col>
    </v-row>
    <v-row justify="center">
        <v-progress-circular
              :width="10"
              :size="70"
              indeterminate color="indigo"></v-progress-circular>
    </v-row>
    {{ sessionId ?  redirectToQuestion() : '' }}
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('game');

export default {
  name: 'Loading',
  computed: {
    ...mapState(['sessionId']),
    isWebSocketConnected() {
      return this.$store.state.socket.isConnected;
    },
  },
  watch: {
    isWebSocketConnected() {
      if (this.$store.state.socket.isConnected) {
        this.checkIfGameHasStarted();
      }
    },
    sessionId() {
      if (this.sessionId) {
        this.redirectToQuestion();
      }
    },
  },
  methods: {
    redirectToQuestion() {
      this.$router.push('q');
    },
    checkIfGameHasStarted() {
      this.$store.dispatch('sendJSON', {
        wsAction: 'IS_GAME_STARTED',
      });
    },
  },
  mounted() {
    this.checkIfGameHasStarted();
  },
};
</script>

<style scoped>
.title {
  font-size: 20px;
  margin-bottom: 80px;
}

@media(max-width:600px) {
  .title {
    font-size: 30px;
    margin-bottom: 60px;
  }
}
</style>
