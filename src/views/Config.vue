<template>
  <v-sheet class="d-flex" color="indigo lighten-5" height="424">
    <v-col class="mr-auto">
      <div class="my-2">
        <v-row justify="center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                @click="onClickStartGame"
                color="indigo"
                dark
                :disabled="!gameOver"
                v-on="on">Iniciar uma nova partida</v-btn>
            </template>
            <span>Iniciar uma nova partida.</span>
          </v-tooltip>
        </v-row>
      </div>
      <div class="my-2">
        <v-row justify="center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                :disabled="gameOver"
                @click="onClickEndGame"
                color="indigo"
                dark
                v-on="on">Finalizar partida</v-btn>
            </template>
            <span>Finaliza a partida em andamento.</span>
          </v-tooltip>
        </v-row>
      </div>
    </v-col>
  </v-sheet>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState } = createNamespacedHelpers('game');

export default {
  name: 'Config',
  methods: {
    ...mapActions(['startGame', 'endGame', 'isGameStarted']),
    onClickStartGame() {
      this.startGame(this.token);
    },
    onClickEndGame() {
      this.endGame(this.token);
    },
  },
  computed: {
    ...mapState(['isGameOver']),
    gameOver() {
      return this.isGameOver;
    },
    isWebSocketConnected() {
      return this.$store.state.socket.isConnected;
    },
    token() {
      const { token } = this.$store.state.user.user;
      return token;
    },
  },
  watch: {
    isWebSocketConnected() {
      this.isGameStarted(this.token);
    },
  },
  mounted() {
    // ;
  },
};
</script>
