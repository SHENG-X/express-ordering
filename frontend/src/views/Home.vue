<template>
  <div class="home">
    <div class="food-container">
      <food-card
        v-for="food in getFood"
        :food="food"
        :key="food._id"
        @click.native="() => showModal(food)"
      />
    </div>
    <a-modal
      v-model="visible"
      v-if="currentFood"
    >
      <template slot="footer">
        <a-button key="increase" @click="() => handleFoodCount(1)">
          +
        </a-button>
         <a-input-number
          :min="1"
          :max="1000"
          :default-value="1"
          v-model="foodCount"
        />
        <a-button key="decrease" @click="() => handleFoodCount(-1)">
          -
        </a-button>
        <a-button key="addCart" type="primary" @click="() => addToOrder(currentFood)">
          <div>Add to cart - ${{ (currentFood.price * foodCount).toFixed(2) }}</div>
        </a-button>
      </template>
      <div class="order">
        <div class="name">
          {{ currentFood.name}}
        </div>
        <div class="description">
          {{ currentFood.description }}
        </div>
        <div class="preferences">
          Preferences
        </div>
        <div class="extra">
          <div>Extra instructions</div>
          <div>List any special requests</div>
        </div>
        <a-textarea
          v-model="extra"
          placeholder="e.g. allergies, extra spicy, etc."
          :rows="4"
        />
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

import FoodCard from '@/components/FoodCard.vue';

export default {
  name: 'Home',
  components: {
    FoodCard,
  },
  data() {
    return {
      visible: false,
      currentFood: null,
      foodCount: 1,
      extra: '',
    };
  },
  computed: {
    ...mapGetters([
      'getFood',
    ]),
  },
  created() {
    this.loadFWithC();
  },
  methods: {
    ...mapMutations([
      'addOrderItem',
    ]),
    ...mapActions([
      'loadFWithC',
    ]),
    showModal(food) {
      if (this.currentFood && food._id !== this.currentFood._id) {
        // reset food count on openning a new food item
        this.foodCount = 1;
        this.extra = '';
      }
      this.currentFood = food;
      this.visible = true;
    },
    handleFoodCount(base) {
      if (this.foodCount === 1 && base < 1) return;
      this.foodCount += base * 1;
    },
    addToOrder(food) {
      const orderItem = {
        food,
        count: this.foodCount,
        extra: this.extra,
      };
      this.addOrderItem(orderItem);
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.food-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(460px, 1fr));
  align-items: center;
  justify-items: center;
}
.order {
  .name {
    font-size: 18px;
    font-weight: 600;
  }
  .preferences {
    font-size: 16px;
    font-weight: 600;
    padding: 8px 0;
  }
  .extra {
    font-weight: 600;
    display: flex;
    justify-content: space-between;
  }
}
</style>
