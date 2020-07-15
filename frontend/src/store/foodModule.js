import {
  getFood,
  createFood,
  updateFood,
  deleteFood,
} from '@/services/foodService';

const foodModule = {
  state: () => ({
    // a list of saved food
    food: [],
    // current selected food
    current: null,
  }),
  mutations: {
    setFood(state, food) {
      state.food = food;
    },
    setCurrentFood(state, food) {
      state.current = food;
    },
  },
  actions: {
    async loadFood({ commit }) {
      // load saved food from server
      const food = await getFood();
      commit('setFood', food.data);
    },
    async createFood({ state, commit }, food) {
      // create an save a food to server side
      const res = await createFood(food);
      const foodCopy = JSON.parse(JSON.stringify(state.food));
      foodCopy.push(res.data);
      commit('setFood', foodCopy);
    },
    async updateFood({ state, commit }, food) {
      // updating an existing food
      const res = await updateFood(food);
      const newFood = state.food.map((f) => {
        if (f._id === food.id) {
          return res.data;
        }
        return f;
      });
      commit('setFood', newFood);
    },
    async deleteFood({ state, commit }, food) {
      // delete a food
      const res = await deleteFood(food);
      if (res.status === 204) {
        const newFood = state.food.filter((f) => f._id !== food._id);
        commit('setFood', newFood);
      }
    },
  },
  getters: {
    getFood(state) {
      return state.food;
    },
    getCurrentFood(state) {
      return state.current;
    },
  },
};

export default foodModule;
