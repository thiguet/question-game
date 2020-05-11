import Vue from 'vue';

export const wsState = {
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false,
  },
};

export const wsMutations = {
  SOCKET_ONOPEN(state, event) {
    Vue.prototype.$socket = event.currentTarget;
    state.socket.isConnected = true;
  },
  SOCKET_ONCLOSE(state) {
    state.socket.isConnected = false;
  },
  SOCKET_ONERROR() {},
  SOCKET_ONMESSAGE(state, message) {
    this.dispatch('onMessage', message);
    state.socket.message = message;
  },
  SOCKET_RECONNECT() {},
  SOCKET_RECONNECT_ERROR(state) {
    state.socket.reconnectError = true;
  },
};

export const wsActions = {
  sendMessage: (context, message) => {
    Vue.prototype.$socket.send(message);
  },
  sendJSON: (context, jsonObject) => {
    Vue.prototype.$socket.sendObj({ ...jsonObject });
  },
  onMessage({ dispatch }, message) {
    const { data, errors } = message;
    if (errors) {
      dispatch('showDialog', errors.map((e) => e.message), { root: true });
    } else {
      switch (data.wsAction) {
        case 'IS_GAME_STARTED':
          dispatch('game/setActualSession', data, { root: true });
          break;
        case 'START_GAME':
          dispatch('game/newSession', data.createSession.id, { root: true });
          break;
        case 'END_GAME':
          dispatch('game/gameOver', data, { root: true });
          break;
        case 'JWT_ERROR':
          dispatch('showDialog', 'Sua sessão está expirada! Favor logar novamente!', { root: true });
          dispatch('game/gameOver', data, { root: true });
          break;
        default:
          break;
      }
    }
  },
};

export const wsGetters = {};

export default {
  wsState,
  wsMutations,
  wsActions,
  wsGetters,
};
