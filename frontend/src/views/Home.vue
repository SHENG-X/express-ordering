<template>
  <div class="home">
    <div class="food-container">
      <food-card
        v-for="food in getFood"
        :food="food"
        :key="food._id"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import FoodCard from '@/components/FoodCard.vue';

export default {
  name: 'Home',
  components: {
    FoodCard,
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
    ...mapActions([
      'loadFWithC',
    ]),
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
</style>
