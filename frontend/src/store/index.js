import Vue from 'vue';
import Vuex from 'vuex';

import foodModule from './foodModule';
import categoryModule from './categoryModule';
import orderModule from './orderModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    loadFWithC({ dispatch }) {
      dispatch('loadFood');
      dispatch('loadCategory');
    },
  },
  modules: {
    foodModule,
    categoryModule,
    orderModule,
  },
});
