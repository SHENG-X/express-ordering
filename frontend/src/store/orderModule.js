import {
  getOrder,
  placeOrder,
  // updateOrder,
  // deleteOrder,
  cancelOrder,
} from '@/services/orderService';

const categoryModule = {
  state: () => ({
    // order is a list of order items
    order: [],
    // order list is a list of order (dashboard only)
    orderList: [],
  }),
  mutations: {
    setOrder(state, order) {
      state.order = order;
    },
    setOrderList(state, orders) {
      state.orderList = orders;
    },
    addOrderItem(state, item) {
      // append the item to the end of the order
      state.order.splice(state.order.length, 0, item);
    },
    removeOrderItem(state, item) {
      state.order = state.order.filter((ord) => ord._id !== item._id);
    },
  },
  actions: {
    async loadOrder({ commit }) {
      // dashboard load all orders
      const res = await getOrder();
      commit('setOrderList', res.data);
    },
    async placeOrder({ state }) {
      const res = await placeOrder(state.order);
      return res;
    },
    async cancelOrder({ state }) {
      const res = await cancelOrder(state.order);
      return res;
    },
  },
  getters: {
    getOrder(state) {
      return state.order;
    },
    getOrderList(state) {
      return state.orderList;
    },
  },
};

export default categoryModule;
