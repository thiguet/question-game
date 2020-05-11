const SESSION_IDENTIFIER = 'SESSION_ID';
const LAST_SESSION_IDENTIFIER = 'LAST_SESSION_ID';

export default {
  namespaced: true,
  state: () => ({
    sessionId: '',
    isGameOver: true,
  }),
  mutations: {
    setLastSession(state, sessionId) {
      localStorage.setItem(LAST_SESSION_IDENTIFIER, sessionId);
    },
    setSession(state, sessionId) {
      state.sessionId = sessionId;
      localStorage.setItem(SESSION_IDENTIFIER, sessionId);
    },
    setGameOver(state, isGameOver) {
      state.isGameOver = isGameOver;
    },
  },
  actions: {
    isGameStarted: ({ dispatch }, token) => {
      dispatch('sendJSON', { token, wsAction: 'IS_GAME_STARTED' }, { root: true });
    },
    startGame: ({ dispatch }, token) => {
      dispatch('sendJSON', { token, wsAction: 'START_GAME' }, { root: true });
    },
    endGame: ({ dispatch }, token) => {
      dispatch('sendJSON', { token, wsAction: 'END_GAME' }, { root: true });
    },
    newSession: ({ commit }, sessionId) => {
      commit('setLastSession', sessionId);
      commit('setSession', sessionId);
      commit('setGameOver', false);
    },
    setActualSession: ({ dispatch }, { sessionId, isGameStarted }) => {
      if (!isGameStarted) {
        dispatch('gameOver');
      } else {
        dispatch('newSession', sessionId);
      }
    },
    gameOver: ({ commit }) => {
      commit('setSession', '');
      commit('setGameOver', true);
    },
  },
  getters: {
    isGameOver: (state) => state.isGameOver,
  },
};
