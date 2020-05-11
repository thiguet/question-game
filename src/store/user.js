import { newUser } from '@/_services/userServices';
import { login } from '@/_services/adminServices';

const USER_IDENTIFIER = 'currentUser';

export default {
  namespaced: true,
  state: () => ({
    user: {},
  }),
  mutations: {
    setUserInfo(state, userInfo) {
      state.user = { ...userInfo };
    },
  },
  actions: {
    async addNewUser({ dispatch }, name) {
      const { data } = await newUser(name);
      const { createUser } = data;

      const userData = {
        name,
        ...createUser,
        role: 'Student',
      };

      dispatch('loginSuccess', userData);
      dispatch('setUserToLocalStorage', userData);
    },
    loginSuccess({ commit }, userData) {
      commit('setUserInfo', userData);
    },
    logout({ commit }) {
      localStorage.clear();
      commit('setUserInfo', {});
    },
    setUserToLocalStorage(state, userData) {
      localStorage.setItem(USER_IDENTIFIER, JSON.stringify(userData));
    },
    async login({ dispatch }, loginData) {
      const data = await login(loginData);
      const { token } = data;
      if (!token) {
        dispatch('showDialog', 'Não foi possível logar! Favor conferir suas credenciais!', { root: true });
        return dispatch('logout').then(() => ({}));
      }

      const userData = {
        ...data,
        role: 'Admin',
      };

      dispatch('setUserToLocalStorage', userData);
      return dispatch('loginSuccess', userData).then(() => userData);
    },
  },
  getters: {
    userName: (state) => state.user.name,
    role: (state) => state.user.role,
  },
};
