import { answerQuestion, newQuestion, getSessionQuestions } from '@/_services/questionServices';

export default {
  namespaced: true,
  state: () => ({
    questionIndex: 0,
    allQuestions: [],
    questionId: 0,
    question: '',
    answers: [{
      description: '',
      correct: true,
    },
    {
      description: '',
      correct: false,
    }],
    rightAnswer: 0,
  }),
  mutations: {
    reset(state) {
      state.questionId = 0;
      state.questionIndex = 0;
      state.question = '';
      state.answers = [
        {
          description: '',
          correct: true,
        },
        {
          description: '',
          correct: false,
        },
      ];
      state.rightAnswer = 0;
    },
    setRightAnswer(state, rightAnswer) {
      state.rightAnswer = rightAnswer;
    },
    setQuestion(state, question) {
      state.question = question;
    },
    setAnswers(state, answers) {
      state.answers = answers;
    },
    setAllQuestions(state, allQuestions) {
      state.allQuestions = allQuestions;
      state.questionIndex = 0;
    },
    setNextQuestion(state) {
      const nextQuestion = state.allQuestions[state.questionIndex];
      state.question = nextQuestion.description;
      state.answers = nextQuestion.answers;
      state.questionId = nextQuestion.id;
    },
    updateQuestionIndex(state) {
      state.questionIndex += 1;
    },
  },
  actions: {
    resetQuestionData: ({ commit }) => {
      commit('reset');
    },
    sendAnswer: async ({ dispatch }, answerInfo) => {
      const { questionId, answerId, userId } = answerInfo;
      const { errors } = await answerQuestion(questionId, answerId, userId);
      if (errors) {
        dispatch('showDialog', 'Não foi possível enviar a sua resposta! Tente novamente!', { root: true });
      } else {
        dispatch('showDialog', 'Resposta enviada com sucesso!', { root: true });
      }
    },
    newQuestion: async ({ getters, dispatch }) => {
      const { question, answers, rightAnswer } = getters;
      const { errors } = await newQuestion(question, answers, rightAnswer);
      if (errors) {
        dispatch('showDialog', 'Não foi possível salvar a pergunta! Favor tentar novamente!', { root: true });
      } else {
        dispatch('resetQuestionData');
        dispatch('showDialog', 'A pergunta foi salva com sucesso!', { root: true });
      }
    },
    getSessionQuestions: async ({ commit, dispatch }) => {
      const { data, errors } = await getSessionQuestions();
      if (errors) {
        dispatch('showDialog', 'Não foi possível recuperar as perguntas! Favor conferir seu login!', { root: true });
      } else {
        const { questions } = data;
        commit('setAllQuestions', questions);
        dispatch('nextQuestion');
      }
    },
    nextQuestion: ({ commit }) => {
      commit('setNextQuestion');
      commit('updateQuestionIndex');
    },
  },
  getters: {
    rightAnswer: (state) => state.rightAnswer,
    question: (state) => state.question,
    answers: (state) => state.answers,
    questionId: (state) => state.questionId,
    hasNextQuestion: ({ questionIndex, allQuestions }) => questionIndex < allQuestions.length,
  },
};
