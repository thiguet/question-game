<template>
  <v-card class="elevation-12">
    <v-card-text>
      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-row justify="center" align="center">
          <v-col cols="12">
            <v-textarea
              name="input-7-1"
              rows="1"
              label="Pergunta"
              auto-grow
              v-model="question"
              :counter="400"
              :maxlength="400"
              class="default-text"
              :rules="answersRules"
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row justify="center" align="center"
          v-for="(answer, index) in answers" :key="index">
            <v-col cols="6" sm="9" md="9">
              <v-textarea
              class="default-text"
                v-model="answer.text"
                label="Resposta"
                required
                rows="1"
                auto-grow></v-textarea>
            </v-col>
            <v-col cols="2" sm="1" md="1">
              <v-btn color="indigo" fab dark small class="mr-2 " @click="addAnswer" dense>
                <v-icon color="white">mdi-plus</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="2" sm="1" md="1">
              <v-btn color="indigo" fab dark small class="mr-2" @click="removeAnswer(index)" dense>
                <v-icon color="white">mdi-delete</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="2" sm="1" md="1">
              <v-radio-group v-model="selectedAnswer">
                <v-radio
                  color="indigo"
                  class="sm-12"
                  :key="index"
                  label=""
                  :value="index"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-btn color="error" class="mr-4" @click="reset">Limpar</v-btn>
            <v-btn
            :disabled="!valid" color="success" class="mr-4" @click="save">Adicionar</v-btn>
          </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('question');

export default {
  name: 'AddQuestion',
  data: () => ({
    valid: true,
    answersRules: [
      (v) => !!v || 'A pergunta é obrigatória!',
      (v) => (v && v.length <= 400) || 'A pergunta deve possuir no máximo 400 caracteres!',
    ],
    lazy: false,
  }),
  methods: {
    ...mapActions(['newQuestion', 'resetQuestionData']),
    reset() {
      this.$refs.form.reset();
      this.resetQuestionData();
      Vue.nextTick(() => { this.selectedAnswer = 0; });
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    addAnswer() {
      const newAnswers = this.answers;
      if (newAnswers.length < 5) {
        this.answers = [
          ...newAnswers,
          {
            text: '',
            correct: false,
          },
        ];
      } else {
        this.$store.dispatch('showDialog', 'Número máximo de respostas alcançado!', { root: true });
      }
    },
    removeAnswer(index) {
      const newAnswers = this.answers;
      if (newAnswers.length !== 2) {
        newAnswers.splice(index, 1);
        this.answers = newAnswers;
        this.selectedAnswer = 0;
      } else {
        this.$store.dispatch('showDialog', 'Número mínimo de respostas alcançado!', { root: true });
      }
    },
    save() {
      const {
        valid,
        question,
        answers,
        selectedAnswer,
      } = this;
      if (valid) {
        this.newQuestion({
          question,
          answers: answers.map((a, index) => ({
            label: a.text,
            correct: index === selectedAnswer,
          })),
        }).then(() => {
          this.reset();
        });
      } else {
        this.$store.dispatch('showDialog', 'Favor preencher todos os campos obrigatórios!', { root: true });
      }
    },
  },
  computed: {
    selectedAnswer: {
      get() { return this.$store.state.question.rightAnswer; },
      set(rightAnswer) { this.$store.commit('question/setRightAnswer', rightAnswer); },
    },
    question: {
      get() { return this.$store.state.question.question; },
      set(question) { this.$store.commit('question/setQuestion', question); },
    },
    answers: {
      get() { return this.$store.state.question.answers; },
      set(answers) { this.$store.commit('question/setAnswers', answers); },
    },
  },
};
</script>

<style scoped>
  .default-text {
    font-size: 14px;
  }
</style>
