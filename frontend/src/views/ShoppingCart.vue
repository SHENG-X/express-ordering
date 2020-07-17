<template>
  <div>
    <div v-if="getOrder._id">
      Your order is placed.
      Tracking number: {{ getOrder._id }}
    </div>
    <div
      class="container"
      v-else-if="getOrderItems.length && !getOrder._id"
    >
      <div
        class="order-item"
        v-for="item in getOrderItems"
        :key="item.food._id"
      >
        <div>
          <a-button key="increase" @click="() => handleFoodCount(1, item)">
            +
          </a-button>
          <a-input-number
            :min="1"
            :max="1000"
            :default-value="1"
            v-model="item.count"
          />
          <a-button key="decrease" @click="() => handleFoodCount(-1, item)">
            -
          </a-button>
        </div>
        <div class="item-detail">
          <div class="heading">
            <div>
              {{ item.food.name }}
            </div>
            <div>
              ${{ (item.count * item.food.price).toFixed(2) }}
            </div>
          </div>
          <div class="body">
            {{ item.extra }}
          </div>
        </div>
      </div>
      <div class="controller">
        <a-button
          type="danger"
          @click="() => setOrder([])"
        >
          Cancel
        </a-button>
        <a-button
          class="place-order"
          type="primary"
          @click="placeOrder"
        >
          Place Order
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'getOrder',
      'getOrderItems',
    ]),
  },
  methods: {
    ...mapMutations([
      'removeOrderItem',
      'setOrder',
    ]),
    ...mapActions([
      'placeOrder',
    ]),
    handleFoodCount(base, item) {
      if (item.count === 1 && base < 1) {
        // remove order item if it's count less than 1
        this.removeOrderItem(item);
        return;
      }
      item.count += base * 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 12px;
  .order-item {
    display: flex;
    margin: 24px 0;
    .item-detail {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 0 12px;
      .heading {
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
  .controller {
    display: flex;
    justify-content: flex-end;
    .place-order {
      margin-left: 12px;
    }
  }
}
</style>
