import {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/services/categoryService';

const categoryModule = {
  namespaced: true,
  state: () => ({
    category: [],
    current: null,
  }),
  mutations: {
    setCategory(state, category) {
      // set category list
      state.category = category;
    },
    setCurrent(state, category) {
      // set current selected category
      state.current = category;
    },
  },
  actions: {
    async loadCategory({ commit }) {
      // load all categories from server side
      const category = await getCategory();
      commit('setCategory', category.data);
    },
    async createCategory({ state, commit }, category) {
      const res = await createCategory(category);
      // create a deep copy of category then add a new item
      // to the copy to avoid side effects
      const categoryCopy = JSON.parse(JSON.stringify(state.category));
      categoryCopy.push(res.data);
      commit('setCategory', categoryCopy);
    },
    async updateCategory({ state, commit }, category) {
      const res = await updateCategory(category);
      const updatedCategory = state.category.map((c) => {
        if (c._id === res.data._id) {
          return res.data;
        }
        return c;
      });
      commit('setCategory', updatedCategory);
    },
    async deleteCategory({ state, commit }, category) {
      const res = await deleteCategory(category);
      if (res.status === 204) {
        // status code 204 means delete success
        // remove current category from category list
        const updatedCategory = state.category.filter((c) => c._id !== category._id);
        commit('setCategory', updatedCategory);
      }
    },
  },
  getters: {
    getCategory(state) {
      return state.category;
    },
    getCurrent(state) {
      return state.current;
    },
  },
};

export default categoryModule;
