<template>
  <v-card class="elevation-12">
    <v-card-text>
      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-row justify="center" align="center">
          <v-col cols="12">
            <v-textarea
              name="question-input"
              filled
              label="Pergunta"
              auto-grow
              outlined
              rows="1"
              row-height="15"
              readonly
              :value="question"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row justify="center" align="center"
          v-for="answer in answers" :key="answer.id">
            <v-col cols="8" md="10">
              <v-text-field md="1"
                v-model="answer.text" readonly label="Resposta" required></v-text-field>
            </v-col>
            <v-col cols="4" md="2">
              <v-radio-group v-model="selectedAnswer">
                <v-radio
                  class="sm-12"
                  :key="answer.id"
                  label="Correta"
                  :value="answer.id"
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

const questionsData = {
  question: 'Por que esta matéria é tão importante ?',
  answers: [
    {
      id: 0,
      text: 'Não sei',
    },
    {
      id: 1,
      text: 'Sem tempo irmão',
    },
  ],
};

export default {
  name: 'Question',
  data: () => ({
    answers: questionsData.answers,
    question: questionsData.question,
    valid: false,
    lazy: false,
    selectedAnswer: new Date().getMilliseconds() % questionsData.answers.length,
  }),
  methods: {
    submitAnswer() {
    },
  },
};
</script>

<style>
.v-input__slot {
  background: none !important;
}
</style>
