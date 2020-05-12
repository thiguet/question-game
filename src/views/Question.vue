<template>
  <v-card class="elevation-12">
    <v-card-text>
      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-row justify="center" align="center">
          <v-col cols="12">
            <v-textarea
              name="question-input"
              rows="1"
              :key="question"
              :loading="loading"
              filled
              label="Pergunta"
              auto-grow
              outlined
              readonly
              class="question-text"
              :value="question"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row justify="center" align="center"
          v-for="(answer, index) in answers" :key="answer.id">
            <v-col cols="9" md="10">
              <v-textarea md="1"
                rows="1"
                v-model="answer.description"
                :key="index"
                auto-grow
                readonly
                label="Resposta"
                required
                class="answer-text"
                ></v-textarea>
            </v-col>
            <v-col cols="3" md="2">
              <v-radio-group v-model="selectedAnswer">
                <v-radio
                  class="sm-12"
                  :key="answer.id"
                  label=""
                  :value="index"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-row justify="end">
        <v-btn
        :disabled="!valid" color="success" class="mr-4" @click="submitAnswer">Responder</v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('question');

export default {
  name: 'Question',
  data: () => ({
    loading: false,
    lazy: false,
    selectedAnswer: null,
  }),
  computed: {
    ...mapState(['answers', 'question', 'questionId']),
    valid: {
      get() { return this.selectedAnswer !== null; },
      set() {},
    },
    isGameOver() {
      return this.$store.state.game.isGameOver;
    },
  },
  watch: {
    isGameOver() {
      this.checkGameOver();
    },
  },
  methods: {
    ...mapGetters(['hasNextQuestion']),
    ...mapActions(['sendAnswer', 'getSessionQuestions', 'nextQuestion']),
    submitAnswer() {
      if (!this.$store.state.game.isGameOver) {
        this.sendAnswer({
          questionId: this.questionId,
          answerId: this.answers[this.selectedAnswer].id,
          userId: this.$store.state.user.user.id,
        }).then(() => {
          if (this.hasNextQuestion()) {
            this.loading = true;
            Vue.nextTick(() => this.nextQuestion().then(() => { this.loading = false; }));
          } else {
            this.$store.dispatch('game/gameOver');
            this.$router.push('r');
          }
        });
      }
    },
    getRandomAnswer() {
      return new Date().getMilliseconds() % this.answers.length;
    },
    checkGameOver() {
      if (this.$store.state.game.isGameOver) {
        this.$router.push('/r');
      }
    },
  },
  mounted() {
    this.loading = true;
    Vue.nextTick(() => this.getSessionQuestions().then(() => { this.loading = false; }));
    this.checkGameOver();
  },
};
</script>

<style>
.v-input__slot {
  background: none !important;
}

.answer-text {
  font-size: 12px !important; 
}

.question-text {
  font-size: 12px !important;
}

</style>
