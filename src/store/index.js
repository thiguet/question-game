import Vue from 'vue';
import Vuex from 'vuex';

import userModule from '@/store/user';
import questionModule from '@/store/questions';
import gameModule from '@/store/game';
import rankingModule from '@/store/ranking';

import {
  wsState,
  wsMutations,
  wsActions,
  wsGetters,
} from '@/store/wsocket';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: { ...userModule },
    question: { ...questionModule },
    game: { ...gameModule },
    ranking: { ...rankingModule },
  },
  state: {
    ...wsState,
    showDialog: false,
    dialogText: '',
  },
  mutations: {
    ...wsMutations,
    changeDialogStatus(state, bool) {
      state.showDialog = bool;
    },
    changeDialogText(state, bool) {
      state.dialogText = bool;
    },
  },
  actions: {
    ...wsActions,
    showDialog({ commit }, dialogText) {
      commit('changeDialogText', dialogText);
      commit('changeDialogStatus', true);
    },
    closeDialog({ commit }) {
      commit('changeDialogStatus', false);
    },
  },
  getters: {
    ...wsGetters,
  },
});
