import {
  getOrder,
  placeOrder,
  // updateOrder,
  // deleteOrder,
  // cancelOrder,
} from '@/services/orderService';

const categoryModule = {
  state: () => ({
    // order is a list of order items
    order: {
      items: [],
    },
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
      state.order.items.splice(state.order.length, 0, item);
    },
    removeOrderItem(state, item) {
      state.order.items = state.order.items.filter((ordItem) => ordItem.food._id !== item.food._id);
    },
  },
  actions: {
    async loadOrder({ commit }) {
      // dashboard load all orders
      const res = await getOrder();
      commit('setOrderList', res.data);
    },
    async placeOrder({ state, commit }) {
      const res = await placeOrder(state.order);
      if (res.status === 201) {
        commit('setOrder', res.data);
      }
    },
    // async cancelOrder({ state }) {
    //   const res = await cancelOrder(state.order);
    // },
  },
  getters: {
    getOrder(state) {
      return state.order;
    },
    getOrderItems(state) {
      return state.order.items;
    },
    getOrderList(state) {
      return state.orderList;
    },
  },
};

export default categoryModule;
