<template>
  <v-card class="elevation-12">
    <v-card-text>
      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-row justify="center" align="center">
          <v-col cols="12">
            <v-text-field
              v-model="question"
              :counter="100"
              :rules="answersRules"
              label="Pergunta"
              required></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center"
          v-for="(answer, index) in answers" :key="index">
            <v-col cols="12" md="7">
              <v-text-field md="1"
                v-model="answer.text" label="Resposta" required></v-text-field>
            </v-col>
            <v-col cols="3" md="1">
              <v-btn color="indigo" class="mr-2" @click="addAnswer">
                <v-icon color="white">mdi-plus</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="3" md="2">
              <v-btn color="indigo" class="mr-2" @click="removeAnswer(index)">
                <v-icon color="white">mdi-delete</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="3" md="2">
              <v-radio-group v-model="selectedAnswer">
                <v-radio
                  class="sm-12"
                  :key="index"
                  label="Correta"
                  :value="index"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-btn color="error" class="mr-4" @click="reset">Reset</v-btn>
            <v-btn
            :disabled="!valid" color="success" class="mr-4" @click="save">Adicionar</v-btn>
          </v-row>
      </v-form>
       <v-alert
          type="success"
          dismissible
          transition="scale-transition">
        I'm a success alert.
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue';
import { newQuestion } from '@/_services/questionServices';

export default {
  name: 'AddQuestion',
  data: () => ({
    question: '',
    valid: true,
    answersRules: [
      (v) => !!v || 'A pergunta é obrigatória!',
      (v) => (v && v.length <= 100) || 'A pergunta deve possuir no máximo 10 caracteres!',
    ],
    selectedAnswer: 0,
    lazy: false,
    answers: [{
      text: '',
    },
    {
      text: '',
    }],
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
      this.answers = [
        {
          text: '',
        },
        {
          text: '',
        },
      ];
      Vue.nextTick(() => { this.selectedAnswer = 0; });
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    addAnswer() {
      const { answers } = this;
      if (answers.length < 5) {
        answers.push({
          text: '',
          correct: false,
        });
      }
    },
    removeAnswer(index) {
      const { answers } = this;
      if (answers.length !== 2) {
        answers.splice(index, 1);
        if (this.selectedAnswer === index) {
          this.selectedAnswer = 0;
        }
      }
    },
    save() {
      const { question, answers, selectedAnswer } = this;
      newQuestion(question, answers.map((a, index) => ({
        label: a.text,
        correct: index === selectedAnswer,
      })));
    },
  },
};
</script>
