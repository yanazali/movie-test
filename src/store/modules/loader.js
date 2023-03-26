export default {
  namespaced: true,
  state: {
    loading: false,
    stackedScrollPrevent: 0,
  },
  getters: {
    isLoading(state) {
      return state.loading;
    },
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {},
};
