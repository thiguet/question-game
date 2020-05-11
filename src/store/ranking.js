import { getUsers } from '@/_services/rankingServices';

export default {
  namespaced: true,
  state: () => ({
    users: {},
  }),
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    async getUsers({ dispatch, commit }) {
      const { data, errors } = await getUsers();

      if (errors) {
        dispatch('showDialog', 'Ocorreu um erro ao buscar as informações!', { root: true });
      } else {
        const { getRankedUsers } = data;
        commit('setUsers', getRankedUsers);
      }
    },
  },
  getters: {},
};
