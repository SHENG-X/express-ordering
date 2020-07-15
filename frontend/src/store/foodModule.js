import { getFood } from '@/services/foodService';

const foodModule = {
  state: () => ({
    food: [],
  }),
  mutations: {
    setFood(state, food) {
      state.food = food;
    },
  },
  actions: {
    async loadFood({ commit }) {
      const food = await getFood();
      commit('setFood', food.data);
    },
  },
};

export default foodModule;
